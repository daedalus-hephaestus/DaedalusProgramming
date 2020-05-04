var programCode = function(processingInstance) {
	with(processingInstance) {
		size(500, 500);
		// code begins
		/*jshint sub:true*/
		/*
		PLEASE DO NOT VOTE UP! THIS IS A WIP AND I DO NOT WANT IT RELEASED YET!

		If it starts getting votes I WILL delete this online version (backups will be made,
		but you won't be able to preview them)



		WASD or Arrow keys to move around


























		*/
		// the color pallette
		var colors = {
			'a': color(0, 0, 0), // black
			'4': color(25, 25, 25),
			'b': color(50, 50, 50), // dark gray
			'5': color(75, 75, 75),
			'c': color(100, 100, 100), // gray
			'6': color(125, 125, 125),
			'd': color(150, 150, 150), // light gray
			'7': color(175, 175, 175),
			'e': color(180, 0, 0), // dark red
			'f': color(205, 50, 50), // red
			'g': color(230, 101, 101), // light red
			'h': color(255, 162, 162), // pink
			'i': color(180, 80, 0), // darkest orange
			'j': color(238, 105, 0), // dark orange
			'k': color(255, 130, 0), // orange
			'l': color(255, 155, 0), // light orange
			'm': color(190, 150, 0), // dark yellow
			'n': color(230, 180, 0), // gold
			'o': color(255, 210, 0), // yellow
			'p': color(255, 240, 0), // light yellow
			'q': color(0, 50, 20), // green start
			'r': color(10, 80, 30),
			's': color(20, 110, 40),
			't': color(30, 140, 50),
			'u': color(40, 170, 60),
			'v': color(50, 200, 70),
			'w': color(60, 230, 80),
			'x': color(70, 255, 90), // green end
			'y': color(0, 20, 50), // blue start
			'z': color(15, 30, 80),
			'A': color(30, 40, 110),
			'B': color(45, 50, 140),
			'C': color(60, 60, 170),
			'D': color(75, 70, 200),
			'E': color(90, 80, 230),
			'F': color(105, 90, 255), // blue end
			'G': color(50, 40, 50), // purple start
			'H': color(80, 50, 80),
			'I': color(110, 60, 110),
			'J': color(140, 70, 140),
			'K': color(170, 80, 170),
			'L': color(200, 90, 200),
			'M': color(230, 100, 230),
			'N': color(255, 110, 255), // purple end
			'O': color(50, 20, 10), // brown start
			'P': color(65, 35, 20),
			'Q': color(80, 50, 30),
			'R': color(95, 65, 40),
			'S': color(110, 80, 50),
			'T': color(125, 95, 60),
			'U': color(140, 110, 70),
			'V': color(155, 125, 80), // brown end
			'W': color(255, 115, 165), // pink begin
			'X': color(255, 145, 170),
			'Y': color(255, 175, 175),
			'Z': color(255, 215, 180), // pink end
			'1': color(255, 255, 255), // white
			'2': color(215, 175, 140),
			'3': color(175, 135, 100),
			' ': color(255, 255, 255, 0), // transparent
		};
		var setKALoopTimer = function() {
			this[["KAInfiniteLoopCount"]] = -Infinity;
		};
		setKALoopTimer();
		// whether or not god mode for dev testing is on
		var godMode = false;

		// whether or not the player is creating their character
		var creator = true;
		// whether or not the player is reading the instructions
		var instructions = true;

		// sets these variables because I was developing offline for a while
		var mouseIsPressed = false;
		var keyIsPressed = true;

		// creates the font
		var Mono = createFont('monospace');

		// replaces a character of a string with another at a certain index
		var StringReplace = function(str, index, char) {
			str = str.substring(0, index) + char + str.substring(index + 1);
			return str;
		};

		// creates a pixel image
		var Pixel = function(pixmap, colors, pixelsize) {
			var p = createGraphics(pixmap[0].length * pixelsize, pixmap.length * pixelsize, JAVA2D);
			if (!p) {
				return;
			}
			p.background(255, 55, 255, 0);
			p.noStroke();

			for (var y = 0; y < pixmap.length; y++) {
				for (var x = 0; x < pixmap[y].length; x++) {
					p.fill(colors[pixmap[y][x]]);
					p.rect(x * pixelsize, y * pixelsize, pixelsize, pixelsize);
				}
			}
			return (p.get());
		};
		// stacks an array of 16x16 images on top of each other
		var Composite = function(images) {
			var p = createGraphics(32, 32, JAVA2D);
			for (var i = 0; i < images.length; i++) {
				p.image(images[i], 0, 0);
			}
			return (p.get());
		};
		// composites a 16x16 and a 16x24 image on top of each other
		var Composite2 = function(image1, image2) {
			var p = createGraphics(32, 48, JAVA2D);
			p.background(0, 0, 0, 0);
			p.image(image1, 0, 16);
			p.image(image2, 0, 0);
			return (p.get());
		};

		// GUI tilemaps
		{
			var guiTopLeft = Pixel([
				'    aaaaaaaaaaaa',
				'  aa666666666666',
				' a66655555555555',
				' a6666666bbb5cbb',
				'a666cccc66665c66',
				'a66c5b55c6665c66',
				'a665b6b55c665c66',
				'a6c5b6b5bc66b5c6',
				'a65b66b5bc6665c6',
				'a65b655b566665c6',
				'a65b666666c56b5c',
				'a65b66666655665c',
				'a65555566666665c',
				'a65bbbb55566665c',
				'a65b666bbb5555b6',
				'a65b666666bbbb66'
			], colors, 2);
			var guiTopRight = Pixel([
				'aaaaaaaaaaaa    ',
				'666666666666aa  ',
				'55555555555666a ',
				'bbc5bbb6666666a ',
				'66c56666cccc666a',
				'66c5666c55b5c66a',
				'66c566c55b6b566a',
				'6c5b66cb5b6b5c6a',
				'6c5666cb5b66b56a',
				'6c566665b556b56a',
				'c5b65c666666b56a',
				'c56655666666b56a',
				'c56666666555556a',
				'c56666555bbbb56a',
				'6b5555bbb666b56a',
				'66bbbb666666b56a'
			], colors, 2);
			var guiBottomLeft = Pixel([
				'a65b666666bbbb66',
				'a65b666bbb5555b6',
				'a65bbbb55566665c',
				'a65555566666665c',
				'a65b66666655665c',
				'a65b666666c56b5c',
				'a65b655b566665c6',
				'a65b66b5bc6665c6',
				'a6c5b6b5bc66b5c6',
				'a665b6b55c665c66',
				'a66c5b55c6665c66',
				'a666cccc66665c66',
				' a6666666bbb5cbb',
				' a66655555555555',
				'  aa666666666666',
				'    aaaaaaaaaaaa'
			], colors, 2);
			var guiBottomRight = Pixel([
				'66bbbb666666b56a',
				'6b5555bbb666b56a',
				'c56666555bbbb56a',
				'c56666666555556a',
				'c56655666666b56a',
				'c5b65c666666b56a',
				'6c566665b556b56a',
				'6c5666cb5b66b56a',
				'6c5b66cb5b6b5c6a',
				'66c566c55b6b566a',
				'66c5666c55b5c66a',
				'66c56666cccc666a',
				'bbc5bbb6666666a ',
				'55555555555666a ',
				'666666666666aa  ',
				'aaaaaaaaaaaa    '
			], colors, 2);
			var guiTop = Pixel([
				'aaaaaaaaaaaaaaaa',
				'6666666666666666',
				'5555555555555555',
				'bbbbbbbbbbbbbbbb',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666'
			], colors, 2);
			var guiBottom = Pixel([
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'bbbbbbbbbbbbbbbb',
				'5555555555555555',
				'6666666666666666',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var guiLeft = Pixel([
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666',
				'a65b666666666666'
			], colors, 2);
			var guiRight = Pixel([
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a',
				'666666666666b56a'
			], colors, 2);
			var guiMiddle = Pixel([
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666'
			], colors, 2);
			var guiSlot = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6dddddddddd6c6',
				'6c6dddddddddd6c6',
				'6c6dddddddddd6c6',
				'6c6dddddddddd6c6',
				'6c6dd666666dd6c6',
				'6c6d66666666d6c6',
				'6c6d66666666d6c6',
				'6c6d66666666d6c6',
				'6c666666666666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var closeButton = Pixel([
				'aaaaaaaaaaaa    ',
				'666666666666aa  ',
				'55555555555556a ',
				'bbc5bbbbbbbb55a ',
				'66c5eeeeeeeec56a',
				'66c5e17ff71fc56a',
				'66c5e717717fc56a',
				'66c5ef7117ffc56a',
				'66c5ef7117ffc56a',
				'66c5e717717fc56a',
				'66c5e17ff71fc56a',
				'66c5efffffffc56a',
				'66c555555555556a',
				'666bbbbbbbbbb56a',
				'666666666666b56a',
				'666666666666b56a'
			], colors, 2);
			var acceptButton = Pixel([
				'666666666666b56a',
				'666666666666b56a',
				'666bbbbbbbbbb56a',
				'66c555555555556a',
				'66c5qrrrrrrrc56a',
				'66c5q1rrrrrrc56a',
				'66c5q71rrrrrc56a',
				'66c5qr71r17rc56a',
				'66c5qrr717rrc56a',
				'66c5qrrr7rrrc56a',
				'66c5qrrrrrrrc56a',
				'66c5qqqqqqqqc56a',
				'bbc5bbbbbbbb55a ',
				'55555555555556a ',
				'666666666666aa  ',
				'aaaaaaaaaaaa    '
			], colors, 2);
			var nextButton = Pixel([
				'666666666666b56a',
				'666666666666b56a',
				'666bbbbbbbbbb56a',
				'66c555555555556a',
				'66c566d66666c56a',
				'66c56d1d6666c56a',
				'66c56d11d666c56a',
				'66c56d111d66c56a',
				'66c56d1111d6c56a',
				'66c56d111d66c56a',
				'66c56d11d666c56a',
				'66c56d1d6666c56a',
				'bbc5bbbbbbbb55a ',
				'55555555555556a ',
				'666666666666aa  ',
				'aaaaaaaaaaaa    '
			], colors, 2);
			var backButton = Pixel([
				'a65b666666666666',
				'a65b666666666666',
				'a65bbbbbbbbbb666',
				'a655555555555c66',
				'a65c66666d665c66',
				'a65c6666d1d65c66',
				'a65c666d11d65c66',
				'a65c66d111d65c66',
				'a65c6d1111d65c66',
				'a65c66d111d65c66',
				'a65c666d11d65c66',
				'a65c6666d1d65c66',
				' a55bbbbbbbb5cbb',
				' a65555555555555',
				'  aa666666666666',
				'    aaaaaaaaaaaa'
			], colors, 2);
			var emptyBagSlot = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6ddddddccdd6c6',
				'6c6dddddc66cd6c6',
				'6c6ddcccd7ccc6c6',
				'6c6dc66c55d5c6c6',
				'6c6c66cccc5756c6',
				'6c6c6ccccccd56c6',
				'6c6ccccccc5766c6',
				'6c6dcccc556d66c6',
				'6c666555667666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var characterIcon = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c5666cccc6665c6',
				'6c6ddc2222cdd6c6',
				'6c6dc2ZZZZ2cd6c6',
				'6c6dc2ZZZZ2cd6c6',
				'6c6dc2ZZZZ2cd6c6',
				'6c6dc2ZZZZ2cd6c6',
				'6c6dc32ZZ23cd6c6',
				'6c6d6c3223ccd6c6',
				'6c6d6cZZZZc6d6c6',
				'6c66c32ZZ23c66c6',
				'6cc66c3333c66cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var bookIcon = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c5666f6666665c6',
				'6c6d1f1ed111d6c6',
				'6c6P1f223331P6c6',
				'6c6P1e123111P6c6',
				'6c6P1e223331P6c6',
				'6c6O1e123111P6c6',
				'6c6O7e723777O6c6',
				'6c65OeO77OOO56c6',
				'6c6d5e5OO555d6c6',
				'6c66e565566666c6',
				'6cc6566666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var scrollIcon = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6d11ddddddd6c6',
				'6c61111dddddd6c6',
				'6c621111ddddd6c6',
				'6c6c211ggdddd6c6',
				'6c6dc2gg1111d6c6',
				'6c6d6ce1111316c6',
				'6c6d66c2112R26c6',
				'6c6d666c2222c6c6',
				'6c666666cccc66c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyShirt = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6dddddddddd6c6',
				'6c6dccddddccd6c6',
				'6c6d5ccddcc5d6c6',
				'6c6ddc6cc6cdd6c6',
				'6c6ddc6666cdd6c6',
				'6c6d6cc66cc6d6c6',
				'6c6d65cccc56d6c6',
				'6c6d66555566d6c6',
				'6c666666666666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyPants = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6ddd6666ddd6c6',
				'6c6ddcc6c6cdd6c6',
				'6c6ddc6c6ccdd6c6',
				'6c6ddcc6c6cdd6c6',
				'6c6dd56b6c5dd6c6',
				'6c6d65c5c656d6c6',
				'6c6d656b6c56d6c6',
				'6c6d66b5b566d6c6',
				'6c666666666666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyHelmet = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6dddccccddd6c6',
				'6c6ddc6666cdd6c6',
				'6c6ddcc6cccdd6c6',
				'6c6ddc5c5c5dd6c6',
				'6c6ddc6c6c5dd6c6',
				'6c6d6cc6cc56d6c6',
				'6c6d65c6c566d6c6',
				'6c6d66565666d6c6',
				'6c666666666666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyGloves = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6ddddcddddd6c6',
				'6c6dddc6cdddd6c6',
				'6c6dd5c66cddd6c6',
				'6c6ddd5c66cdd6c6',
				'6c6dd66566cdd6c6',
				'6c6d66556cc6d6c6',
				'6c6d66565c56d6c6',
				'6c6d6665cc56d6c6',
				'6c666665556666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyBoots = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6dddddddddd6c6',
				'6c6dddddddddd6c6',
				'6c6dddddddddd6c6',
				'6c6ddccddccdd6c6',
				'6c6ddcc66ccdd6c6',
				'6c6dcc5665ccd6c6',
				'6c66555cc55566c6',
				'6c6dccc66cccd6c6',
				'6c666666666666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyRing = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6dddddddddd6c6',
				'6c6dddddddddd6c6',
				'6c6ddccccccdd6c6',
				'6c6dc555555cd6c6',
				'6c6dc6cccc6cd6c6',
				'6c6d5c6666c5d6c6',
				'6c6d65555556d6c6',
				'6c6d66666666d6c6',
				'6c666666666666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyNecklace = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6dd5cdddddd6c6',
				'6c6dcdd5cdddd6c6',
				'6c6d5dddd5ddd6c6',
				'6c6ddcddddcdd6c6',
				'6c6dd566665dd6c6',
				'6c6d66c66666d6c6',
				'6c6d66656cc6d6c6',
				'6c6d666665ccd6c6',
				'6c666666665566c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyWeapon = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6776ddddddd6c6',
				'6c67d76dddddd6c6',
				'6c667d76ddddd6c6',
				'6c6d67676dddd6c6',
				'6c6dd67676cdd6c6',
				'6c6d66676756d6c6',
				'6c6d66667566d6c6',
				'6c6d666c5656d6c6',
				'6c666666666566c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var emptyShield = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6ddccccccdd6c6',
				'6c6dc666666cd6c6',
				'6c6dc66c666cd6c6',
				'6c6dc6c6666cd6c6',
				'6c6dc666666cd6c6',
				'6c6d65666656d6c6',
				'6c6d65666656d6c6',
				'6c6d66566566d6c6',
				'6c666665566666c6',
				'6cc6666666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var healthBarLeft = Pixel([
				'  aaaaaaaaaaaaaa',
				' adddddddddddddd',
				'adddddcccccccccc',
				'addddc5555555555',
				'add6ddc666666666',
				'addc6dc6dddddddd',
				'adc5cc56dddddddd',
				'adc65566dddddddd',
				'adc66666dddddddd',
				'adc6cc66ddd66666',
				'addcddc6d6666666',
				'adddd6c666666666',
				'addd6c5666666666',
				'adddddcccccccccc',
				' adddddddddddddd',
				'  aaaaaaaaaaaaaa'
			], colors, 2);
			var healthBarRight = Pixel([
				'aaaaaaaaaaaaaa  ',
				'dddddddddddddda ',
				'ccccccccccddddda',
				'5555555555cdddda',
				'666666666cdd6dda',
				'dddddddd6cd6cdda',
				'dddddddd65cc5cda',
				'dddddddd66556cda',
				'dddddddd66666cda',
				'66666ddd66cc6cda',
				'6666666d6cddcdda',
				'666666666c6dddda',
				'6666666665c6ddda',
				'ccccccccccddddda',
				'dddddddddddddda ',
				'aaaaaaaaaaaaaa  '
			], colors, 2);
			var healthBarMiddle = Pixel([
				'aaaaaaaaaaaaaaaa',
				'dddddddddddddddd',
				'cccccccccccccccc',
				'5555555555555555',
				'6666666666666666',
				'dddddddddddddddd',
				'dddddddddddddddd',
				'dddddddddddddddd',
				'dddddddddddddddd',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'6666666666666666',
				'cccccccccccccccc',
				'dddddddddddddddd',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var xpBar = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				' aaaaaaaaaaaaaaa',
				'accccccccccccccc',
				'a5             5',
				'a5             5',
				'a5bbbbbbbbbbbbb5',
				' aaaaaaaaaaaaaaa'
			], colors, 2);
			var mouse = Pixel([
				'  aa            ',
				' aQQaa          ',
				' aQRQQaa        ',
				'  aQRSQQaa      ',
				'  aQSVSRQQaa    ',
				'   aQSVVSRQQa   ',
				'   aQRVSVVSRQa  ',
				'    aQSVSRVSQa  ',
				'    aQRVRRVQa   ',
				'aaa  aQSVVSQa   ',
				' aaaaaQRSQQSQa  ',
				'   aaaaQQaaQSQa ',
				'     aaaaaaaQQa ',
				'         aaaaa  ',
				'                ',
				'                '
			], colors, 2);
			var mouseClick = Pixel([
				'        a       ',
				'       aQa      ',
				'       aQa      ',
				'      aQTQa     ',
				'  a   aQTQa     ',
				'  aa  aQTQa     ',
				'  aaa QSVSQa    ',
				'   aaaQTVTQa    ',
				'   aaaQVTVQa    ',
				'   aaQTVSVTQa   ',
				'    aQSVSVSQa   ',
				'    aQSSVSSQa   ',
				'     aQQTQQa    ',
				'      aaSaa     ',
				'      aaQa      ',
				'       aaa      '
			], colors, 2);
			var coinGui = Pixel([
				'                ',
				'                ',
				'   ppp          ',
				'  poonm         ',
				'  poonm         ',
				'  pnnnm         ',
				'   mmm          ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var emptyBuff = Pixel([
				'                ',
				'   mmmmmmmmmm   ',
				'  m          m  ',
				' m            m ',
				' m            m ',
				' m            m ',
				' m            m ',
				' m            m ',
				' m            m ',
				' m            m ',
				' m            m ',
				' m            m ',
				' m            m ',
				'  m          m  ',
				'   mmmmmmmmmm   ',
				'                '
			], colors, 2);
			var closeButton2 = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cceeeeeeeeeecc6',
				'6ceffffffffffec6',
				'6cff17fggf71ffc6',
				'6cff717ff717ffc6',
				'6cfgf717717fgfc6',
				'6cfggf7117fggfc6',
				'6cfggf7117fggfc6',
				'6cfgf717717fgfc6',
				'6cff717ee717ffc6',
				'6cff17effe71ffc6',
				'6cffeeffffeeffc6',
				'6ccffffffffffcc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var acceptButton2 = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6ccqqqqqqqqqqcc6',
				'6cqrrrrrrrrrrqc6',
				'6crssssssssssrc6',
				'6crs17sssssssrc6',
				'6crs717ssssssrc6',
				'6crsr717sss7src6',
				'6crssq717r717rc6',
				'6crsrrq71717rrc6',
				'6crsrrrq717qsrc6',
				'6crsrrrrq7qrsrc6',
				'6crrrrrrrqrrrrc6',
				'6ccrrrrrrrrrrcc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var nextButton2 = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6ddd1dddddd6c6',
				'6c6ddd11ddddd6c6',
				'6c6ddd111dddd6c6',
				'6c6ddd1111ddd6c6',
				'6c6dd611117dd6c6',
				'6c6d661117c6d6c6',
				'6c6d66117c66d6c6',
				'6c6d6617c666d6c6',
				'6c66667c666666c6',
				'6cc666c666666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var backButton2 = Pixel([
				'6666666666666666',
				'66cccccccccccc66',
				'6cc5555555555cc6',
				'6c566666666665c6',
				'6c6dddddd1ddd6c6',
				'6c6ddddd11ddd6c6',
				'6c6dddd111ddd6c6',
				'6c6ddd1111ddd6c6',
				'6c6dd711116dd6c6',
				'6c6d6c711166d6c6',
				'6c6d66c71166d6c6',
				'6c6d666c7166d6c6',
				'6c666666c76666c6',
				'6cc666666c666cc6',
				'66cccccccccccc66',
				'6666666666666666'
			], colors, 2);
			var guiSword = Pixel([
				'444             ',
				'4774            ',
				'4dd74           ',
				' 4dc74          ',
				'  47c74         ',
				'   45c74        ',
				'    45c5a       ',
				'     45b54 aa   ',
				'aa    45b54apa  ',
				' aaaa  45b4pa   ',
				'  aaaaa 44ona   ',
				'    aaaaammaa   ',
				'      aamaaaOa  ',
				'        aaaaaOaa',
				'          aaaama',
				'            aaa '
			], colors, 2);
			var guiSword2 = Pixel([
				'        44      ',
				'       4774     ',
				'       4674     ',
				'       4d74     ',
				'   a   4674     ',
				'   aa  4664     ',
				'   aa  4c74     ',
				'   aaa 4c64     ',
				'   aaa 45d4     ',
				'    aa 4564     ',
				'    aaa45d4     ',
				'    aaa4564     ',
				'     aa45c4aa   ',
				'    aon4444noa  ',
				'     aammmmaa   ',
				'      aaaaa     ',
				'      aaPOa     ',
				'      aaPOa     ',
				'       aOPa     ',
				'       anma     ',
				'        aa      ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var guiVendor = Pixel([
				'         aaa    ',
				'        aOOOa   ',
				'       aPnopOa  ',
				'     aaaOomnoa  ',
				'   aaaTTaOnonOa ',
				'  aPPOaaTaOnmna ',
				'  aQRPOOaTaOPna ',
				' aOPQPPOOaTaana ',
				' aOOOQPPPPaTaPa ',
				' aOOQQQRQPaVaa  ',
				'aaOOQPOQQPaTaaa ',
				'aaaOOOOPPPaVaaa ',
				'aaaaOOOOOOaTaaa ',
				' aaaaaaaaaUaaa  ',
				'   aaaaaaaaaa   ',
				'                '
			], colors, 2);
			var guiQuest = Pixel([
				'      aaaaaaaa  ',
				'     aZZZZ2ZZZa ',
				'    a233333333a ',
				'    a2aaaaaaaa  ',
				'    a2333333a   ',
				'    a2444242a   ',
				'    a2222222a   ',
				'    a2444442a   ',
				'    a2222223a   ',
				'    a2442443a   ',
				'    a2222223a   ',
				'   aa2424443a   ',
				'  aZ23333333a   ',
				' aa33333333aaa  ',
				' aaaaaaaaaaaaa  ',
				'  aaaaaaaaaaa   '
			], colors, 2);
			var hand1 = Pixel([
				'                ',
				'                ',
				'       a        ',
				'      aZa       ',
				'      a2a       ',
				'  aa   aZa      ',
				'  aaa  aZaa     ',
				'   aaa aZaZa    ',
				'    a2a3Z3Z3a   ',
				'    a2aZZZ23a   ',
				'   aa2ZZZZ3Za   ',
				'   aaa2ZZZZZa   ',
				'   aaaa2ZZZZa   ',
				'   aaaa22ZZaa   ',
				'    aaaaaaaa    ',
				'      aaaaa     '
			], colors, 2);
			var hand2 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'   aa           ',
				'  aaZaa         ',
				'  aaa2Zaa       ',
				'   aaa2Z3aa     ',
				'    aaaZZ3Za    ',
				'    aaa2Z3Z3a   ',
				'   aa2a2Z223a   ',
				'   aa2ZZZZ2Za   ',
				'   aa22ZZZZZa   ',
				'   aaa2222Zaa   ',
				'    aaaaaaaa    ',
				'      aaaaa     '
			], colors, 2);
		}
		// character animations
		{
			var vigorNaut = Pixel([
				'                ',
				'     aaaaaa     ',
				'    aOPPOOOa    ',
				'   aOPOOOPPaa   ',
				'   aPO3OOOOPa   ',
				'   aO22223OOa   ',
				'   aP716617Pa   ',
				'   aOdd32ddOa   ',
				'    aP3OP3Pa    ',
				'    aOP33POa    ',
				'   a7aOOOOa7a   ',
				'  a76OaaaaO67a  ',
				'  a6bOa11aOb6a  ',
				' a6bPaeffeaPb6a ',
				' abPQaeffeaPQba ',
				' a6QaOaeeaOaQ6a ',
				' a76aOaPPaOa67a ',
				'  acaOaSTaOaca  ',
				'  aaPOaSTaOQaa  ',
				'  aQPOaSTaOPPa  ',
				'   aPaUSSUaPa   ',
				'  aaaaOPPOaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanDown1 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a22122122a   ',
				'   a32a22a23a   ',
				'    a332233a    ',
				'    a322223a    ',
				'   a3a3223a3a   ',
				'  aZ23aaaa32Za  ',
				' aZ23Z3333232Za ',
				' aZ23ZZZZZ232Za ',
				' aZ222ZZZZ222Za ',
				' aZ3a22ZZ22a3Za ',
				' a33aaPPPPaa33a ',
				'  aa aQQQPa aa  ',
				'     aQOPQa     ',
				'     aZ32Za     ',
				'   aaaZ32Zaaa   ',
				'  aaaa3333aaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanDown2 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a22122122a   ',
				'   a32a22a23a   ',
				'    a332233a    ',
				'    a322223a    ',
				'     a3223a     ',
				'    a3aaaa3a    ',
				'   aZZ333323a   ',
				'   a2ZZZZZ22Za  ',
				'  aZ33ZZZ3a2Za  ',
				' aZ2a22Z3a2ZZa  ',
				' a23a32Z3a33a   ',
				'  aa aQQPQaa    ',
				'    aZQOOPQa    ',
				'    aZ23OOQa    ',
				'   aa33aa23aa   ',
				'  aaaaaaa33aaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanDown3 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a22122122a   ',
				'   a32a22a23a   ',
				'    a332233a    ',
				'    a322223a    ',
				'     a3223a     ',
				'    a3aaaa3a    ',
				'   aZZ333323a   ',
				'   a2ZZZZZ22Za  ',
				'   a33ZZZaa2Za  ',
				'  a2a22ZaZ2ZZa  ',
				'  a3a32Za333a   ',
				'   aaaQQPaaa    ',
				'    aZ3OPPOa    ',
				'    a33aaOOa    ',
				'   aaaaaa23aa   ',
				'  aaaaaaa33aaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanDown4 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a22122122a   ',
				'   a32a22a23a   ',
				'    a332233a    ',
				'    a322223a    ',
				'     a3223a     ',
				'    a3aaaa3a    ',
				'   a323333ZZa   ',
				'  aZ22ZZZZZ2a   ',
				'  aZ2a3ZZZ33Za  ',
				'  aZZ2a3Z22a2Za ',
				'   a33a3Z23a32a ',
				'    aaQPQQa aa  ',
				'    aQPOOQZa    ',
				'    aQOO32Za    ',
				'   aa32aa33aa   ',
				'  aaa33aaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanDown5 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a22122122a   ',
				'   a32a22a23a   ',
				'    a332233a    ',
				'    a322223a    ',
				'     a3223a     ',
				'    a3aaaa3a    ',
				'   a323333ZZa   ',
				'  aZ22ZZZZZ2a   ',
				'  aZ2aaZZZ33a   ',
				'  aZZ2ZaZ22a2a  ',
				'   a333aZ23a3a  ',
				'    aaaPQQaaa   ',
				'    aOPPO3Za    ',
				'    aOOaa33a    ',
				'   aa32aaaaaa   ',
				'  aaa33aaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var downCycle = [humanDown1, humanDown2, humanDown3, humanDown2, humanDown1, humanDown4, humanDown5, humanDown4];

			var humanRight1 = Pixel([
				'                ',
				'     aaaaa      ',
				'   aa22222a     ',
				'   a2ZZZZZ2a    ',
				'  a2ZZZZZZ2Za   ',
				'  a2ZZZZZZZZa   ',
				'  a2ZZ2Z1ZZ1a   ',
				'  a3ZZZZa2Zaa   ',
				'   a32ZZZ3Z2a   ',
				'    a32ZZZ22a   ',
				'    aa32232a    ',
				'    a2333aaa    ',
				'   a2Z22333a    ',
				'   a2Z2a2Z2a    ',
				'   aZ2aa3Za3a   ',
				'   aZZZZaZa32a  ',
				'    a333a2a33a  ',
				'     aaaPOaaa   ',
				'     aQPOOa     ',
				'     a2Z33a     ',
				'   aaa2Z33aa    ',
				'  aaaa32a3aaa   ',
				'  aaaaaaaaaaa   ',
				'   aaaaaaaaa    '
			], colors, 2);
			var humanRight2 = Pixel([
				'                ',
				'     aaaaa      ',
				'   aa22222a     ',
				'   a2ZZZZZ2a    ',
				'  a2ZZZZZZ2Za   ',
				'  a2ZZZZZZZZa   ',
				'  a2ZZ2Z1ZZ1a   ',
				'  a3ZZZZa2Zaa   ',
				'   a32ZZZ3Z2a   ',
				'    a32ZZZ22a   ',
				'    aa32232a    ',
				'   aa2333aaa    ',
				'  a22Z22333a    ',
				'  a22a222Z2aaa  ',
				'  a23aa23Za322a ',
				'  a3222a2Za322a ',
				'   a332a22aaaa  ',
				'    aaaPQOa     ',
				'     aaZPOa     ',
				'     aZZZ3a     ',
				'   aaa32a3aa    ',
				'  aaaaaaa3aaa   ',
				'  aaaaaaaaaaa   ',
				'   aaaaaaaaa    '
			], colors, 2);
			var humanRight3 = Pixel([
				'                ',
				'     aaaaa      ',
				'   aa22222a     ',
				'   a2ZZZZZ2a    ',
				'  a2ZZZZZZ2Za   ',
				'  a2ZZZZZZZZa   ',
				'  a2ZZ2Z1ZZ1a   ',
				'  a3ZZZZa2Zaa   ',
				'   a32ZZZ3Z2a   ',
				'    a32ZZZ22a   ',
				'    aa32232a    ',
				'   aa2333aaa    ',
				'  a22Z22333aaa  ',
				' a32aa222Z2aZZa ',
				' a32ZZa23Za322a ',
				'  a322a32Za3aa  ',
				'   aaaPQQaaa    ',
				'     aaOPQa     ',
				'      aaZZa     ',
				'     aaaZZa     ',
				'   aaaaaaaaa    ',
				'  aaaaaaa3aaa   ',
				'  aaaaaaaaaaa   ',
				'   aaaaaaaaa    '
			], colors, 2);
			var humanRight4 = Pixel([
				'                ',
				'     aaaaa      ',
				'   aa22222a     ',
				'   a2ZZZZZ2a    ',
				'  a2ZZZZZZ2Za   ',
				'  a2ZZZZZZZZa   ',
				'  a2ZZ2Z1ZZ1a   ',
				'  a3ZZZZa2Zaa   ',
				'   a32ZZZ3Z2a   ',
				'    a32ZZZ22a   ',
				'     a32232a    ',
				'     a333aaa    ',
				'    aZ22333a    ',
				'   a2Z2a2Z2a    ',
				'   aZ2aaaZaa    ',
				'   a22ZZZaa3a   ',
				'    a3333aa3a   ',
				'     aaaaOaa    ',
				'     aOOQO2a    ',
				'     a2Za32a    ',
				'   aaa2Za33a    ',
				'  aaaa32aaaaa   ',
				'  aaaaaaaaaaa   ',
				'   aaaaaaaaa    '
			], colors, 2);
			var humanRight5 = Pixel([
				'                ',
				'     aaaaa      ',
				'   aa22222a     ',
				'   a2ZZZZZ2a    ',
				'  a2ZZZZZZ2Za   ',
				'  a2ZZZZZZZZa   ',
				'  a2ZZ2Z1ZZ1a   ',
				'  a3ZZZZa2Zaa   ',
				'   a32ZZZ3Z2a   ',
				'    a32ZZZ22a   ',
				'     a32232a    ',
				'      a33aaa    ',
				'     a22333a    ',
				'    aZ2a2Z2a    ',
				'    a22aaZ2a    ',
				'    a2ZZZa2a    ',
				'     a333a2a    ',
				'     aaaaPPa    ',
				'     aOOPPO2a   ',
				'     a2Zaa32a   ',
				'   aaa2Zaa33a   ',
				'  aaaa32aaaaa   ',
				'  aaaaaaaaaaa   ',
				'   aaaaaaaaa    '
			], colors, 2);
			var rightCycle = [humanRight1, humanRight2, humanRight3, humanRight2, humanRight1, humanRight4, humanRight5, humanRight4];

			var humanLeft1 = Pixel([
				'                ',
				'      aaaaa     ',
				'     a22222aa   ',
				'    a2ZZZZZ2a   ',
				'   aZ2ZZZZZZ2a  ',
				'   aZZZZZZZZ2a  ',
				'   a1ZZ1Z2ZZ2a  ',
				'   aaZ2aZZZZ3a  ',
				'   a2Z3ZZZ23a   ',
				'   a22ZZZ23a    ',
				'    a23223aa    ',
				'    aaa3332a    ',
				'    a33322Z2a   ',
				'    a2Z2a2Z2a   ',
				'   a3aZ3aa2Za   ',
				'  a23aZaZZZZa   ',
				'  a33a2a333a    ',
				'   aaaOPaaa     ',
				'     aOOPQa     ',
				'     a33Z2a     ',
				'    aa33Z2aaa   ',
				'   aaa3a23aaaa  ',
				'   aaaaaaaaaaa  ',
				'    aaaaaaaaa   '
			], colors, 2);
			var humanLeft2 = Pixel([
				'                ',
				'      aaaaa     ',
				'     a22222aa   ',
				'    a2ZZZZZ2a   ',
				'   aZ2ZZZZZZ2a  ',
				'   aZZZZZZZZ2a  ',
				'   a1ZZ1Z2ZZ2a  ',
				'   aaZ2aZZZZ3a  ',
				'   a2Z3ZZZ23a   ',
				'   a22ZZZ23a    ',
				'    a23223aa    ',
				'    aaa3332aa   ',
				'    a33322Z22a  ',
				'  aaa2Z222a22a  ',
				' a223aZ32aa32a  ',
				' a223aZ2a2223a  ',
				'  aaaa22a233a   ',
				'     aOQPaaa    ',
				'     aOPZaa     ',
				'     a3ZZZa     ',
				'    aa3a23aaa   ',
				'   aaa3aaaaaaa  ',
				'   aaaaaaaaaaa  ',
				'    aaaaaaaaa   '
			], colors, 2);
			var humanLeft3 = Pixel([
				'                ',
				'      aaaaa     ',
				'     a22222aa   ',
				'    a2ZZZZZ2a   ',
				'   aZ2ZZZZZZ2a  ',
				'   aZZZZZZZZ2a  ',
				'   a1ZZ1Z2ZZ2a  ',
				'   aaZ2aZZZZ3a  ',
				'   a2Z3ZZZ23a   ',
				'   a22ZZZ23a    ',
				'    a23223aa    ',
				'    aaa3332aa   ',
				'  aaa33322Z22a  ',
				' aZZa2Z222aa23a ',
				' a223aZ32aZZ23a ',
				'  aa3aZ23a223a  ',
				'    aaaQQPaaa   ',
				'     aQPOaa     ',
				'     aZZaa      ',
				'     aZZaaa     ',
				'    aaaaaaaaa   ',
				'   aaa3aaaaaaa  ',
				'   aaaaaaaaaaa  ',
				'    aaaaaaaaa   '
			], colors, 2);
			var humanLeft4 = Pixel([
				'                ',
				'      aaaaa     ',
				'     a22222aa   ',
				'    a2ZZZZZ2a   ',
				'   aZ2ZZZZZZ2a  ',
				'   aZZZZZZZZ2a  ',
				'   a1ZZ1Z2ZZ2a  ',
				'   aaZ2aZZZZ3a  ',
				'   a2Z3ZZZ23a   ',
				'   a22ZZZ23a    ',
				'    a23223a     ',
				'    aaa333a     ',
				'    a33322Za    ',
				'    a2Z2a2Z2a   ',
				'    aaZaaa2Za   ',
				'   a3aaZZZ22a   ',
				'   a3aa3333a    ',
				'    aaOaaaa     ',
				'    a2OQOOa     ',
				'    a23aZ2a     ',
				'    a33aZ2aaa   ',
				'   aaaaa23aaaa  ',
				'   aaaaaaaaaaa  ',
				'    aaaaaaaaa   '
			], colors, 2);
			var humanLeft5 = Pixel([
				'                ',
				'      aaaaa     ',
				'     a22222aa   ',
				'    a2ZZZZZ2a   ',
				'   aZ2ZZZZZZ2a  ',
				'   aZZZZZZZZ2a  ',
				'   a1ZZ1Z2ZZ2a  ',
				'   aaZ2aZZZZ3a  ',
				'   a2Z3ZZZ23a   ',
				'   a22ZZZ23a    ',
				'    a23223a     ',
				'    aaa33a      ',
				'    a33322a     ',
				'    a2Z2a2Za    ',
				'    a2Zaa22a    ',
				'    a2aZZZ2a    ',
				'    a2a333a     ',
				'    aPPaaaa     ',
				'   a2OPPOOa     ',
				'   a23aaZ2a     ',
				'   a33aaZ2aaa   ',
				'   aaaaa23aaaa  ',
				'   aaaaaaaaaaa  ',
				'    aaaaaaaaa   '
			], colors, 2);
			var leftCycle = [humanLeft1, humanLeft2, humanLeft3, humanLeft2, humanLeft1, humanLeft4, humanLeft5, humanLeft4];

			var humanUp1 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a322ZZ223a   ',
				'    a32ZZ23a    ',
				'    a32ZZ23a    ',
				'   a3aZZZZa3a   ',
				'  aZ23ZZZZ32Za  ',
				' aZ23ZZZZZ232Za ',
				' aZ3aZZZZZ2a3Za ',
				' aZ3a2ZZZZ2a3Za ',
				' aZ3a22ZZ22a3Za ',
				' a33aQQQPQQa33a ',
				'  aa aPPPPa aa  ',
				'     aPOPPa     ',
				'     aZ32Za     ',
				'   aaaZ32Zaaa   ',
				'  aaaa3333aaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanUp2 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a322ZZ223a   ',
				'    a32ZZ23a    ',
				'    a32ZZ23a    ',
				'   a3aZZZZa3a   ',
				'  aZ23ZZZZ32Za  ',
				' aZ23ZZZZZ232Za ',
				' aZ3aZZZZZ3a3Za ',
				' a33a2ZZZZ3a3Za ',
				'  a3a22ZZ23a32a ',
				'   aaQQQQQQaaa  ',
				'     aPQPPaa    ',
				'     aPPOOOa    ',
				'     aZ2a32a    ',
				'   aaaZ3a33aa   ',
				'  aaaa33aaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanUp3 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a322ZZ223a   ',
				'    a32ZZ23a    ',
				'    a32ZZ23a    ',
				'   a3aZZZZa3a   ',
				'  aZ23ZZZZ32Za  ',
				'  a23ZZZZZ222a  ',
				'  a3aZZZZ3aZ2a  ',
				'  a3a2ZZ3aZ23a  ',
				'   aa22Z3a33a   ',
				'    aQQQPPaa    ',
				'     aPPOO2a    ',
				'     aOOa22a    ',
				'     aZ2a33a    ',
				'   aaaZ2aaaaa   ',
				'  aaaa33aaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanUp4 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a322ZZ223a   ',
				'    a32ZZ23a    ',
				'    a32ZZ23a    ',
				'   a3aZZZZa3a   ',
				'  aZ23ZZZZ32Za  ',
				' aZ232ZZZZZ32Za ',
				' aZ3a3ZZZZZa3Za ',
				' aZ3a3ZZZZ2a33a ',
				' a23a32ZZ22a3a  ',
				'  aaaQQQQQQaa   ',
				'    aaPPQPa     ',
				'    aOOOPPa     ',
				'    a23a2Za     ',
				'   aa33a3Zaaa   ',
				'  aaaaaa33aaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);
			var humanUp5 = Pixel([
				'                ',
				'     aaaaaa     ',
				'    a222222a    ',
				'   a22ZZZZ22a   ',
				'   a2ZZZZZZ2a   ',
				'   a2ZZZZZZ2a   ',
				'   a22ZZZZ22a   ',
				'   a322ZZ223a   ',
				'    a32ZZ23a    ',
				'    a32ZZ23a    ',
				'   a3aZZZZa3a   ',
				'  aZ23ZZZZ32Za  ',
				'  a222ZZZZZ32a  ',
				'  a2Za3ZZZZa3a  ',
				'  a32Za3ZZ2a3a  ',
				'   a33a3Z22aa   ',
				'    aaPPQQQa    ',
				'    a2OOPPa     ',
				'    a22aOOa     ',
				'    a33a2Za     ',
				'   aaaaa2Zaaa   ',
				'  aaaaaa33aaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   '
			], colors, 2);

			var upCycle = [humanUp1, humanUp2, humanUp3, humanUp2, humanUp1, humanUp4, humanUp5, humanUp4];

			var death1 = Pixel([
				'                ',
				'        d       ',
				'        d       ',
				'        d       ',
				'       d1d      ',
				'       d1d      ',
				'   dd  d1d  dd  ',
				'   d1dd11 dd1d  ',
				'    d1 1c111d   ',
				'    d111c111d   ',
				'     d1cbc1d    ',
				'    d11cbc11d   ',
				' ddd11cbbbc11ddd',
				'    d11cbc1 d   ',
				'     d1cbc1d    ',
				'    d111c111d   ',
				'    d111c111d   ',
				'   d1dd111dd1d  ',
				'   dd  d1d  dd  ',
				'       d1d      ',
				'       d1d      ',
				'        d       ',
				'        d       ',
				'        d       '
			], colors, 2);
			var death2 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'        d       ',
				'        d       ',
				'       d1d      ',
				'     d d1d d1   ',
				'    d1d1c1d1d   ',
				'     d11c11d    ',
				'     d1cbc1d    ',
				'     d1cbc1d    ',
				'   dd1cbbbc1dd  ',
				'     d1cbc1d    ',
				'     d1cbc1d    ',
				'     d11c11d    ',
				'    d1d1c1d1d   ',
				'     d d1d d    ',
				'       d1d      ',
				'        d       ',
				'        d       ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var death3 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'        d       ',
				'        d       ',
				'       d1d      ',
				'      d1c1d     ',
				'      d1c1d     ',
				'     d1cbc1d    ',
				'     d1cbc1d    ',
				'   dd1cbbbc1dd  ',
				'     d1cbc1d    ',
				'     d1cbc1d    ',
				'      d1c1d     ',
				'      d1c1d     ',
				'       d1d      ',
				'        d       ',
				'        d       ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var death4 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'        d       ',
				'       d1d      ',
				'       d1d      ',
				'      d1c1d     ',
				'      d1c1d     ',
				'     d1cbc1d    ',
				'      d1c1d     ',
				'      d1c1d     ',
				'       d1d      ',
				'       d1d      ',
				'        d       ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var death5 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'        1       ',
				'        1       ',
				'        d       ',
				'      1dbd1     ',
				'        d       ',
				'        1       ',
				'        1       ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var death6 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var deathCycle = [death1, death2, death3, death4, death5, death6];
		}
		// equipment animations
		{
			var Shirt = function(a, b, c) {
				var tempColors = {
					'a': color(0, 0, 0),
					'q': colors[a],
					'r': colors[b],
					's': colors[c],
					' ': color(255, 255, 255, 0),
				};
				var temp = {
					up: [],
					down: [],
					left: [],
					right: []
				};
				var up = [
					['                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    a      a    ',
						'   aqa    aqa   ',
						'  asrqaaaaqrsa  ',
						' asrqsqqqqrqrsa ',
						' asqasssssraqsa ',
						' aaaarssssraaaa ',
						'    aqssssqa    ',
						'    aqqrrqqa    ',
						'    aaaaaaaa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    a      a    ',
						'   aqa    aqa   ',
						'  asrqaaaaqrsa  ',
						' asrqsqqqqsqrsa ',
						' asaasssssqaaaa ',
						' aa arssssqa    ',
						'    aqssssqa    ',
						'    aqqrrqqa    ',
						'    aaaaaaaa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    a      a    ',
						'   aqa    aqa   ',
						'  asrqaaaaqrsa  ',
						'  arqsqqqsrrra  ',
						'  aqassssqaara  ',
						'  aqarssqa  a   ',
						'   aarrsqa      ',
						'    aqrssa       ',
						'     aaaa       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    a      a    ',
						'   aqa    aqa   ',
						'  asrqaaaaqrsa  ',
						' asrqsqqqqsqrsa ',
						' aaaaqsssssaasa ',
						'    aqssssra aa ',
						'    aqssssqa    ',
						'    aqqrrqqa    ',
						'    aaaaaaaa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    a      a    ',
						'   aqa    aqa   ',
						'  asrqaaaaqrsa  ',
						'  arrrsqqqsqra  ',
						'  araaqssssaqa  ',
						'   a  aqssraqa  ',
						'      aqsrraa   ',
						'      aqqsaqa    ',
						'       aaaa     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					]
				];
				var down = [
					['                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    a      a    ',
						'   aqa    aqa   ',
						'  asrqaaaaqrsa  ',
						' asrqsssssrqrsa ',
						' asqasssssraqsa ',
						' aaaarssssraaaa ',
						'    aqrsssqa    ',
						'    aqqrrqqa    ',
						'     aaaaaa     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     a    a     ',
						'    aqaaaaqa    ',
						'   assqqqqrqa   ',
						'   arsssssrrsa  ',
						'   aqqsssqaasa  ',
						'    arrrqa  aa  ',
						'    aqaaqa      ',
						'     a  a       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					['                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     a    a     ',
						'    aqaaaaqa    ',
						'   assqqqqrqa   ',
						'   arsssssrrsa  ',
						'   aqqsssaarsa  ',
						'    arrsa  asa  ',
						'    aqaa    a   ',
						'     a          ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     a    a     ',
						'    aqaaaaqa    ',
						'   aqrqqqqssa   ',
						'  asrrsssssra   ',
						'  asaaqsssqqa   ',
						'  aa  aqrrra    ',
						'      aqaaqa    ',
						'       a  a     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     a    a     ',
						'    aqaaaaqa    ',
						'   aqrqqqqssa   ',
						'  asrrsssssra   ',
						'  asraasssqqa   ',
						'  asa  asrra    ',
						'   a    aaqa    ',
						'          a     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					]
				];
				var left = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'          a     ',
						'    aaa  ara    ',
						'    aqqaarsra   ',
						'    arsrarsra   ',
						'    aasqaarsa   ',
						'     asa  asa   ',
						'      qa  aa    ',
						'      aa        ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'          a     ',
						'     aa  araa   ',
						'    aqqaarssra  ',
						'    assrrrasra  ',
						'    aasqraarra  ',
						'    aasra  aqa  ',
						'     aqaa  aa   ',
						'      a         ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'          a     ',
						'     aa  araa   ',
						'    aqqaarsrra  ',
						'    arsrrraarqa ',
						'    aasqra  aqa ',
						'    aasaaa  aa  ',
						'      a         ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa  aa     ',
						'    aqqaarra    ',
						'    arsrarsra   ',
						'    aasaaarsa   ',
						'      a  arqa   ',
						'         aqa    ',
						'          a     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    aaa  a      ',
						'    aqqaara     ',
						'    arsrarsa    ',
						'    arsaarra    ',
						'    ara  aqa    ',
						'    aqa  aa     ',
						'    aa          ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					]
				];
				var right = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     a          ',
						'    ara  aaa    ',
						'   arsraaqqa    ',
						'   arsrarsra    ',
						'   asraaqsaa    ',
						'   asa  asa     ',
						'    aa  aq      ',
						'        aa      ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     a          ',
						'   aara  aa     ',
						'  arssraaqqa    ',
						'  arsarrrssa    ',
						'  arraarqsaa    ',
						'  aqa  arsaa    ',
						'   aa  aaqa     ',
						'         a      ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     a          ',
						'   aara  aa     ',
						'  arrsraaqqa    ',
						' aqraarrrsra    ',
						' aqa  arqsaa    ',
						'  aa  aaasaa    ',
						'         a      ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa  aa     ',
						'    arraaqqa    ',
						'   arsrarsra    ',
						'   asraaasaa    ',
						'   aqra  a      ',
						'    aqa         ',
						'     a          ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      a  aaa    ',
						'     araaqqa    ',
						'    asrarsra    ',
						'    arraasra    ',
						'    aqa  ara    ',
						'     aa  aaa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					]
				];
				var cycle = [0, 1, 2, 1, 0, 3, 4, 3];

				for (var i = 0; i < cycle.length; i++) {
					temp.up.push(Pixel(up[cycle[i]], tempColors, 2));
					temp.down.push(Pixel(down[cycle[i]], tempColors, 2));
					temp.left.push(Pixel(left[cycle[i]], tempColors, 2));
					temp.right.push(Pixel(right[cycle[i]], tempColors, 2));
				}
				return temp;
			};
			var DetailedShirt = function(pixmap1, pixmap2) {
				var defaultShirt = [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   ala    ala   ',
        '  alllaaaallla  ',
        ' alllllllllllla ',
        ' allallllllalla ',
        ' aaaallllllaaaa ',
        '    alllllla    ',
        '    alllllla    ',
        '     aaaaaa     ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '];
				var temp = {
					up: [],
					down: [],
					left: [],
					right: []
				};
				var up = [
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    W      W    ',
        '   WaW    WbW   ',
        '  WcdeWWWWfghW  ',
        ' WijklmnopqrstW ',
        ' WuvWwxyzABWCDW ',
        ' WWWWEFGHIJWWWW ',
        '    WKLMNOPW    ',
        '    WQRSTUVW    ',
        '     WWWWWW     ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    W      W    ',
        '   WaW    WbW   ',
        '  WcdeWWWWfghW  ',
        ' WijklmnopqrsDW ',
        ' WUWWwxyzAbWWWW ',
        ' WW WEFGHIJW    ',
        '    WKLMNOPW    ',
        '    WQRSTUVW    ',
        '    WWWWWWWW    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    W      W    ',
        '   WaW    WbW   ',
        '  WcdeWWWWfghW  ',
        '  WiklmnoprstW  ',
        '  WjWxyzABWWDW  ',
        '  WUWEFGHW  W   ',
        '   WWKLMNW      ',
        '    WQRSTW      ',
        '     WWWW       ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    W      W    ',
        '   WbW    WaW   ',
        '  WhgfWWWWedcW  ',
        ' WDsrqponmlkjiW ',
        ' WWWWbAzyxwWWUW ',
        '    WJIHGFEW WW ',
        '    WPONMLKW    ',
        '    WVUTSRQW    ',
        '    WWWWWWWW    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    W      W    ',
        '   WbW    WaW   ',
        '  WhgfWWWWedcW  ',
        '  WtsrponmlkiW  ',
        '  WDWWBAzyxWjW  ',
        '   W  WHGFEWUW  ',
        '      WNMLKWW   ',
        '      WTSRQW    ',
        '       WWWW     ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']
    ];
				var down = [
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    W      W    ',
        '   WaW    WbW   ',
        '  WcdeWWWWfghW  ',
        ' WijklmnopqrstW ',
        ' WuvWwxyzABWCDW ',
        ' WWWWEFGHIJWWWW ',
        '    WKLMNOPW    ',
        '    WQRSTUVW    ',
        '     WWWWWW     ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     W    W     ',
        '    WaWWWWbW    ',
        '   WdlmnopghW   ',
        '   WjwxyzArstW  ',
        '   WuEFGHIWWDW  ',
        '    WKLMNW  WW  ',
        '    WQWWTW      ',
        '     W  W       ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     W    W     ',
        '    WeWWWWfW    ',
        '   WdlmnopghW   ',
        '   WjwxyzArstW  ',
        '   WuEFGHWWctW  ',
        '    WKLMW  WdW  ',
        '    WQWW    W   ',
        '     W          ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     W    W     ',
        '    WbWWWWaW    ',
        '   WhgponmldW   ',
        '  WtsrAzyxwjW   ',
        '  WDWWIHGFEuW   ',
        '  WW  WNMLKW    ',
        '      WTWWQW    ',
        '       W  W     ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     W    W     ',
        '    WfWWWWeW    ',
        '   WhgponmldW   ',
        '  WtsrAzyxwjW   ',
        '  WtcWWHGFEuW   ',
        '  WdW  WMLKW    ',
        '   W    WWQW    ',
        '          W     ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']
        ];
				var left = [
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '          W     ',
        '    WWW  WbW    ',
        '    WlmWWfghW   ',
        '    WwxyWrstW   ',
        '    WWFGWWCCW   ',
        '     WLW  WDW   ',
        '      RW  WW    ',
        '      WW        ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '          W     ',
        '     WW  WbWW   ',
        '    WlmWWpfghW  ',
        '    WwxnoAWrsW  ',
        '    WWFyzWWCtW  ',
        '    WWLGW  WDW  ',
        '     WRWW  WW   ',
        '      W         ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '          W     ',
        '     WW  WfWW   ',
        '    WlmWWPghhW  ',
        '    WwxnoAWWrsW ',
        '    WWFyzW  WDW ',
        '    WWLWWW  WW  ',
        '      W         ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     WW  WW     ',
        '    WemWWfbW    ',
        '    WlxnWghrW   ',
        '    WWFWWWstW   ',
        '      W  WCDW   ',
        '         WDW    ',
        '          W     ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    WWW  W      ',
        '    WemWWbW     ',
        '    WlxnWghW    ',
        '    WwFWWstW    ',
        '    WEW  WDW    ',
        '    WKW  WW     ',
        '    WW          ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']
        ];
				var right = [
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     W          ',
        '    WbW  WWW    ',
        '   WhgfWWmlW    ',
        '   WtsrWyxwW    ',
        '   WCCWWGFWW    ',
        '   WDW  WLW     ',
        '    WW  WR      ',
        '        WW      ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     W          ',
        '   WWbW  WW     ',
        '  WhgfpWWmlW    ',
        '  WsrWAonxwW    ',
        '  WtCWWzyFWW    ',
        '  WDW  WGLWW    ',
        '   WW  WWRW     ',
        '         W      ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     W          ',
        '   WWfW  WW     ',
        '  WhhgPWWmlW    ',
        ' WsrWWAonxwW    ',
        ' WDW  WzyFWW    ',
        '  WW  WWWLWW    ',
        '         W      ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     WW  WW     ',
        '    WbfWWmeW    ',
        '   WrhgWnxlW    ',
        '   WtsWWWFWW    ',
        '   WDCW  W      ',
        '    WDW         ',
        '     W          ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
            [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '      W  WWW    ',
        '     WbWWmeW    ',
        '    WhgWnxlW    ',
        '    WtsWWFwW    ',
        '    WDW  WEW    ',
        '     WW  WKW    ',
        '          WW    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']
        ];

				var cycle = [0, 1, 2, 1, 0, 3, 4, 3];


				var index = {};
				var indexBack = {};
				var count = 0;
				var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV';
				for (var y = 0; y < defaultShirt.length; y++) {
					for (var x = 0; x < defaultShirt[y].length; x++) {
						if (defaultShirt[y][x] === 'l') {
							index[chars[count]] = pixmap1[y][x];
							indexBack[chars[count]] = pixmap2[y][x];
							count++;
						}
					}
				}
				for (var i = 0; i < 5; i++) {
					for (var y = 0; y < down[i].length; y++) {
						for (var x = 0; x < down[i][y].length; x++) {
							var pixelUp = up[i][y][x];
							var pixelDown = down[i][y][x];
							var pixelLeft = left[i][y][x];
							var pixelRight = right[i][y][x];

							if (pixelUp === 'W') {
								up[i][y] = StringReplace(up[i][y], x, 'a');
							} else if (pixelUp !== ' ') {
								up[i][y] = StringReplace(up[i][y], x, indexBack[pixelUp]);
							}
							if (pixelDown === 'W') {
								down[i][y] = StringReplace(down[i][y], x, 'a');
							} else if (pixelDown !== ' ') {
								down[i][y] = StringReplace(down[i][y], x, index[pixelDown]);
							}
							if (pixelLeft === 'W') {
								left[i][y] = StringReplace(left[i][y], x, 'a');
							} else if (pixelLeft !== ' ') {
								left[i][y] = StringReplace(left[i][y], x, index[pixelLeft]);
							}
							if (pixelRight === 'W') {
								right[i][y] = StringReplace(right[i][y], x, 'a');
							} else if (pixelRight !== ' ') {
								right[i][y] = StringReplace(right[i][y], x, index[pixelRight]);
							}
						}
					}
				}

				for (var i = 0; i < cycle.length; i++) {
					temp.up.push(Pixel(up[cycle[i]], colors, 2));
					temp.down.push(Pixel(down[cycle[i]], colors, 2));
					temp.left.push(Pixel(left[cycle[i]], colors, 2));
					temp.right.push(Pixel(right[cycle[i]], colors, 2));
				}
				return temp;
			};
			var Pants = function(a, b, c) {
				var tempColors = {
					'a': color(0, 0, 0),
					'q': colors[a],
					'r': colors[b],
					's': colors[c],
					' ': color(255, 255, 255, 0),
				};
				var temp = {
					up: [],
					down: [],
					left: [],
					right: []
				};
				var up = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aaaaaa     ',
						'     asqrsa     ',
						'     asqrsa     ',
						'     aaaaaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aaaaaaa    ',
						'     asrrrra    ',
						'     asrqqra    ',
						'     asraaaa    ',
						'     aaaa       ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         a      ',
						'     aaaaqaa    ',
						'     asrrqra    ',
						'     asraaaa    ',
						'     asra       ',
						'     aaaa       ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    aaaaaaa     ',
						'    arrrrsa     ',
						'    arqqrsa     ',
						'    aaaarsa     ',
						'       aaaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      a         ',
						'    aaqaaaa     ',
						'    arqrrsa     ',
						'    aaaarsa     ',
						'       arsa     ',
						'       aaaa     ',
						'                ',
						'                ',
						'                '
					]
				];
				var down = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'              ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aaaaaa     ',
						'     asqrsa     ',
						'     asqrsa     ',
						'     aaaaaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aa a      ',
						'     arsasaa    ',
						'    arrqqssa    ',
						'     aaqqsra    ',
						'       aaaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aaa       ',
						'     asrqaaa    ',
						'    aaaqqrra    ',
						'       aarqa    ',
						'         aaa    ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      a aa      ',
						'    aasasra     ',
						'    assqqrra    ',
						'    arsqqaa     ',
						'     aaaa       ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'       aaa      ',
						'    aaaqrsa     ',
						'    arrqqaaa    ',
						'    aqraa       ',
						'    aaa         ',
						'                ',
						'                ',
						'                '
					]
				];
				var left = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aaaaaa     ',
						'     aqqsqa     ',
						'     aqqsra     ',
						'     aaaaaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aaaaa      ',
						'     aqrsa      ',
						'     aqsaa      ',
						'     aaa        ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'       aaa      ',
						'      asrqa     ',
						'     assra      ',
						'     aaaa       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      a         ',
						'    aaqaaaa     ',
						'    arqqsqa     ',
						'    aaaasra     ',
						'       aaaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      a         ',
						'    aaqaaaa     ',
						'   arrqqsqa     ',
						'   aaaaasra     ',
						'       aaaa     ',
						'                ',
						'                ',
						'                '
					]
				];
				var right = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aaaaaa     ',
						'     aqsqqa     ',
						'     arsqqa     ',
						'     aaaaaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aaaaa     ',
						'      asrqa     ',
						'      aasqa     ',
						'        aaa     ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aaa       ',
						'     aqrsa      ',
						'      arssa     ',
						'       aaaa     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         a      ',
						'     aaaaqaa    ',
						'     aqsqqra    ',
						'     arsaaaa    ',
						'     aaaa       ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         a      ',
						'     aaaaqaa    ',
						'     aqsqqrra   ',
						'     arsaaaaa   ',
						'     aaaa       ',
						'                ',
						'                ',
						'                '
					]
				];
				var cycle = [0, 1, 2, 1, 0, 3, 4, 3];

				for (var i = 0; i < cycle.length; i++) {
					temp.up.push(Pixel(up[cycle[i]], tempColors, 2));
					temp.down.push(Pixel(down[cycle[i]], tempColors, 2));
					temp.left.push(Pixel(left[cycle[i]], tempColors, 2));
					temp.right.push(Pixel(right[cycle[i]], tempColors, 2));
				}
				return temp;
			};
			var Gloves = function(a, b) {
				var tempColors = {
					'a': color(0, 0, 0),
					'q': colors[a],
					'r': colors[b],
					' ': color(255, 255, 255, 0),
				};
				var temp = {
					up: [],
					down: [],
					left: [],
					right: []
				};
				var up = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'  aa        aa  ',
						' arqa      aqra ',
						' aqqa      aqqa ',
						'  aa        aa  ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'   a        aa  ',
						'  ara      aqra ',
						'  aqa      aqqa ',
						'   a        aa  ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'          aa    ',
						'         aqra   ',
						'         aqqa   ',
						'          aa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'  aa        a   ',
						' arqa      ara  ',
						' aqqa      aqa  ',
						'  aa        a   ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    aa          ',
						'   arqa         ',
						'   aqqa         ',
						'    aa          ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					]
				];
				var down = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'  aa        aa  ',
						' arqa      aqra ',
						' aqqa      aqqa ',
						'  aa        aa  ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'  aa      aa    ',
						' arqa    aqra   ',
						' aqqa    aqqa   ',
						'  aa      aa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'   a     aa     ',
						'  aqa   arqa    ',
						'  aqa   aqqqa   ',
						'   a     aaa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    aa      aa  ',
						'   arqa    aqra ',
						'   aqqa    aqqa ',
						'    aa      aa  ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa     a   ',
						'    aqra   aqa  ',
						'   aqqqa   aqa  ',
						'    aaa     a   ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					]
				];
				var left = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'   aa   aa      ',
						'  arqa arra     ',
						'  aqqa aqqa     ',
						'   aa   aa      ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'  aa            ',
						' arqa    aa     ',
						' aqqa   arra    ',
						'  aa    aqqa    ',
						'         aa     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'  aa            ',
						' arqa     aa    ',
						' aqqa    arra   ',
						'  aa     aqqa   ',
						'          aa    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    a  aa       ',
						'   araarra      ',
						'   aqaaqqa      ',
						'    a  aa       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'       aa       ',
						'      arra      ',
						'      aqqa      ',
						'       aa       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					]
				];
				var right = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aa   aa   ',
						'     arra aqra  ',
						'     aqqa aqqa  ',
						'      aa   aa   ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'            aa  ',
						'     aa    aqra ',
						'    arra   aqqa ',
						'    aqqa    aa  ',
						'     aa         ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'            aa  ',
						'    aa     aqra ',
						'   arra    aqqa ',
						'   aqqa     aa  ',
						'    aa          ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'       aa  a    ',
						'      arraara   ',
						'      aqqaaqa   ',
						'       aa  a    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'       aa       ',
						'      arra      ',
						'      aqqa      ',
						'       aa       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '
					],
				];
				var cycle = [0, 1, 2, 1, 0, 3, 4, 3];

				for (var i = 0; i < cycle.length; i++) {
					temp.up.push(Pixel(up[cycle[i]], tempColors, 2));
					temp.down.push(Pixel(down[cycle[i]], tempColors, 2));
					temp.left.push(Pixel(left[cycle[i]], tempColors, 2));
					temp.right.push(Pixel(right[cycle[i]], tempColors, 2));
				}
				return temp;
			};
			var Boots = function(a, b) {
				var tempColors = {
					'a': color(0, 0, 0),
					'q': colors[a],
					'r': colors[b],
					' ': color(255, 255, 255, 0),
				};
				var temp = {
					up: [],
					down: [],
					left: [],
					right: []
				};
				var up = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aaaa      ',
						'     arqqra     ',
						'      aaaa      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         aa     ',
						'      aaaqra    ',
						'     arqaaa     ',
						'      aa        ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         aa     ',
						'        aqra    ',
						'      aa aa     ',
						'     arqa       ',
						'      aa        ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa         ',
						'    arqaaa      ',
						'     aaaqra     ',
						'        aa      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa         ',
						'    arqa        ',
						'     aa aa      ',
						'       aqra     ',
						'        aa      ',
						'                '
					]

				];
				var down = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aaaa      ',
						'     arqqra     ',
						'      aaaa      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa         ',
						'    arqa aa     ',
						'     aa aqra    ',
						'         aa     ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa         ',
						'    arqa        ',
						'     aa  aa     ',
						'        aqra    ',
						'         aa     ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         aa     ',
						'     aa aqra    ',
						'    arqa aa     ',
						'     aa         ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         aa     ',
						'        aqra    ',
						'     aa  aa     ',
						'    arqa        ',
						'     aa         ',
						'                '
					]
				];
				var left = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      a aa      ',
						'     aqarqa     ',
						'      a aa      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'        aa      ',
						'      aarqa     ',
						'     aqaaa      ',
						'      a         ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aa        ',
						'     arqa       ',
						'      aa        ',
						'     aqa        ',
						'      a         ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     aa         ',
						'    arqaaa      ',
						'     aaarqa     ',
						'        aa      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    aa          ',
						'   arqa aa      ',
						'    aa arqa     ',
						'        aa      ',
						'                '
					],
				];
				var right = [
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aa a      ',
						'     aqraqa     ',
						'      aa a      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      aa        ',
						'     aqraa      ',
						'      aaaqa     ',
						'         a      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'        aa      ',
						'       aqra     ',
						'        aa      ',
						'        aqa     ',
						'         a      ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         aa     ',
						'      aaaqra    ',
						'     aqraaa     ',
						'      aa        ',
						'                '
					],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'          aa    ',
						'      aa aqra   ',
						'     aqra aa    ',
						'      aa        ',
						'                '
					],
				];
				var cycle = [0, 1, 2, 1, 0, 3, 4, 3];

				for (var i = 0; i < cycle.length; i++) {
					temp.up.push(Pixel(up[cycle[i]], tempColors, 2));
					temp.down.push(Pixel(down[cycle[i]], tempColors, 2));
					temp.left.push(Pixel(left[cycle[i]], tempColors, 2));
					temp.right.push(Pixel(right[cycle[i]], tempColors, 2));
				}
				return temp;
			};
			var Head = function(up, down, left, right) {
				var image = {};
				image.up = Pixel(up, colors, 2);
				image.down = Pixel(down, colors, 2);
				image.left = Pixel(left, colors, 2);
				image.right = Pixel(right, colors, 2);
				return image;
			};
			var ShortHair = function(b, c, d) {
				var image = {};
				var newColors = {
					'a': colors['a'],
					'b': colors[b],
					'c': colors[c],
					'd': colors[d],
					' ': colors[' ']
				};
				image.down = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'    aaccddaa    ',
				'   acccdbbdca   ',
				'   acddbbddda   ',
				'  acdbbbdbbbda  ',
				'  abbaaabaabba  ',
				'  aba   a  aba  ',
				'   a        a   ',
				'                ',
				'                ',
				'                ',
				'                '], newColors, 2);
				image.up = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'    aaddddaa    ',
				'   adddddddda   ',
				'   acdcdcdcda   ',
				'  acdccddcdcba  ',
				'  abbcdcdcbdba  ',
				'  abcbcbcbcbba  ',
				'   abbbbbbcaa   ',
				'    aaacbaa     ',
				'       aa       ',
				'                ',
				'                '], newColors, 2);
				image.left = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'    aaddddaa    ',
				'   acddddcdda   ',
				'   adcdcddccaa  ',
				'  abbbcbcdbdca  ',
				'  ababaabcbbca  ',
				'  aa a  abacba  ',
				'         a aba  ',
				'            a   ',
				'                ',
				'                ',
				'                '], newColors, 2);
				image.right = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'    aaddddaa    ',
				'   addcddddca   ',
				'  aaccddcdcda   ',
				'  acdbdcbcbbba  ',
				'  acbbcbaababa  ',
				'  abcaba  a aa  ',
				'  aba a         ',
				'   a            ',
				'                ',
				'                ',
				'                '], newColors, 2);
				return image;
			};
			var LongHair = function(b, c, d) {
				var image = {};
				var newColors = {
					'a': colors['a'],
					'b': colors[b],
					'c': colors[c],
					'd': colors[d],
					' ': colors[' ']
				};
				image.up = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaaa     ',
				'    abccccba    ',
				'   abcddddcba   ',
				'   abdddcddba   ',
				'  abdbddddbdba  ',
				'  abcbdbdcdcba  ',
				'  adbccbdcdcba  ',
				'  adbdcddbcbda  ',
				'  acbdbdcbdbca  ',
				'  abcbcdccbcba  ',
				'   acbcbcbbca   ',
				'    aaaaaaaa    '], newColors, 2);
				image.down = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaaa     ',
				'    adddddda    ',
				'   addcdcccda   ',
				'   adcccbbcda   ',
				'  acccbbbcbbda  ',
				'  acbaaabaabca  ',
				'  aba   a  aba  ',
				'  aa        aa  ',
				'  aba      aba  ',
				'  aca      aca  ',
				'   aba    aba   ',
				'    a      a    '], newColors, 2);
				image.left = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      aaaaa     ',
				'     acdddcaa   ',
				'    acddcddca   ',
				'   abdcccdcdba  ',
				'   abcbbccbcba  ',
				'    abaabbabcba ',
				'     a  aa acba ',
				'           abca ',
				'            aca ',
				'           abca ',
				'          abcba ',
				'           aaa  '], newColors, 2);
				image.right = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaa      ',
				'   aacdddca     ',
				'   acddcddca    ',
				'  abdcdcccdba   ',
				'  abcbccbbcba   ',
				' abcbabbaaba    ',
				' abca aa  a     ',
				' acba           ',
				' aca            ',
				' acba           ',
				' abcba          ',
				'  aaa           '], newColors, 2);
				return image;
			};
			var SpikedHair = function(b, c, d) {
				var image = {};
				var newColors = {
					'a': colors['a'],
					'b': colors[b],
					'c': colors[c],
					'd': colors[d],
					' ': colors[' ']
				};
				image.down = Pixel([
				'   a    a       ',
				'  ada  ada  aa  ',
				'  abdaacda adda ',
				'a  acdabcdadba  ',
				'aa abcdcdddcca  ',
				'adadcddcddcddda ',
				'acdcddcdccdcdcba',
				'abcddddccdddcca ',
				' abcdbbbdbbbdba ',
				' abbbaaabaabba  ',
				'  aba   a  aba  ',
				'   a        a   ',
				'                ',
				'                ',
				'                ',
				'                '], newColors, 2);
				image.up = Pixel([
				'       a    a   ',
				'  aa  ada  ada  ',
				' adda adcaadba  ',
				'  abdadcbadca  a',
				'  accdddcdcba aa',
				' adddcddcddcdada',
				'abcdcdccdcddcdca',
				' accdddccddddcba',
				' acdccbdcccdcba ',
				' abcbbcccbcccba ',
				'  abccbbcccbba  ',
				'   abbcccbbba   ',
				'    aabbbaaa    ',
				'      aaa       ',
				'                ',
				'                '], newColors, 2);
				image.left = Pixel([
				'                ',
				'      a a a     ',
				'     adabada    ',
				'    addaadca a  ',
				'    adccdccaada ',
				'   aadcdddaadda ',
				'   adcdddcdddca ',
				'   adcdcddccdca ',
				'  acbbcbcdbdcba ',
				'  ababaabcbbcba ',
				'  aa a  abacba  ',
				'         a aba  ',
				'            a   ',
				'                ',
				'                ',
				'                '], newColors, 2);
				image.right = Pixel([
				'                ',
				'     a a a      ',
				'    adabada     ',
				'  a acdaadda    ',
				' adaaccdccda    ',
				' addaadddcdaa   ',
				' acdddcdddcda   ',
				' acdccddcdcda   ',
				' abcdbdcbcbbca  ',
				' abcbbcbaababa  ',
				'  abcaba  a aa  ',
				'  aba a         ',
				'   a            ',
				'                ',
				'                ',
				'                '], newColors, 2);
				return image;
			};

			var blueJeansAnimation = Pants('z', 'A', 'B');
			var steelLeggingsAnimation = Pants('b', '6', 'd');
			var blackPantsAnimation = Pants('a', '4', 'b');
			var shadowPlateAnimation = Pants('G', 'H', 'I');
			var brownPantsAnimation = Pants('O', 'P', 'Q');
			var crystallineLeggingsAnimation = Pants('y', 'z', 'A');

			var greenShirtAnimation = Shirt('r', 's', 't');
			var yellowShirtAnimation = Shirt('n', 'o', 'p');
			var redShirtAnimation = Shirt('e', 'f', 'g');
			var blueShirtAnimation = Shirt('z', 'A', 'B');
			var blackShirtAnimation = Shirt('a', '4', 'b');
			var steelBreastplateAnimation = DetailedShirt([
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   a6a    a6a   ',
        '  a65AaaaaA56a  ',
        ' a6cbAzzzzAbc6a ',
        ' ac5aznnnnza5ca ',
        ' aaaaznmmnzaaaa ',
        '    ayznnzya    ',
        '    ayyyyyya    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '], [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   a6a    a6a   ',
        '  a65AaaaaA56a  ',
        ' a6cbAzzzzAbc6a ',
        ' ac5azzzzzza5ca ',
        ' aaaazzzzzzaaaa ',
        '    ayzzzzya    ',
        '    ayyyyyya    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']);
			var rogerShirtAnimation = DetailedShirt([
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   aqa    aqa   ',
        '  arrqaaaaqrra  ',
        ' aomrrqqqqrrnoa ',
        ' anmarrrrrramna ',
        ' aaaamrrrrmaaaa ',
        '    anmmmmna    ',
        '    anoooona    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '], [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   aqa    aqa   ',
        '  arrqaaaaqrra  ',
        ' aomrrqqqqrrnoa ',
        ' anmarrrrrramna ',
        ' aaaamrrrrmaaaa ',
        '    anmmmmna    ',
        '    anoooona    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']);
			var funeralWrapAnimation = DetailedShirt([
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   a1a    a1a   ',
        '  a117aaaa171a  ',
        ' a117111711171a ',
        ' a17a711177a11a ',
        ' aaaa171111aaaa ',
        '    a117711a    ',
        '    a111177a    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   a1a    a1a   ',
        '  a117aaaa171a  ',
        ' a117111711171a ',
        ' a17a711177a11a ',
        ' aaaa171111aaaa ',
        '    a117711a    ',
        '    a111177a    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']);
			var cowboyShirtAnimation = DetailedShirt([
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   aOa    aOa   ',
        '  aQPOaaaaOPQa  ',
        ' aQPOP7777POPQa ',
        ' aPOaOR11ROaOPa ',
        ' aaaaOPRROOaaaa ',
        '    aOPOOPOa    ',
        '    aOPOPPOa    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    a      a    ',
        '   aOa    aOa   ',
        '  aQPOaaaaOPQa  ',
        ' aQPOPPPPPPOPQa ',
        ' aPOaOPPPPOaOPa ',
        ' aaaaOPPPPOaaaa ',
        '    aOPOOPOa    ',
        '    aOPPPPOa    ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']);

			var greenCrocsAnimation = Boots('r', 's');
			var steelBootsAnimation = Boots('d', '7');
			var tanShoesAnimation = Boots('U', 'V');
			var redSneakersAnimation = Boots('1', 'e');
			var blackBootsAnimation = Boots('a', 'b');

			var blackGlovesAnimation = Gloves('a', 'b');
			var bloodSandGlovesAnimation = Gloves('i', 'j');

			var steelHelmetAnimation = Head(
				[
				'                ',
				'                ',
				'                ',
				'       aa       ',
				'     aaddaa     ',
				'    add77dda    ',
				'    ad7777da    ',
				'   add7777dda   ',
				'   addd77ddda   ',
				'   a6dd77dd6a   ',
				'   a6dddddd6a   ',
				'   ac6dddd6ca   ',
				'    a666666a    ',
				'    acc66cca    ',
				'     aaccaa     ',
				'       aa       '
				], [
				'                ',
				'                ',
				'                ',
				'       aa       ',
				'     aaddaa     ',
				'    add77dda    ',
				'    ad7777da    ',
				'   a6dd77dd6a   ',
				'   a66dddd66a   ',
				'   a66a66a66a   ',
				'   a6a aa a6a   ',
				'   aca    aca   ',
				'   aca    aca   ',
				'    aca  aca    ',
				'     aa  aa     ',
				'      a  a      '
				], [
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'     addddaa    ',
				'    add777dda   ',
				'    ad77777da   ',
				'   addddd77da   ',
				'   add6ddd7dda  ',
				'   aa6ca6dd76a  ',
				'   a aa adddca  ',
				'   a    ad66ca  ',
				'   a    a66ca   ',
				'   a    a6ca    ',
				'   a    aca     ',
				'   a    aa      '
				], [
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'    aadddda     ',
				'   add777dda    ',
				'   ad77777da    ',
				'   ad77ddddda   ',
				'  add7ddd6dda   ',
				'  a67dd6ac6aa   ',
				'  acddda aa a   ',
				'  ac66da    a   ',
				'   ac66a    a   ',
				'    ac6a    a   ',
				'     aca    a   ',
				'      aa    a   '
				]);
			var redMaskAnimation = Head([
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     aaaaaa     ',
        '    affggffa    ',
        '   affggggffa   ',
        '   afffggfffa   ',
        '   aeffffffea   ',
        '   aeeffffeea   ',
        '   aeeeeeeeea   ',
        '    aeeeeeea    ',
        '    aeeeeeea    ',
        '     aeeeea     ',
        '      aaaa      '], [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     aaaaaa     ',
        '    affggffa    ',
        '   affggggffa   ',
        '   afeffffefa   ',
        '   aeeeeeeeea   ',
        '   aee    eea   ',
        '   ae      ea   ',
        '    aeffffea    ',
        '    aeefeeea    ',
        '     aeeeea     ',
        '      aaaa      '], [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '      aaaaa     ',
        '     afgggfaa   ',
        '    afgggggfa   ',
        '   aefffffffea  ',
        '   aeeeeeeffea  ',
        '   a    eeefea  ',
        '   a     eeeea  ',
        '   afffeeeeea   ',
        '   aeeeeeeea    ',
        '    aeeeeea     ',
        '     aaaaa      '], [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '     aaaaa      ',
        '   aafgggfa     ',
        '   afgggggfa    ',
        '  aefffffffea   ',
        '  aeffeeeeeea   ',
        '  aefeee    a   ',
        '  aeeee     a   ',
        '   aeeeeefffa   ',
        '    aeeeeeeea   ',
        '     aeeeeea    ',
        '      aaaaa     ']);
			var testHelmetAnimation = Head(
				['                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaaa     ',
				'    a      a    ',
				'   a        a   ',
				'   a        a   ',
				'   a        a   ',
				'   a        a   ',
				'   a        a   ',
				'    a      a    ',
				'    a      a    ',
				'     a    a     ',
				'      aaaa      '], ['                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaaa     ',
				'    a      a    ',
				'   a        a   ',
				'   a        a   ',
				'   a        a   ',
				'   a        a   ',
				'   a a    a a   ',
				'    a aaaa a    ',
				'    a      a    ',
				'     a    a     ',
				'      aaaa      '], ['                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'      aaaaa     ',
				'     a     aa   ',
				'    a       a   ',
				'   a         a  ',
				'   a         a  ',
				'   a    a    a  ',
				'   aaaaa     a  ',
				'   a        a   ',
				'   a       a    ',
				'    a     a     ',
				'     aaaaa      '], ['                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaa      ',
				'   aa     a     ',
				'   a       a    ',
				'  a         a   ',
				'  a         a   ',
				'  a    a    a   ',
				'  a     aaaaa   ',
				'   a        a   ',
				'    a       a   ',
				'     a     a    ',
				'      aaaaa     ']
			);
			var capOfDarknessAnimation = Head(
        [
        '                ',
        '       aa       ',
        '   a   aa   a   ',
        '   a   aa   a   ',
        '   aa a44a aa   ',
        '   a4a4bb4a4a   ',
        '   a4baaaab4a   ',
        '   aabaaaabaa   ',
        '   a4ab44ba4a   ',
        '   a4aa44aa4a   ',
        '   aab4aa4baa   ',
        '   aa4abba4aa   ',
        '    aa4444a4    ',
        '    a4aaaa4a    ',
        '     a4444a     ',
        '      aaaa      '],
        [
        '                ',
        '       aa       ',
        '   a   aa   a   ',
        '   a   aa   a   ',
        '   aa aaaa aa   ',
        '   a4aabbaa4a   ',
        '   a4a4444a4a   ',
        '   aa4aaaa4aa   ',
        '   aaa4aa4aaa   ',
        '   a44a44a44a   ',
        '   aaa aa aaa   ',
        '   a4      4a   ',
        '    a4    4a    ',
        '    aaa  aaa    ',
        '     aa  aa     ',
        '      a  a      '],
        [
        '    a           ',
        '   aba a        ',
        '   aba aa       ',
        '   a4a aba   a  ',
        '   a4aaa4a  ab  ',
        '   a4aaa4aaaa4  ',
        '   a4bb4aa4a4a  ',
        '   aa44a4444ab  ',
        '   a4aa4aaa4ab  ',
        '   aaaaaaa4aab  ',
        '   a aa  a4a44  ',
        '   a     a4aa   ',
        '   a    a4a44   ',
        '   a4  4a4aaa   ',
        '   a4  a4aaa    ',
        '    a  aaaa     '],
        [
        '           a    ',
        '        a aba   ',
        '       aa aba   ',
        '  a   aba a4a   ',
        '  ba  a4aaa4a   ',
        '  4aaaa4aaa4a   ',
        '  a4a4aa4bb4a   ',
        '  ba4444a44aa   ',
        '  ba4aaa4aa4a   ',
        '  baa4aaaaaaa   ',
        '  44a4a  aa a   ',
        '   aa4a     a   ',
        '   44a4a    a   ',
        '   aaa4a4  4a   ',
        '    aaa4a  4a   ',
        '     aaaa  a    ']);
			var cowboyHatAnimation = Head([
        '                ',
        '                ',
        '                ',
        '      aaaa      ',
        '     aPPPPa     ',
        '  aaaaPPPPaaaa  ',
        ' aQQaPPPPPPaQQa ',
        'aQQQaOPPPPOaQQQa',
        'aQQQaOOOOOOaQQQa',
        ' aQQPaaaaaaPQQa ',
        '  aaQPPPPPPQaa  ',
        '    aaaaaaaa    ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '                ',
        '      aaaa      ',
        '     aQQQQa     ',
        ' aaaaPPQQPPaaaa ',
        'aQQPaPPPPPPaQQQa',
        'aPQQaOPPPPOaQQPa',
        'aPQQQQOOOOQQQQPa',
        ' aPPPaaaaaaPPPa ',
        '  aaa      aaa  ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '       aa       ',
        '     aaRRaa     ',
        '    aQRRRRQa    ',
        ' aaaaQQQQQPQa   ',
        'aPPPPaaaaPPPa   ',
        'aOOOPPPPPaaaaaa ',
        ' aaaOOOOOPPPPPPa',
        '    aaaaaOOOOOOa',
        '         aaaaaa ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                '],
        [
        '                ',
        '                ',
        '       aa       ',
        '     aaRRaa     ',
        '    aQRRRRQa    ',
        '   aQPQQQQQaaaa ',
        '   aPPPaaaaPPPPa',
        ' aaaaaaPPPPPOOOa',
        'aPPPPPPOOOOOaaa ',
        'aOOOOOOaaaaa    ',
        ' aaaaaa         ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ']);
			var mailCoifAnimation = Head(
				[
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaaa     ',
				'    adbdbdba    ',
				'   adb1b1bdba   ',
				'   abdb1bdbda   ',
				'   acbdbdbdba   ',
				'   abcbcbcbca   ',
				'   acbcbcbcba   ',
				'    acbcbcba    ',
				'    abcbcbca    ',
				'     abcbca     ',
				'      aaaa      '], [
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaaa     ',
				'    adb1bdba    ',
				'   acbdbdbdba   ',
				'   abcbcbcbca   ',
				'   acbaaaacba   ',
				'   aba    aca   ',
				'   aa      aa   ',
				'   a        a   ',
				'                ',
				'                ',
				'                '], [
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'      aaaaa     ',
				'     adb1bdaa   ',
				'    acbdbdbca   ',
				'   acbcbcbcbca  ',
				'   aaaaaacbcba  ',
				'         acbca  ',
				'         abcba  ',
				'         acba   ',
				'         aba    ',
				'          a     ',
				'                '], [
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     aaaaa      ',
				'   aadb1bda     ',
				'   acbdbdbca    ',
				'  acbcbcbcbca   ',
				'  abcbcaaaaaa   ',
				'  acbca         ',
				'  abcba         ',
				'   abca         ',
				'    aba         ',
				'     a          ',
				'                ']
			);
			var steelGreatHelmAnimation = Head(
				[
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'    aaccccaa    ',
				'   accddddcca   ',
				'   acdd11ddca   ',
				'   acd1111dca   ',
				'   acdd11ddca   ',
				'   accddddcca   ',
				'   acccccccca   ',
				'   abccccccba   ',
				'   abbbccbbba   ',
				'   abbbbbbbba   ',
				'    abbbbbba    ',
				'     aaaaaa     '
				], [
				'                ',
				'                ',
				'                ',
				'      aaaa      ',
				'    aaddddaa    ',
				'   add1111dda   ',
				'   addd11ddda   ',
				'   acddddddca   ',
				'   acccccccca   ',
				'   abccbbccba   ',
				'   abaaaaaaba   ',
				'   abbbaabbba   ',
				'    abbaabba    ',
				'    abbaabba    ',
				'     abaaba     ',
				'      aaaa      '
				], [
				'                ',
				'                ',
				'                ',
				'      aaaaa     ',
				'    aadddcdaa   ',
				'   add1111cdda  ',
				'   addd111cdda  ',
				'   accddddcdca  ',
				'   accccccccca  ',
				'   acbccccbcca  ',
				'   aaaaaccbbba  ',
				'   ababccbbbba  ',
				'   ababbbbbbba  ',
				'   ababbbbbbba  ',
				'    abbbbbabba  ',
				'     aaaaa aaa  '
				], [
				'                ',
				'                ',
				'                ',
				'     aaaaa      ',
				'   aadcdddaa    ',
				'  addc1111dda   ',
				'  addc111ddda   ',
				'  acdcddddcca   ',
				'  accccccccca   ',
				'  accbccccbca   ',
				'  abbbccaaaaa   ',
				'  abbbbccbaba   ',
				'  abbbbbbbaba   ',
				'  abbbbbbbaba   ',
				'  abbabbbbba    ',
				'  aaa aaaaa     '
				]
			);
			var steelGreatHelm = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaddddaaaa  ',
				'  aaadd11ddaaa  ',
				'  aaacddddcaaa  ',
				'  aaaccccccaaa  ',
				'  aaacaaaacaaa  ',
				'  aaabcaacbaaa  ',
				'  aaabbaabbaaa  ',
				'  aaaabbbbaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var niHelmetAnimation = Head(
				[
        '   a        a   ',
        '  a5a   a  a5a  ',
        '  a5a  a5a a5a  ',
        '  ab5a aba aba  ',
        '  abbaaabaaaba  ',
        '   aaaqaaaaaaa  ',
        '   aqqrqaarqa   ',
        '   a4rrqrqaaa   ',
        '   aaaaqaaaaa   ',
        '   aaaaaaaaaa   ',
        '   a4a4444a4a   ',
        '   a44aaaa44a   ',
        '   a44444444a   ',
        '   aaa4444aaa   ',
        '    aaaaaaaa    ',
        '     aaaaaa     '],
				[
        '   a        a   ',
        '  a5a  a   a5a  ',
        '  a5a a5a  a5a  ',
        '  aba aba a5ba  ',
        '  abaaabaaabba  ',
        '  abqabbaqaba   ',
        '   aqqaaqabba   ',
        '   aaaqqaqaaa   ',
        '   aaqqaaaqaa   ',
        '   a4aa444aqa   ',
        '   aa  44  4a   ',
        '   aa  44  4a   ',
        '   aa4    4aa   ',
        '   aaa4444aaa   ',
        '    aaaaaaaa    ',
        '     aaaaaa     '],
				[
        '  a     a       ',
        ' a5a a a5a      ',
        ' abaa5aa5a      ',
        ' abbabaab5aaa   ',
        '  abaababbarqa  ',
        '   aqraqabbq4a  ',
        '  aqrrrqaqaa4a  ',
        '   aaqqaqaaa4a  ',
        '   aaaaaaaa44a  ',
        '   a4aa444a44a  ',
        '   a 44  4a44a  ',
        '   a 44  4a4aa  ',
        '   a    44aaaa  ',
        '   a4444aaaaa   ',
        '   aaaaaaaaa    ',
        '    aaaaaaa     '],
				[
        '       a     a  ',
        '      a5a a a5a ',
        '      a5aa5aaba ',
        '   aaa5baababba ',
        '  aqrabbabaaba  ',
        '  a4qbbaqarqa   ',
        '  a4aaqaqrrrqa  ',
        '  a4aaaqaqqaa   ',
        '  a44aaaaaaaa   ',
        '  a44a444aa4a   ',
        '  a44a4  44 a   ',
        '  aa4a4  44 a   ',
        '  aaaa44    a   ',
        '   aaaaa4444a   ',
        '    aaaaaaaaa   ',
        '     aaaaaaa    ']
			);
			
			var shortBrownHair = ShortHair('O', 'P', 'Q');
			var shortBlackHair = ShortHair('a', '4', 'b');
			var shortBlondHair = ShortHair('m', 'n', 'o');
			var shortSandyHair = ShortHair('R', 'T', 'V');
			var shortRedHair = ShortHair('e', 'f', 'g');
			var shortDarkBlueHair = ShortHair('y', 'z', 'A');
			var shortLightBlueHair = ShortHair('D', 'E', 'F');
			var shortPurpleHair = ShortHair('G', 'H', 'I');
			var shortPinkHair = ShortHair('L', 'M', 'N');
			var shortOrangeHair = ShortHair('i', 'j', 'k');
			var shortDarkGreenHair = ShortHair('q', 'r', 's');
			var shortLightGreenHair = ShortHair('v', 'w', 'x');
			var shortGrayHair = ShortHair('6', 'd', '7');

			var longBrownHair = LongHair('O', 'P', 'Q');
			var longBlackHair = LongHair('a', '4', 'b');
			var longBlondHair = LongHair('m', 'n', 'o');
			var longSandyHair = LongHair('R', 'T', 'V');
			var longRedHair = LongHair('e', 'f', 'g');
			var longDarkBlueHair = LongHair('y', 'z', 'A');
			var longLightBlueHair = LongHair('D', 'E', 'F');
			var longPurpleHair = LongHair('G', 'H', 'I');
			var longPinkHair = LongHair('L', 'M', 'N');
			var longOrangeHair = LongHair('i', 'j', 'k');
			var longDarkGreenHair = LongHair('q', 'r', 's');
			var longLightGreenHair = LongHair('v', 'w', 'x');
			var longGrayHair = LongHair('6', 'd', '7');

			var spikedBrownHair = SpikedHair('O', 'P', 'Q');
			var spikedBlackHair = SpikedHair('a', '4', 'b');
			var spikedBlondHair = SpikedHair('m', 'n', 'o');
			var spikedSandyHair = SpikedHair('R', 'T', 'V');
			var spikedRedHair = SpikedHair('e', 'f', 'g');
			var spikedDarkBlueHair = SpikedHair('y', 'z', 'A');
			var spikedLightBlueHair = SpikedHair('D', 'E', 'F');
			var spikedPurpleHair = SpikedHair('G', 'H', 'I');
			var spikedPinkHair = SpikedHair('L', 'M', 'N');
			var spikedOrangeHair = SpikedHair('i', 'j', 'k');
			var spikedDarkGreenHair = SpikedHair('q', 'r', 's');
			var spikedLightGreenHair = SpikedHair('v', 'w', 'x');
			var spikedGrayHair = SpikedHair('6', 'd', '7');

			var hair = [
				['short brown hair', 'short black hair', 'short blond hair', 'short sandy hair', 'short red hair', 'short dark blue hair', 'short light blue hair', 'short purple hair', 'short pink hair', 'short orange hair', 'short dark green hair', 'short light green hair', 'short gray hair'],
				['long brown hair', 'long black hair', 'long blond hair', 'long sandy hair', 'long red hair', 'long dark blue hair', 'long light blue hair', 'long purple hair', 'long pink hair', 'long orange hair', 'long dark green hair', 'long light green hair', 'long gray hair'],
				['spiked brown hair', 'spiked black hair', 'spiked blond hair', 'spiked sandy hair', 'spiked red hair', 'spiked dark blue hair', 'spiked light blue hair', 'spiked purple hair', 'spiked pink hair', 'spiked orange hair', 'spiked dark green hair', 'spiked light green hair', 'spiked gray hair'],
				['nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing', 'nothing']
			];
			var hairLength = 0;
			var hairColor = 0;
			var selectedHair = hair[hairLength][hairColor];
		}
		// item tiles
		{
			var brownPants = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaQQQQQQaaa  ',
        '  aaaQQPQPQaaa  ',
        '  aaaQPOPQOaaa  ',
        '  aaaQOaPQOaaa  ',
        '  aaaQOaQQOaaa  ',
        '  aaaPOaQPOaaa  ',
        '  aaaPOaPPOaaa  ',
        '  aaaOOaOaOaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var bucketOfMilk = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaddddaaaa  ',
        '  aaad6666daaa  ',
        '  aaad1111daaa  ',
        '  aad5dd7d6aaa  ',
        '  aad557d55aaa  ',
        '  aaadd5555aaa  ',
        '  aaaa5555aaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var tanShoes = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaVVaaVVaaa  ',
        '  aaRRUaaURRaa  ',
        '  aaRQUaaUQRaa  ',
        '  aaTUVaaVUTaa  ',
        '  aaVVaaaaVVaa  ',
        '  aaaVaaaaVaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var rogerShirt = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaqqaaqqaaa  ',
        '  aanrqqqqrnaa  ',
        '  aannrrrrmnaa  ',
        '  aanmnnnnmnaa  ',
        '  aanmnoonmnaa  ',
        '  aaaaooooaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var brownPack = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaRRaa  ',
				'  aaaRRRRaaRQa  ',
				'  aaRRRRQTVQQa  ',
				'  aRRQQQQUTPPa  ',
				'  aRQQQPQTVOOa  ',
				'  aQQQQPQPUaOa  ',
				'  aPPQPPPPOaOa  ',
				'  aaOPPPOOOaaa  ',
				'  aaaOOOOOaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var blueJeans = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaayzzzzzaaa  ',
				'  aaaBBBBzBaaa  ',
				'  aaaAAAAzAaaa  ',
				'  aaaAAaAAzaaa  ',
				'  aaaBAaBAAaaa  ',
				'  aaaBBaBBAaaa  ',
				'  aaaAAaAAAaaa  ',
				'  aaazzazzzaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var yellowShirt = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaapmnnmpaaa  ',
				'  aapppmmpppaa  ',
				'  aappppppppaa  ',
				'  aapopppoppaa  ',
				'  aapnpppnppaa  ',
				'  aapnoppnppaa  ',
				'  aammnoomnoaa  ',
				'  aaaamnnoaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var blueShirt = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaByzzyBaaa  ',
				'  aaBBByyBBBaa  ',
				'  aaBBBBBBBBaa  ',
				'  aaBABBBABBaa  ',
				'  aaBzBBBzBBaa  ',
				'  aaBzABBzBBaa  ',
				'  aayyzAAyAAaa  ',
				'  aaaayzzAaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var redShirt = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaheffehaaa  ',
				'  aahhheehhhaa  ',
				'  aahhhhhhhhaa  ',
				'  aahghhhghhaa  ',
				'  aahfhhhfhhaa  ',
				'  aahfghhfhhaa  ',
				'  aaeefggeggaa  ',
				'  aaaaeffgaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var greenCrocs = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaqttattaa  ',
				'  aaatsratsqaa  ',
				'  aasrqraqsraa  ',
				'  aaqrratsrqaa  ',
				'  aaaaaarqraaa  ',
				'  aaaaaarraaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var chippedCutlass = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  a1aaaaaaaaaa  ',
				'  ad1aaaaaaaaa  ',
				'  acddaaaaaaaa  ',
				'  aacadaaaaaaa  ',
				'  aaaad1aaaaaa  ',
				'  aaaaad1oonaa  ',
				'  aaaaaaanbama  ',
				'  aaaaaaaammaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var smokedHam = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaRQORgaaa  ',
				'  aaRROPOghgaa  ',
				'  aROQOOOhhhaa  ',
				'  aaOOPOOghgaa  ',
				'  aaaOOOOfgfaa  ',
				'  aaaaaOOOfaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var glowingRune = Pixel([
				'                ',
				'                ',
				'   aaBaaaaBaa   ',
				'  aaBFBaaBFBaa  ',
				'  aBF1FBBF1FBa  ',
				'  aaB11FF1FBaB  ',
				'  aBF1F11FBaaa  ',
				'  aBF1FFFF1BBa  ',
				'  aaB11FF1FBaa  ',
				'  aaB1F11FBaaa  ',
				'  aaB1FFBDaaaD  ',
				'  aBF1FBaaBaaa  ',
				'  aaBFBaBaaaaa  ',
				'   aaBaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var scissors = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaa1aaaa1aaa  ',
				'  aaa1aaaa1aaa  ',
				'  aaad1aa1daaa  ',
				'  aaad1aa1daaa  ',
				'  aaaad11daaaa  ',
				'  aaaaaddaaaaa  ',
				'  aaaakklkaaaa  ',
				'  aaajaijaiaaa  ',
				'  aaajiaaijaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var reindeerAntlers = Pixel([
					'                ',
					'                ',
					'   aaaaaaaaaa   ',
					'  aaaPaaaaPaaa  ',
					'  aaPaaaaaaPaa  ',
					'  aaOaPaaPaOaa  ',
					'  aaOPOaaOPOaa  ',
					'  aaaOaaaaOaaa  ',
					'  aaaarffraaaa  ',
					'  aaarqeeqraaa  ',
					'  aaafaaaafaaa  ',
					'  aaaeaaaaeaaa  ',
					'  aaaaraaraaaa  ',
					'   aaaaaaaaaa   ',
					'                ',
					'                '], colors, 2);
			var steelBreastplate = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaddaaddaaa  ',
				'  aad11dd11daa  ',
				'  aad111111daa  ',
				'  aaac1111caaa  ',
				'  aaaaddddaaaa  ',
				'  aaaac11caaaa  ',
				'  aaaaaddaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var steelBoots = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaddaaddaaa  ',
				'  aaaddaaddaaa  ',
				'  aaacdaadcaaa  ',
				'  aaddcaacddaa  ',
				'  adcdbaabdcda  ',
				'  addcbaabcdda  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var steelHelmet = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaddaaaaa  ',
				'  aaaad11daaaa  ',
				'  aaadd11ddaaa  ',
				'  aaacddddcaaa  ',
				'  aaaccddccaaa  ',
				'  aaabcaacbaaa  ',
				'  aaabcaacbaaa  ',
				'  aaaacaacaaaa  ',
				'  aaaabaabaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var steelLeggings = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaddddddaaa  ',
				'  aaa1dddddaaa  ',
				'  aaa1cc11daaa  ',
				'  aaadcac1daaa  ',
				'  aaadcac1daaa  ',
				'  aaadcac1caaa  ',
				'  aaadcac1caaa  ',
				'  aaacbaccbaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var stuffedWinston = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaooooaaaa  ',
				'  aaaoppppoaaa  ',
				'  aaoooppppoaa  ',
				'  aanooappaoaa  ',
				'  aannonppnoaa  ',
				'  aannooefpoaa  ',
				'  aaannoeeoaaa  ',
				'  aaaannnnaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var greenShirt = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaatqrrqtaaa  ',
				'  aatttqqtttaa  ',
				'  aattttttttaa  ',
				'  aatstttsttaa  ',
				'  aatrtttrttaa  ',
				'  aatrsttrttaa  ',
				'  aaqqrssqrsaa  ',
				'  aaaaqrrsaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var backpack = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaBaBBBBaBaa  ',
				'  aBaBAAAABaBa  ',
				'  aAaBAyyABaAa  ',
				'  azaAyzzyAaza  ',
				'  azaAyzzyAaza  ',
				'  aazzyzzyzzaa  ',
				'  aaayzyyzyaaa  ',
				'  aaaayyyyaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var waterBottle = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaBBaaaaa  ',
				'  aaaaa11aaaaa  ',
				'  aaaa1111aaaa  ',
				'  aaaa1111aaaa  ',
				'  aaaacdccaaaa  ',
				'  aaaaddddaaaa  ',
				'  aaaacdccaaaa  ',
				'  aaaaddddaaaa  ',
				'  aaaaccccaaaa  ',
				'  aaaabcbbaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var redSneakers = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaagg1ba1aa  ',
				'  aaag1fgee1aa  ',
				'  aa1eeeeee1aa  ',
				'  aabddddddbaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var purplePebble = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaHKJHaaaa  ',
				'  aaaHKJJIGaaa  ',
				'  aaaIKJIHGaaa  ',
				'  aaaaKJHGGaaa  ',
				'  aaaaaJGGaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var sharpFang = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaeeaaaaaa  ',
				'  aaaeffeaaaaa  ',
				'  aaaed1faaaaa  ',
				'  aaaad11aaaaa  ',
				'  aaaaad1aaaaa  ',
				'  aaaaad1aaaaa  ',
				'  aaaaaad1aaaa  ',
				'  aaaaaaadaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var lesserRing = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaannnnnnaaa  ',
				'  aanmmmmmmnaa  ',
				'  aanabbbbanaa  ',
				'  aapnaaaanpaa  ',
				'  aappppppppaa  ',
				'  aaappppppaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var stagnantWater = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaRQQRaaaa  ',
				'  aaaROOOORaaa  ',
				'  aaaQDFFDQaaa  ',
				'  aaaPRQQRPaaa  ',
				'  aaaPPQPQPaaa  ',
				'  aaaOPQPPOaaa  ',
				'  aaaOPQPPOaaa  ',
				'  aaaaOPPOaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var gloomBlade = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaQOaaaa  ',
				'  aaaaaQPOaaaa  ',
				'  aaaooPOaaaaa  ',
				'  aaaaonaaaaaa  ',
				'  aaaJHanaaaaa  ',
				'  aaaJHaaaaaaa  ',
				'  aaaJIaaaaaaa  ',
				'  aaaJIaaaaaaa  ',
				'  aaaaJIaaaaaa  ',
				'  aaaaaJIaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var blackShirt = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaccaaccaaa  ',
				'  aabbbccbbbaa  ',
				'  aabbbbbbbbaa  ',
				'  aabaabbaabaa  ',
				'  aabaaaaaabaa  ',
				'  aababaababaa  ',
				'  aaabbaabbaaa  ',
				'  aaaabbbbaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var blackPants = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaabbbbaaaa  ',
				'  aaabaaaabaaa  ',
				'  aaabaaaabaaa  ',
				'  aaababaabaaa  ',
				'  aaababaabaaa  ',
				'  aaababaabaaa  ',
				'  aaaabbbbaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var blackBoots = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaabcccaaaa  ',
				'  aaaabaacaaaa  ',
				'  aaaaacabaaaa  ',
				'  aaaaacabaaaa  ',
				'  aaaccaabaaaa  ',
				'  aacaaaabaaaa  ',
				'  aabbbbbbaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var blackGloves = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaabccaaaaa  ',
				'  aaaabbbcaaaa  ',
				'  aaaaabbcaaaa  ',
				'  aaaaabbbcaaa  ',
				'  aaaabbbbcaaa  ',
				'  aaaababbcaaa  ',
				'  aaaabababaaa  ',
				'  aaaaaababaaa  ',
				'  aaaaababaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var coconut = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaPQQQQaaaa  ',
				'  aaP11111Qaaa  ',
				'  aaOQddd11Qaa  ',
				'  aaOPQQQQQOaa  ',
				'  aaaOPPPOOaaa  ',
				'  aaaaOOOOaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var strandOfCreeper = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaraaa  ',
				'  aaasraarqaaa  ',
				'  aaaararqaaaa  ',
				'  aaaaaqaaaaaa  ',
				'  aaaaraaaaraa  ',
				'  aaasraaaaara  ',
				'  aasarqaaaaqa  ',
				'  aaraaraarqaa  ',
				'  aaaraarqaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var theHolyHandGrenade = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaoaaaaaa  ',
				'  aaaao1oaaaaa  ',
				'  aaaaaoaaaaaa  ',
				'  aaaao1paaaaa  ',
				'  aaaopoo1aaaa  ',
				'  aao1oonnpaaa  ',
				'  aanpnnnn1aaa  ',
				'  aan1nnmmnaaa  ',
				'  aaaommmnaaaa  ',
				'  aaaammnaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var mailCoif = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaa1b1baaaa  ',
				'  aaadbdbdbaaa  ',
				'  aaabdaabdaaa  ',
				'  aaacaaaabaaa  ',
				'  aaabaaaacaaa  ',
				'  aaaabaacaaaa  ',
				'  aaaacbcbaaaa  ',
				'  aaacbcbcbaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var bookOfArmaments = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaQRQQRQaaa  ',
				'  aaO11111aaaa  ',
				'  aaORRRRRRaaa  ',
				'  aaOQQQRQQaaa  ',
				'  aaOQPQQPQaaa  ',
				'  aaOPPPQPPaaa  ',
				'  aaOPPPPPPaaa  ',
				'  aaOPPPPPPaaa  ',
				'  aaaPPPPPPaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var tuftOfRabbitFur = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaa1aaaaa  ',
        '  aaaaa17aa1aa  ',
        '  aaaa117d17aa  ',
        '  aaaa17dd17aa  ',
        '  aaa11711ddaa  ',
        '  aaa77dd17daa  ',
        '  aaadd177ddaa  ',
        '  aaadd1dddaaa  ',
        '  aaaa7d7daaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var verySmallRocks = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaacaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaa5aba6aaa  ',
        '  aaaaaaaaaaaa  ',
        '  a5aba6abacaa  ',
        '  aacaaaaaaaaa  ',
        '  aaaaa6aa6aba  ',
        '  aaabaaaaaaaa  ',
        '  aaaaba5aacaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var carrot = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaastaaa  ',
				'  aaaaarsastaa  ',
				'  aaaaraarqara  ',
				'  aaaaaaljsasa  ',
				'  aaaaakjiaara  ',
				'  aaaakjiaaaaa  ',
				'  aaakjiaaaaaa  ',
				'  aakjaaaaaaaa  ',
				'  akaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var silverNecklace = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaadbaaaaaa  ',
				'  aaabaadaaaaa  ',
				'  aadaaaabaaaa  ',
				'  aabaaaaadaaa  ',
				'  aaadaaaabaaa  ',
				'  aaaabaaadaaa  ',
				'  aaaaadbbaaaa  ',
				'  aaaaaaadaaaa  ',
				'  aaaaaadedaaa  ',
				'  aaaaaaadaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var easterEgg = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaJJaaaaa  ',
				'  aaaaJJNNaaaa  ',
				'  aaaaINNIaaaa  ',
				'  aaaIMMIINaaa  ',
				'  aaaLMIINMaaa  ',
				'  aaaLHHMMHaaa  ',
				'  aaaGGLLGGaaa  ',
				'  aaaaKKGGaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var chalice = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaappppaaaa  ',
				'  aaapnnnnpaaa  ',
				'  aaapnmmnpaaa  ',
				'  aaaoppppoaaa  ',
				'  aaaooooooaaa  ',
				'  aaaaooooaaaa  ',
				'  aaaamnnmaaaa  ',
				'  aaamonnomaaa  ',
				'  aaamoooomaaa  ',
				'  aaaammmmaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var crudeIdol = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaddddaaaa  ',
				'  aaaddddddaaa  ',
				'  aacdcddcdcaa  ',
				'  aacaaccaacaa  ',
				'  aaabbaabbaaa  ',
				'  aaaabbbbaaaa  ',
				'  aaaaabbaaaaa  ',
				'  aaaaccccaaaa  ',
				'  aaacbccbcaaa  ',
				'  aaaabbbbaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var shadowFragment = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaJJJaaaaaaa  ',
				'  aaaIIKKaaaaa  ',
				'  aaaIK11KJJaa  ',
				'  aaaaHK11Kaaa  ',
				'  aaaaGIKKGaaa  ',
				'  aaaaaHIIaaaa  ',
				'  aaaaaHHGaaaa  ',
				'  aaaaaaHGaaaa  ',
				'  aaaaaaGaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var shadowPlate = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaaaaaaaaaa  ',
				'  aaaGJIIJGaaa  ',
				'  aaaIGJJGIaaa  ',
				'  aaaIaGGaIaaa  ',
				'  aaaIIaaIIaaa  ',
				'  aaaGIaaIGaaa  ',
				'  aaaHaaaaHaaa  ',
				'  aaaHHaaHHaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var skullItem = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaaaaaaaa  ',
				'  aaaa1111aaaa  ',
				'  aaa111111aaa  ',
				'  aaad1111daaa  ',
				'  aaadad1adaaa  ',
				'  aaadbcdbdaaa  ',
				'  aaaaccccaaaa  ',
				'  aaaaaabaaaaa  ',
				'  aaaaa1daaaaa  ',
				'  aaaaaaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var snappedFemur = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaa11aaaaaaa  ',
				'  aadd1aaaaaaa  ',
				'  aaccd1aaaaaa  ',
				'  aaaacd1aaaaa  ',
				'  aaaaacdaaaaa  ',
				'  aaaaaaadaaaa  ',
				'  aaaaaaadaaaa  ',
				'  aaaaaad1aaaa  ',
				'  aaaaadd11aaa  ',
				'  aaaaadca1aaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '], colors, 2);
			var tatteredRags = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaa77aaaaaaa  ',
        '  aaadd6aaaaaa  ',
        '  aaa7daaaaaaa  ',
        '  aaa76dc7aaaa  ',
        '  aa7ddca77aaa  ',
        '  aadad7adcdaa  ',
        '  aadaa67daaaa  ',
        '  aadca7daaaaa  ',
        '  aa6a6daa7aaa  ',
        '  aaaaa6aaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var sparkOfDarkness = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaNNNaaa  ',
        '  aaaaaNMNaaaa  ',
        '  aaaaNMMNaaaa  ',
        '  aaaNMKKMNaaa  ',
        '  aaaNKJJJNaaa  ',
        '  aaaNKJJINaaa  ',
        '  aaaNMIIMNaaa  ',
        '  aaaaNNNNaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var leatheryWing = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaGGGGaaaa  ',
        '  aaaGHHHGGGaa  ',
        '  aaGHHJJHIaaa  ',
        '  aaGIJHIIJaaa  ',
        '  aaGIJHIaaaaa  ',
        '  aaGJIHJaaaaa  ',
        '  aaGJIaaaaaaa  ',
        '  aaaGIaaaaaaa  ',
        '  aaaGaaaaaaaa  ',
        '  aaaGaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var staringEye = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaa771aaaaa  ',
        '  aaa7aa71aaaa  ',
        '  aaa177g1aaaa  ',
        '  aaa1g11faaaa  ',
        '  aaaef1feaaaa  ',
        '  aaaaefeaaaaa  ',
        '  aaaaeeaeaaaa  ',
        '  aaaaaeaaaaaa  ',
        '  aaaaaaeaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var strangeMushroom = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaxwwwxaaaa  ',
        '  aavtuuvvvaaa  ',
        '  aatttttttaaa  ',
        '  aaaa2Z2aaaaa  ',
        '  aaaaaZZ1aaaa  ',
        '  aaa1Z1123aaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var crackedWoodenShield = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaSSaaaaaa  ',
        '  aaaSPSRPOaaa  ',
        '  aaaSPSRPOaaa  ',
        '  aaaSPRQPOaaa  ',
        '  aaaPPPPQOaaa  ',
        '  aaaQPQPOaaaa  ',
        '  aaaPPQPOaaaa  ',
        '  aaaOPOOaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var smallSack = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaSSSaaaaa  ',
        '  aaaSRRQUaaaa  ',
        '  aaSRaVUQQaaa  ',
        '  aaaaaUQPRaaa  ',
        '  aaaaSVQRRQaa  ',
        '  aaaSRUQSRQaa  ',
        '  aaaSRVQRQPaa  ',
        '  aaaSSQQQPPaa  ',
        '  aaaaQQPPPaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var theLordOfTheRings = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaPPPPPPPaa  ',
        '  aaOPPPooPPaa  ',
        '  aaOPPoPPoPaa  ',
        '  aaOPPmoomPaa  ',
        '  aaOPPPmmPPaa  ',
        '  aaOPPPPPPPaa  ',
        '  aaOPQQQQQQaa  ',
        '  aaOO111114aa  ',
        '  aaOO111114aa  ',
        '  aaaOQQQQQQaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var rawBatMeat = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaahhaaaa  ',
        '  aaaaah1hhaaa  ',
        '  aaaafh11haaa  ',
        '  aaaafghhgaaa  ',
        '  aaaaffggeaaa  ',
        '  aaaaeffeeaaa  ',
        '  aaaaeeeeaaaa  ',
        '  aaaaaeeaaaaa  ',
        '  aaaaaaeaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var orangeCrystal = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaakllaaaaa  ',
        '  aaal11llaaaa  ',
        '  aaal111lkaaa  ',
        '  aal11klkiaaa  ',
        '  aalkijkjiaaa  ',
        '  aakkaikiaaaa  ',
        '  aajiajjaaaaa  ',
        '  aaajaajaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var blueFeather = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaazyaaa  ',
        '  aaaaaaAyzaaa  ',
        '  aaaaazyAaaaa  ',
        '  aaaaaAyzaaaa  ',
        '  aaaazyAaaaaa  ',
        '  aaaaAyzaaaaa  ',
        '  aaaazyAaaaaa  ',
        '  aaaayzaaaaaa  ',
        '  aaaayaaaaaaa  ',
        '  aaaayaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var feather = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaa7daaa  ',
        '  aaaaaa1d7aaa  ',
        '  aaaaa7d1aaaa  ',
        '  aaaaa1d7aaaa  ',
        '  aaaa7d1aaaaa  ',
        '  aaaa1d7aaaaa  ',
        '  aaaa7d1aaaaa  ',
        '  aaaad7aaaaaa  ',
        '  aaaadaaaaaaa  ',
        '  aaaadaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var paperAirplane = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaa1aaaa  ',
        '  aaaaaa11aaaa  ',
        '  aaaaa177111a  ',
        '  aaaa7711111a  ',
        '  aaa711111daa  ',
        '  aa111ddd77aa  ',
        '  a11dd7777aaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var blessingOfTheFalcon = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaa7777aaa  ',
        '  aaaa7pppp7aa  ',
        '  aaa7p4opn6aa  ',
        '  aaa6pa4p6aaa  ',
        '  aa6lnpan6aaa  ',
        '  aa6flnn6aaaa  ',
        '  aa6f666aaaaa  ',
        '  aaa6aaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var swallowEgg = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaa11aaaaa  ',
        '  aaaa1Q11aaaa  ',
        '  aaaa11Q1aaaa  ',
        '  aaa1Q1121aaa  ',
        '  aaa12ZZQ1aaa  ',
        '  aaaQZZ2Z1aaa  ',
        '  aaaZOZQZZaaa  ',
        '  aaaaZZZZaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var dagger = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aa1aaaaaaaaa  ',
        '  aa71aaaaaaaa  ',
        '  aaa71aaaaaaa  ',
        '  aaa71aaaaaaa  ',
        '  aaaa71aQaaaa  ',
        '  aaaaa7Paaaaa  ',
        '  aaaaaaOPaaaa  ',
        '  aaaaaOaOPaaa  ',
        '  aaaaaaaaOPaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var redMask = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaafggfaaaa  ',
        '  aaafggggfaaa  ',
        '  aaefffffffaa  ',
        '  aaee4444efaa  ',
        '  aaeaaaaaaeaa  ',
        '  aaefeeffeeaa  ',
        '  aafeffeeeeaa  ',
        '  aaafeeeeeaaa  ',
        '  aaaaaeeaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var waterSkin = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaa3aaaaaaa  ',
        '  aaaijiaaaaaa  ',
        '  aaaPiPQQaaaa  ',
        '  aaaPPQRRQaaa  ',
        '  aaaOPPQQPPaa  ',
        '  aaaaOPPPOOaa  ',
        '  aaaaaOOOOaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var buckler = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaa6666aaaa  ',
        '  aaa6QQQQ6aaa  ',
        '  aaa6PQPQ6aaa  ',
        '  aaacOQPOcaaa  ',
        '  aaacOOOOcaaa  ',
        '  aaaaccccaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var flySwatter = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaeaaaaaaaa  ',
        '  aaefeaaaaaaa  ',
        '  aefefeaaaaaa  ',
        '  aaefebaaaaaa  ',
        '  aaaebcaaaaaa  ',
        '  aaaaaacaaaaa  ',
        '  aaaaaaa6aaaa  ',
        '  aaaaaaaa6aaa  ',
        '  aaaaaaaaa6aa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var broadSword = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  a77aaaaaaaaa  ',
        '  a6d7aaaaaaaa  ',
        '  aa6d7aaaaaaa  ',
        '  aaa6d7aaaaaa  ',
        '  aaaa6d7aaaaa  ',
        '  aaaaa6d7aoaa  ',
        '  aaaaaa6doaaa  ',
        '  aaaaaaammOaa  ',
        '  aaaaaamaOQOa  ',
        '  aaaaaaaaaOQa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var orangeWaistCoat = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaallaallaaa  ',
        '  aaalllikjaaa  ',
        '  aaakkijjjaaa  ',
        '  aaaikijiiaaa  ',
        '  aaajjijjjaaa  ',
        '  aaaajijjaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var shrubbery = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaassssaaaa  ',
        '  aaarrssrsaaa  ',
        '  aarsqrsqrsaa  ',
        '  aaqssqqsrqaa  ',
        '  aaqqrrqqrqaa  ',
        '  aaaqqqqqqaaa  ',
        '  aaakkjjkjaaa  ',
        '  aaaaiiiiaaaa  ',
        '  aaaajjiiaaaa  ',
        '  aaaajjjjaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var oakStaff = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaSaa  ',
        '  aaaaaaaTaQaa  ',
        '  aaaaaaaSSQaa  ',
        '  aaaaaSaTQaaa  ',
        '  aaaaaaTQaaaa  ',
        '  aaaaaTRaaaaa  ',
        '  aaaaTQSSaaaa  ',
        '  aaaaSaaaaaaa  ',
        '  aaaTQaaaaaaa  ',
        '  aaRRaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var niHelmet = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaa5aa5aa  ',
        '  aa5aa5aa5aaa  ',
        '  aaa5aba4baaa  ',
        '  aaabqbqbqaaa  ',
        '  aaa4bq4q4aaa  ',
        '  aaa44a4a4aaa  ',
        '  aaa4baaa4aaa  ',
        '  aaa44bbb4aaa  ',
        '  aaaa4444aaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var ni = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaa1aa1aa  ',
        '  aaa1aonao1aa  ',
        '  aaaoonnoooaa  ',
        '  aaojonjojooa  ',
        '  a1njjojnjnoa  ',
        '  aoninjjmjmoa  ',
        '  aaninmininaa  ',
        '  aaanoononoaa  ',
        '  aaooaooaa1aa  ',
        '  aaaaa1aaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var potato = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaVSSaaa  ',
        '  aaaaaVUUTRaa  ',
        '  aaaVVUTSURaa  ',
        '  aaVUTUUURRaa  ',
        '  aaVUSURRRaaa  ',
        '  aaRRURRRaaaa  ',
        '  aaaRRRaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var massiveEye = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaanopoaaaa  ',
        '  aaanopjppaaa  ',
        '  aaanopjpnaaa  ',
        '  aaamopipnaaa  ',
        '  aaamnoponaaa  ',
        '  aaaammnnaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var tentacle = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaKLLaa  ',
        '  aaaaaaKLNNLa  ',
        '  aaaaaaKNaaNa  ',
        '  aaaaaKLNaaaa  ',
        '  aaaaKLNaaaaa  ',
        '  aaaaJLNaaaaa  ',
        '  aaaKLNaaaaaa  ',
        '  aaaJLNaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var blueCrystal = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaFaaaaaa  ',
        '  aaaaaDFaaaaa  ',
        '  aaaaBD1aaaaa  ',
        '  aaaaBB1Faaaa  ',
        '  aaaazBD1aaaa  ',
        '  aaaaazB1Faaa  ',
        '  aaaaazBB1aaa  ',
        '  aaaaaazBDaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var shadowForgedAxe = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaa5aaPaaaa  ',
        '  aaa5bbaPaaaa  ',
        '  aaa5bb44aaaa  ',
        '  aaa5b4aPaaaa  ',
        '  aaaabaaPaaaa  ',
        '  aaaaaaaOaaaa  ',
        '  aaaaaaaPaaaa  ',
        '  aaaaaaaPaaaa  ',
        '  aaaaaaaPaaaa  ',
        '  aaaaaaaOaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var dampScroll = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaa2222222aa  ',
        '  aaa2333333aa  ',
        '  aaa222ZZZaaa  ',
        '  aaaZRRRRZaaa  ',
        '  aaaZZ22ZZaaa  ',
        '  aaaZRR2RZaaa  ',
        '  aa3ZZ2222aaa  ',
        '  aa3222222aaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var crystallineLeggings = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaCCCCCCaaa  ',
        '  aaaBCBBCBaaa  ',
        '  aaazByyBzaaa  ',
        '  aaaBzyyzBaaa  ',
        '  aaaBAzzABaaa  ',
        '  aaaCByyBCaaa  ',
        '  aaaCBzzBCaaa  ',
        '  aaaCCaaCCaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var sapphireRing = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaABaaaaa  ',
        '  aaaayzAyaaaa  ',
        '  aaaaoyyoaaaa  ',
        '  aaaaammaaaaa  ',
        '  aaanmaamnaaa  ',
        '  aaonaaaanoaa  ',
        '  aaonaaaanoaa  ',
        '  aaamnaanmaaa  ',
        '  aaammnnmmaaa  ',
        '  aaaaammaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var crystalShardNecklace = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaampmpaaaa  ',
        '  aaapaaaamaaa  ',
        '  aaamaaaapaaa  ',
        '  aaapaaaamaaa  ',
        '  aaamaaaapaaa  ',
        '  aaaapaamaaaa  ',
        '  aaaamaapaaaa  ',
        '  aaaaaIJaaaaa  ',
        '  aaaaaHIaaaaa  ',
        '  aaaaaGaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var acidicIchor = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaxxxaaa  ',
        '  aaaaax11xuaa  ',
        '  aaaaxx11xvaa  ',
        '  aaaaxxxxvaaa  ',
        '  aaaxx1xwuaaa  ',
        '  aaaxxxwvaaaa  ',
        '  aaax1waaaaaa  ',
        '  aaax1uaaaaaa  ',
        '  aaaxwaaaaaaa  ',
        '  aaaavaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var scorpionStinger = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaasaqsaaa  ',
        '  aaaaqsssrraa  ',
        '  aaaasrqqrqaa  ',
        '  aaaaaq11qaaa  ',
        '  aaaaaa117aaa  ',
        '  aaaaa117aaaa  ',
        '  aaaa117aaaaa  ',
        '  aa117aaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var scorpionLeg = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaappmaaaa  ',
        '  aaaapmipnnaa  ',
        '  aaaapiaaiima  ',
        '  aaaaaoaaaaaa  ',
        '  aaaaaoiaaaaa  ',
        '  aaaaaniaaaaa  ',
        '  aaaaapiaaaaa  ',
        '  a11apmaaaaaa  ',
        '  aaaniaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var toughClaw = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaalaaaaaa  ',
        '  aaaaajlaaaaa  ',
        '  aaaaalklaaaa  ',
        '  aaalaljkaaaa  ',
        '  aaajakljaaaa  ',
        '  aaaikjjiaaaa  ',
        '  aaaakjiaaaaa  ',
        '  aaaajjiaaaaa  ',
        '  aaaajiaaaaaa  ',
        '  aaaiiaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var dropOfVenom = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaxaaaaaa  ',
        '  aaaaa1aaaaaa  ',
        '  aaaaxxvaaaaa  ',
        '  aaaa1vvvaaaa  ',
        '  aaax1xvuaaaa  ',
        '  aaavuxvuaaaa  ',
        '  aaavvuvuaaaa  ',
        '  aaaauuuaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var bloodSandGloves = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaajjjaaaaa  ',
        '  aaajikkjaaaa  ',
        '  aaajkijlaaaa  ',
        '  aaaajkjlaaaa  ',
        '  aaaaijkkaaaa  ',
        '  aaajiijikaaa  ',
        '  aaajaijikaaa  ',
        '  aaaiaijikaaa  ',
        '  aaaaijikaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var pottedCactus = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaarsaaaaa  ',
        '  aaaasraraaaa  ',
        '  aaaasqsqaaaa  ',
        '  aaaaaqrqaaaa  ',
        '  aaaarqaqaaaa  ',
        '  aaaaaqraaaaa  ',
        '  aaakkkkkkaaa  ',
        '  aaaaiiiiaaaa  ',
        '  aaaaijjiaaaa  ',
        '  aaaajjjjaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var jarOfSand = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaQQQQaaaa  ',
        '  aa77PPPP77aa  ',
        '  aaa755557aaa  ',
        '  aaa72Z2Z7aaa  ',
        '  aaa732327aaa  ',
        '  aaa7Z32Z7aaa  ',
        '  aaa777777aaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var funeralWrap = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaa11aa11aaa  ',
        '  aa71711177aa  ',
        '  aa1d7777d1aa  ',
        '  aa7d1171d1aa  ',
        '  aa1d7711d7aa  ',
        '  aa1d1177d1aa  ',
        '  aaaa1711aaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var goldenAnkh = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaappaaaaaaa  ',
        '  aaonmpaaaaaa  ',
        '  aonaampaaaaa  ',
        '  aonaanoaaaaa  ',
        '  aamnnmnapaaa  ',
        '  aaammmopaaaa  ',
        '  aaaaaamonaaa  ',
        '  aaaaamamonaa  ',
        '  aaaaaaaamoaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var cowboyShirt = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaQQaaQQaaa  ',
        '  aaQPP11PPQaa  ',
        '  aaPOPPOPOPaa  ',
        '  aaOOPOOPOOaa  ',
        '  aaaaOPOOaaaa  ',
        '  aaaaaOOaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var cowboyPants = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaQQQQQQaaa  ',
        '  aaaQPPQQQaaa  ',
        '  aaaQPOPQPaaa  ',
        '  aaaQPOOPPaaa  ',
        '  aaaQPOOPPaaa  ',
        '  aaaOOOOOOaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var cowboyHat = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaQQaaaaa  ',
        '  aaPaPPQPaPaa  ',
        '  aOOPOPPOPOOa  ',
        '  aaOOPOOPOOaa  ',
        '  aaaOOOOOOaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
			var capOfDarkness = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
		}
		// npc images
		{
			var shadowImp = Pixel([
        '                ',
        '        a       ',
        '       aHa      ',
        '      aHa       ',
        '      aHa       ',
        '     aHKHa      ',
        '     aHKHa      ',
        '    aGKKHa      ',
        '    aHKJKHa     ',
        '   aHKlKKHa     ',
        '   aHlIJlKHa    ',
        '   aGjJIjKHa    ',
        '   aGKJIIKHa    ',
        '    aGJJJGa     ',
        '     aGGGa  a   ',
        ' aa   aaaa aHa  ',
        'aGHa abbbbaaGHa ',
        ' aGHabbcddbaGGa ',
        ' aGGaabccdbaaa  ',
        '  aa  abcba     ',
        '       aaa      ',
        '  aaaaaaaaaaaa  ',
        'aaaaaHHaaHHaaaa ',
        '  aaaaaaaaaaaa  '], colors, 2);
			var caveBat = Pixel([
				'aaaaa    a    a    aaaaa',
				' aGIIaaa aa  aa aaaIIGa ',
				'  aGGGHGaKKaaKKaGHGGGa  ',
				'  aIHHGGaLMKKMLaGGHHIa  ',
				' aIIIGHGaKeLLeKaGHGIIIa ',
				'  aaGIHGaMgMMgMaGHIGaa  ',
				'    aIHGHaKLLKaHGHIa    ',
				'    aIIGHa1JJ1aHGIIa    ',
				'     aaGa aMMa aGaa     ',
				'       a   aa   a       ',
				'                        ',
				'                        ',
				'  aaaaaaa      aaaaaaa  ',
				'aaaaaaaaaaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaaaaaaaaaa',
				'  aaaaaaaa    aaaaaaaa  '], colors, 2);
			var africanSwallow = Pixel([
				'                ',
				'    aaa  aaaaaa ',
				'   ayyyaazzzza  ',
				'  adyya11zzaa   ',
				'  adyya1zya     ',
				'  adya11za      ',
				'  aada1za       ',
				' azza11a        ',
				'aayyyda         ',
				'  ai1dya        ',
				'   add11aa      ',
				'    aaddzza     ',
				'      aayaza    ',
				'       ayaaza   ',
				'        ayaaza  ',
				'        aya a   ',
				'         a      ',
				'                ',
				'                ',
				'                ',
				'                ',
				'  aaaaaaaaaaa   ',
				' aaaaaaaaaaaaa  ',
				'  aaaaaaaaaaa   '], colors, 2);
			var killerBunny = Pixel([
        '                        ',
        '        aaaa            ',
        '       a7a11a           ',
        '      a7a1hga           ',
        '     aaa1hhga    aa     ',
        '    aa11hggaaaaaa77a    ',
        '   a111hgaa111111a77a   ',
        '  a11e11a111111111a7a   ',
        '  a1fg1111111111111a    ',
        '  a7771111111117117a    ',
        '   aa77711111771117a    ',
        '     aaa17aa7aa1117a    ',
        '   aaa7a17aaa11117aa    ',
        '  aaaaa177aaa17777aaa   ',
        '   aaaaaaaaaaaaaaaaa    ',
        '     aaaaaaaaaaaaa      '], colors, 2);
			var wraith = Pixel([
        '   aaaa         ',
        '  aaaKKaa       ',
        '  aaaaKKKa      ',
        '  aMaaJJKKa     ',
        '  aaaaJJJaa     ',
        '  aaaaJaa a     ',
        '   aaJJa   a    ',
        '    aJIIa  a    ',
        '   aIIIIIa a    ',
        '   aIIHIIa      ',
        '   aIIHIIa      ',
        '  aHIHGHIa      ',
        '  aHIHGHHIa     ',
        '  aHHGaGHIIa    ',
        '  aHGGaGHHHa    ',
        '  aGGaaaGHHa    ',
        '  aGa aaGHHaa   ',
        '   aa a aGHHa   ',
        '   aa a aGaaGa  ',
        '   aa  a aa aa  ',
        '  aa4aa4aa4a4a  ',
        ' aaaa4aa4a4a4aa ',
        ' aaaa4aaaaaaaaa ',
        '  aaaaaaaaaaaa  '], colors, 2);
			var bandit = Pixel([
        '                ',
        '     aaaa       ',
        '    aZZZZa      ',
        '   aZZZZZ2a     ',
        '   aZ11223a     ',
        '   a2a1233a     ',
        '   afffffea     ',
        '   affeeea      ',
        '   aeeee23aa    ',
        '    aea33lzza   ',
        '     aallzzzza  ',
        '  aa  azzzayza  ',
        ' aZ2aaazzzzayza ',
        ' a22  azzyya22a ',
        ' aaa  ayqqaa2Za ',
        ' a7aaaaaqa17aa  ',
        ' a7a  aaa17aa   ',
        ' a7a ara17aa    ',
        ' a1a aqaaaOPa   ',
        '  a   aPOaOOPa  ',
        '   aaaaPOaaOOaa ',
        '  aaaaPOOaaaOaa ',
        '   aaaaaaaaaaa  ',
        '     aaaaaaa    '], colors, 2);
			var wolf = Pixel([
        '       a                ',
        '     a aa               ',
        '     aa6a               ',
        '   aa666a               ',
        ' aa665bc6aa   aaaaaa    ',
        'a66cceb5c66aaa666666a   ',
        'accc5b5accc66cc666ca6a  ',
        ' aaaaaacc6cc66a6cccac6a ',
        '      ab6ca555ac66ccaca ',
        '      aabca5bbaccccbabca',
        '     abab5aaaa aac5bab5a',
        '    ab4aabca  ab4a5bab5a',
        ' aaa44aaab5aaa4aacbaaa5a',
        'aaaaaaaaab5aaaaaa5baaaaa',
        ' aaaaaaaaaaaaaaaaaaaaaa ',
        '    aaaaaaaaaaaaaaa     '], colors, 2);
			var owl = Pixel([
        '                ',
        '    aa   aaaaaa ',
        '   aTa  aVVVUTSa',
        '  aTSTaaVUUTTSa ',
        '  aSSSaVUTTUSa  ',
        ' aaSaSaURUUSRa  ',
        'aVaaVaaTUSRaa   ',
        'aUVUUaaTUaa     ',
        'aTUTTaaUSa      ',
        'aa1a1aVTRa      ',
        'aSoSUVVURa      ',
        ' aoaSUSVVa      ',
        '  aaRUVVUVa     ',
        '    aRSVRUVa    ',
        '     aRRSTTa    ',
        '    ananaRUUa   ',
        '    ananaRSTa   ',
        '     ananaRSa   ',
        '      a a aa    ',
        '                ',
        '                ',
        '  aaaaaaaaaaa   ',
        ' aaaaaaaaaaaaa  ',
        '  aaaaaaaaaaa   '], colors, 2);
			var toothyCow = Pixel([
        '       aaaaaaaaaaaa     ',
        '     aa144441111111a    ',
        'aa  a11114a111444411a   ',
        'aQaa11a111aa14444441a   ',
        'aa111a7a11aa1aa44aa1a   ',
        'a111177a111111aaaa111a  ',
        'a11144a11444111aa1111a  ',
        'a71ae4ad444aa17a111447a ',
        'a7774aad4aaa7777a144a7a ',
        ' a77aaaa7a177777a1aaa7a ',
        ' ahga11aa717affffa7aaaa ',
        ' agg11aaa777aaggfa77a a ',
        '  aaaaca a7a  aaaa77a a ',
        '     aca a7a   acaa7aa  ',
        '     aaa aaa   aa aa    ',
        '     aa  aa    aa aa    '], colors, 2);
			var gazer = Pixel([
        '      aaaa      ',
        '    aaIIIIaa    ',
        '   aIIJJJJIIa   ',
        '  aIIHIIIIHIIa  ',
        '  aIHHGGGGHHIa  ',
        '  aHHGoppoGHHa  ',
        '  aHGoppepoGHa  ',
        ' aGHGoppepoGHGa ',
        ' aGGHGopioGHGGa ',
        '  aaGGGGGGGGaa  ',
        '   aaaaaaaaaa   ',
        '   aNKNKMNKNa   ',
        '   aNKNLMNKNa   ',
        '   aNLNLMNLNa   ',
        '   aNKNKNMLMa   ',
        '  aNMKMKNKMKNa  ',
        '  aNKKNLNKNKNa  ',
        '  aNLNNaMLNKNa  ',
        '  aNLNa aNMaNa  ',
        '  aNaMa aMaaMa  ',
        '   a a   a  a   ',
        '  aaaaaaaaaaaa  ',
        ' aaaaaaaaaaaaaa ',
        '  aaaaaaaaaaaa  '], colors, 2);
			var bloodSandScorpion = Pixel([
        '                aaa     ',
        '               akjia    ',
        '               akiaja   ',
        '             aakja aja  ',
        '            a11aa  aiaa ',
        '             aa     ajka',
        '                    ajia',
        '      aa aaaaa    aajaa ',
        '  aaaaiiakkkkkaaaakkjia ',
        ' ajjjjaaajekkjjkkkkjia  ',
        ' aaaajjjjimjjnjnnjjia   ',
        'aiijjjiiinaminiiinaa    ',
        ' aaiiiiaanaaanaaaanaa   ',
        ' aaaaaaaamaaamaaaamaaaa ',
        'aaaaaaaamaaamaaaaaammaaa',
        ' aaaaaaaaaaaaaaaaaaaaa  '], colors, 2);
			var mummy = Pixel([
        '                ',
        '                ',
        '      aaa       ',
        '     a111a      ',
        '    a17711a     ',
        '    aaaa71a     ',
        '    aeaea7a     ',
        '    a17111a     ',
        '     a177a      ',
        '  aaa17111a     ',
        ' a171171171a    ',
        ' a77d77d511a    ',
        '  aaaa557771a   ',
        '    a5a7d711a   ',
        '   a5add7777a   ',
        '   a5a77d111a   ',
        '    aa7d111a    ',
        '     a1a177a    ',
        '     a1a7111a   ',
        '     a77a7111a  ',
        '    aa1daa7711a ',
        ' aaaaa17aaaa77aa',
        ' aaaaaaaaaaaaaaa',
        '    aaaaaaaaaaa '], colors, 2);
		}
		// ability tiles
		{
			var slash = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaabbbaaaa  ',
				'  aaabbaaabdaa  ',
				'  aaaaaaaadcaa  ',
				'  aaaaabbdcaaa  ',
				'  aaaabaadcaaa  ',
				'  aaaaaadcaaaa  ',
				'  aaaaVddcaaaa  ',
				'  aaaaaTcaaaaa  ',
				'  aaaaPQTVaaaa  ',
				'  aaaaOaaaaaaa  ',
				'   aaOaaaaaaa   ',
				'                ',
				'                '
			], colors, 2);
			var shadowStrike = Pixel([
				'                ',
				'                ',
				'   aaKaaaaaaa   ',
				'  aaK1Kaaaaaaa  ',
				'  aaK1Kaaaaaaa  ',
				'  aaK1Kaaaaaaa  ',
				'  aaaK1KaKKaaa  ',
				'  aaaK11K11Kaa  ',
				'  aaK1KK1KK1Ka  ',
				'  aK1KaK1KaK1K  ',
				'  aK1KaK1KaaKa  ',
				'  K1K1KaK1Kaaa  ',
				'  K1KK1K1K1Kaa  ',
				'   KaaKaKK1Ka   ',
				'                ',
				'                '
			], colors, 2);
			var aMereFleshWound = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaa1aaaaaaaa  ',
				'  aaa1aaaaaaaa  ',
				'  aaf1aaaaaaaa  ',
				'  aaf11aaaaaaa  ',
				'  aaaf1aaaaaaa  ',
				'  afaf11aaaaaa  ',
				'  aaaef11111aa  ',
				'  aaeaaef11aaa  ',
				'  aaaaeaafaaaa  ',
				'  aaaaeaaaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '
			], colors, 2);
			var ni = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaaaa1aa1aa  ',
				'  aaa1aonao1aa  ',
				'  aaaoonnoooaa  ',
				'  aaojonjojooa  ',
				'  a1njjojnjnoa  ',
				'  aoninjjmjmoa  ',
				'  aaninmininaa  ',
				'  aaanoononoaa  ',
				'  aaooaooaa1aa  ',
				'  aaaaa1aaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '
			], colors, 2);
			var vigor = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aaaapaaaaaaa  ',
				'  aaapaaanpaaa  ',
				'  aaanpanaapaa  ',
				'  apaamompaaaa  ',
				'  anmanooonaaa  ',
				'  aaapommomnaa  ',
				'  aaaapomooana  ',
				'  aapamppmaapa  ',
				'  aaapnaanaaaa  ',
				'  aaaaaapaaaaa  ',
				'   aaaaaaaaaa   ',
				'                ',
				'                '
			], colors, 2);
			var blackBreath = Pixel([
        '                ',
        '                ',
        '   aaaaaaaaaa   ',
        '  aaaaaaaaaaaa  ',
        '  aaaabbbbaaaa  ',
        '  aaa444bbbaaa  ',
        '  aaa4aababaaa  ',
        '  aaa4aa4abaaa  ',
        '  aaa44bb44aaa  ',
        '  aaaa44b4aaaa  ',
        '  aaaaba4aaaaa  ',
        '  aaaaababaaaa  ',
        '  aaaaaaaaaaaa  ',
        '   aaaaaaaaaa   ',
        '                ',
        '                '], colors, 2);
		}
		// interacting tiles
		{
			var chest1 = Pixel([
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				'  aJopJJJJopJa  ',
				'  aKopKKKKopKa  ',
				'  aJopJJJJopJa  ',
				'  aIooIIIIooIa  ',
				'  aInnIIIInnIa  ',
				'  aGGGGnnGGGGa  ',
				'  aHmnHmmHmnHa  ',
				'  aGmnHGGHmnGa  ',
				'  aGmmGGGGmmGa  ',
				'  aaaaaaaaaaaa  ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var potatoPlant = Pixel([
				'                ',
				'                ',
				'     aa aa      ',
				'    auwawuaaa   ',
				'     auwuawwua  ',
				'    a awawwua   ',
				'   awaatawwua   ',
				'   awwattuua    ',
				'   auwatuaa     ',
				'    autaua      ',
				'     ataua      ',
				'     attua      ',
				'      auua      ',
				'    aaauraa     ',
				'   aaaaraaaa    ',
				'    aaaaaaa     '
			], colors, 2);
			var crystallineChest = Pixel([
				'                ',
				'                ',
				'  aaaaaaaaaaaa  ',
				' aBzBBBBBBBBzBa ',
				' aCACCCCCCCCACa ',
				' aCACCCCCCCCACa ',
				' aBzBBBBBBBBzBa ',
				' aBzBBBBBBBBzBa ',
				' aAyAAAAAAAAyAa ',
				' aaaaaaaaaaaaaa ',
				' aByBAyAAyAByBa ',
				' aByBAyzzyAByBa ',
				' aByBBAyyABByBa ',
				' aByBBBAABBByBa ',
				' aaaaaaaaaaaaaa ',
				'                '
			], colors, 2);
		}
		// ability animations
		{
			var slash1 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'    dd          ',
				'   d11d         ',
				'   dd1d         ',
				'    dd          ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var slash2 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     dd         ',
				'    d11d        ',
				'   d111d        ',
				'   cd1d         ',
				'    cd          ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var slash3 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      ddd       ',
				'     d111d      ',
				'    d1111d      ',
				'   d11ddd       ',
				'   cdd          ',
				'    c           ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var slash4 = Pixel([
				'                ',
				'                ',
				'                ',
				'        ddd     ',
				'      dd111d    ',
				'     d11111d    ',
				'    d111ddd     ',
				'    dddd        ',
				'   cc           ',
				'   c            ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var slash5 = Pixel([
				'                ',
				'                ',
				'                ',
				'        dddd    ',
				'      dd1111d   ',
				'     d1111111d  ',
				'    d1ddddd11d  ',
				'    cc     dd   ',
				'   c            ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var slash6 = Pixel([
				'                ',
				'                ',
				'                ',
				'        dddd    ',
				'      dd1111d   ',
				'     c1111111d  ',
				'    c ccddd111d ',
				'           d11d ',
				'            dd  ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);

			var slashCycle = [slash1, slash2, slash3, slash4, slash5, slash6];

			var lightning1 = Pixel([
				'       K        ',
				'      K1K       ',
				'       K        ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var lightning2 = Pixel([
				'       J        ',
				'      J1J       ',
				'      J11K      ',
				'     K1KK1K     ',
				'    K1K  K      ',
				'    K1K         ',
				'     K          ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var lightning3 = Pixel([
				'       I        ',
				'      I1I       ',
				'      I11J      ',
				'     J1JJ1J     ',
				'    J1J  J1K    ',
				'    J1J  K1K    ',
				'   K1K1K  K1K   ',
				'  K1K K1K  K    ',
				'  K1K  K        ',
				'   K            ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var lightning4 = Pixel([
				'       I        ',
				'      I1I       ',
				'      I11I      ',
				'     I1II1I     ',
				'    I1I  I1J    ',
				'    I1I  J1J    ',
				'   J1J1J  J1JJ  ',
				'  J1J J1K  J11K ',
				'  J1J  K  J1JK1K',
				'   K1K    K1K K ',
				'   K1K   K1K    ',
				'    K    K1K    ',
				'          K     ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var lightning5 = Pixel([
				'       I        ',
				'      I1I       ',
				'      I11I      ',
				'     I1II1I     ',
				'    I1I  I1I    ',
				'    I1I  I1I    ',
				'   I1I1I  I1I   ',
				'  I1I I1J  I1J  ',
				' J11I  J  I1I1J ',
				'J1JJ1J   J1J J1J',
				' K K1J   J1J K1J',
				'   K1K   K1K K1K',
				'  K1K   K1K   K ',
				'  K1K   K1K     ',
				'   K     K      ',
				'                '
			], colors, 2);

			var lightningCycle = [lightning1, lightning2, lightning3, lightning4, lightning5];

			var levelUp1 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'       pp       ',
				'      p11p      ',
				'      p11p      ',
				'       pp       '
			], colors, 2);
			var levelUp2 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'       pp       ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'       pp       '
			], colors, 2);
			var levelUp3 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'       pp       ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'       pp       '
			], colors, 2);
			var levelUp4 = Pixel([
				'                ',
				'                ',
				'                ',
				'       pp       ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'      p11p      ',
				'       pp       '
			], colors, 2);
			var levelUp5 = Pixel([
				'                ',
				'                ',
				'                ',
				'       pp       ',
				'      p11p      ',
				'    pp1111pp    ',
				'     p1111p     ',
				'     p1111p     ',
				'      p11p      ',
				'     p1111p     ',
				'    p111111p    ',
				'     p1111p     ',
				'     p1111p     ',
				'      p11p      ',
				'      p11p      ',
				'       pp       '
			], colors, 2);
			var levelUp6 = Pixel([
				'                ',
				'                ',
				'       oo       ',
				'      oppo      ',
				'    oop11po     ',
				'   opp1111ppo   ',
				'    op1111po    ',
				'    op1111po    ',
				'     op11po     ',
				'    op1111po    ',
				'   op111111po   ',
				'    op1111po    ',
				'    op1111po    ',
				'     op11po     ',
				'     op11po     ',
				'      oppo      '
			], colors, 2);
			var levelUp7 = Pixel([
				'                ',
				'       nn       ',
				'      noon      ',
				'    nnopponn    ',
				'   noop11poon   ',
				'  nopp1111ppon  ',
				'   nop1111pon   ',
				'   nop1111pon   ',
				'    nop11pon    ',
				'   nop1111pon   ',
				'  nop111111pon  ',
				'   nop1111pon   ',
				'   nop1111pon   ',
				'    nop11pon    ',
				'    nop11pon    ',
				'     noppon     '
			], colors, 2);
			var levelUp = [levelUp1, levelUp2, levelUp3, levelUp4, levelUp5, levelUp6, levelUp7, levelUp6, levelUp5, levelUp4, levelUp3, levelUp2, levelUp1];

			var aMereFleshWound1 = Pixel([
				'                ',
				'      d1        ',
				'      d1        ',
				'      d1        ',
				'      d1        ',
				'       d        ',
				'       d        ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var aMereFleshWound2 = Pixel([
				'                ',
				'                ',
				'                ',
				'      d1        ',
				'      d1        ',
				'      d1        ',
				'      d1        ',
				'       d        ',
				'       d        ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var aMereFleshWound3 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      d1        ',
				'      d1        ',
				'      d1        ',
				'      d1        ',
				'       de       ',
				'       e        ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var aMereFleshWound4 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'          e     ',
				'      d1 e      ',
				'      d1        ',
				'     ed1ee      ',
				'    e ee  e     ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var aMereFleshWound5 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'   ff           ',
				'     f    ef    ',
				'      d1 e  f   ',
				'   ff d1        ',
				'  f  ed1ee      ',
				'    e ee  e     ',
				'   f      f     ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var aMereFleshWound6 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'   ff           ',
				'     f    ef    ',
				'      d1 e  f   ',
				'   ff d1        ',
				'  f  ed1ee      ',
				'    e ee  e     ',
				'   f      f     ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var aMereFleshWoundCycle = [aMereFleshWound1, aMereFleshWound2, aMereFleshWound3, aMereFleshWound4, aMereFleshWound5, aMereFleshWound6];


			var falcon1 = Pixel([
				'                ',
				'                ',
				'                ',
				'       aaaa     ',
				'      a7777a    ',
				'     a7pppp7a   ',
				'    a7p4opn6a   ',
				'    a6pa4p6a    ',
				'   a6lnpan6a    ',
				'   a6flnn6a     ',
				'   a6f666a      ',
				'    a6aaa       ',
				'     a          ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var falcon2 = Pixel([
				'                ',
				'                ',
				'                ',
				'       aaaa     ',
				'      a77 7a    ',
				'     a7pppp7a   ',
				'    a7p op  a   ',
				'    a6pa4p6a    ',
				'   a6lnpan6a    ',
				'   a6f  n6a     ',
				'   a6f666a      ',
				'    a6aaa       ',
				'     a          ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var falcon3 = Pixel([
				'                ',
				'                ',
				'                ',
				'         aa     ',
				'        7 7     ',
				'     a7p pp7a   ',
				'    a7p op  a   ',
				'    a    p6a    ',
				'   a ln an6a    ',
				'     f  n6a     ',
				'     f 66       ',
				'    a6aa        ',
				'     a          ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var falcon4 = Pixel([
				'                ',
				'                ',
				'                ',
				'         aa     ',
				'        7 7     ',
				'     a7p pp7    ',
				'      p o   a   ',
				'    a    p6     ',
				'   a ln a  a    ',
				'        n6      ',
				'       66       ',
				'    a6aa        ',
				'     a          ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var falcon5 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'          7     ',
				'     a   p 7    ',
				'      p o   a   ',
				'    a    p6     ',
				'   a    a  a    ',
				'        n6      ',
				'                ',
				'     6a         ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var falconCycle = [falcon1, falcon2, falcon3, falcon4, falcon5];

			var ni1 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      4444      ',
				'     444444     ',
				'    44444444    ',
				'    44444444    ',
				'    44444444    ',
				'    44444444    ',
				'     444444     ',
				'      4444      ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var ni2 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'      1111      ',
				'     111111     ',
				'    11111111    ',
				'    11111111    ',
				'    11111111    ',
				'    11111111    ',
				'     111111     ',
				'      1111      ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var ni3 = Pixel([
				'                ',
				'                ',
				'                ',
				'         l      ',
				'    l   l       ',
				'     l lk  l    ',
				'     llljlll    ',
				'     lkkjjk     ',
				'    lkjjjk      ',
				'    lj jl l     ',
				'    l  kl       ',
				'        l       ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var ni4 = Pixel([
				'                ',
				'                ',
				'          lk    ',
				'   l    lkj     ',
				'   kll  kj      ',
				'    kj lj  lkl  ',
				'     ll jlllj   ',
				'     l    jk    ',
				'    llj  kjk    ',
				'   llk kl jjk   ',
				'   lj  kk   j   ',
				'   kj  kj       ',
				'   j   jj       ',
				'        j       ',
				'                ',
				'                '
			], colors, 2);
			var ni5 = Pixel([
				'                ',
				'  kk       kk   ',
				'  kj      lkj   ',
				'  j       j     ',
				'                ',
				'           lkk  ',
				'            jjk ',
				'  kk          j ',
				' kjj            ',
				' j              ',
				'           kk   ',
				'  kk    k   kk  ',
				'  kk   kk   jk  ',
				'   jk  kj    j  ',
				'    j   jj      ',
				'                '
			], colors, 2);
			var ni6 = Pixel([
				'  j             ',
				' jkk        kj  ',
				'             j  ',
				'                ',
				'                ',
				'                ',
				'              k ',
				'              jj',
				' k             j',
				'jj              ',
				'                ',
				'                ',
				'            j   ',
				'   jk        j  ',
				'    j   j    j  ',
				'        j       '
			], colors, 2);
			var niCycle = [ni1, ni2, ni3, ni4, ni5, ni6];

			var vigor1 = Pixel([
				'                ',
				'      oo        ',
				'      oo        ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var vigor2 = Pixel([
				'                ',
				'      oo        ',
				'     o o o      ',
				'    o           ',
				'      o         ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var vigor3 = Pixel([
				'                ',
				'                ',
				'                ',
				'    o     o     ',
				'   o   o        ',
				'     o   o o    ',
				'   o   o        ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var vigor4 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'     o          ',
				'   o    o       ',
				'     o   o  o   ',
				'   o  o   o     ',
				'    o   o   o   ',
				'      o         ',
				'         o      ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var vigor5 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     o   o      ',
				'  o             ',
				'    o   o   o   ',
				'  o   o   o     ',
				'       o     o  ',
				'   o o          ',
				'        o       ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var vigor6 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     o    o     ',
				' o              ',
				'   o        o   ',
				' o   o  o o     ',
				'      o      o  ',
				'  o  o          ',
				'         o      ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var vigor7 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     o     o    ',
				' o              ',
				'   o        o   ',
				'o    o  o o     ',
				'             o  ',
				' o  o           ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var vigor8 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				' o              ',
				'    o        o  ',
				'      o   o     ',
				'             o  ',
				' o  o           ',
				'                ',
				'                '
			], colors, 2);
			var vigor9 = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'             o  ',
				'  o  o          ',
				'                '
			], colors, 2);
			var vigorCycle = [vigor1, vigor2, vigor3, vigor4, vigor5, vigor6, vigor7, vigor8, vigor9];
		}
		// block tiles
		{
			var sand = Pixel([
				'TSUUSSTTSVUSTTST',
				'STTSSVVVTUUUSVVS',
				'VUVVTVUUUTSSVVUU',
				'TSSUUTSSSSSVTSUT',
				'SVUSTVVVUTVVUUTV',
				'TSTVVUUTTVTTSTVU',
				'VUUSUTSVUUUSSVST',
				'STTUTSVSSTTVVUUU',
				'UUUTSVVVVUUTSSST',
				'TSSSVSUUUTSVSVUU',
				'SVVUUTUTSSVTVUST',
				'STTSSVSUSVUSSTSV',
				'VVSUUUUSSTTSSVVU',
				'UUUTTSSSVVUTSTUU',
				'TTSSSVVTVUUSVSST',
				'UUUTVVUUTSSUUUUU'
			], colors, 2);
			var dirt = Pixel([
				'PSQQOOPPSRQOPPOP',
				'SPPOSRRRPQQQORRO',
				'RQRRPRQQQPOORRQQ',
				'POOQQPOOOSSRPOQP',
				'SRQOPRRRQPRRQQPR',
				'POPRRQQPPRPPOPRQ',
				'RQQOQPORQQQOSROP',
				'OPPQPSROOPPRRQQQ',
				'QQQPORRRRQQPOOOP',
				'POOSROQQQPORSRQQ',
				'SRRQQPQPOSRPRQOP',
				'OPPOOROQSRQOOPSR',
				'RROQQQQOOPPSSRRQ',
				'QQQPPOOSRRQPOPQQ',
				'PPOSSRRPRQQORSOP',
				'QQQPRRQQPOOQQQQQ'
			], colors, 2);
			var cactus = Pixel([
				'                ',
				'                ',
				'      aaa       ',
				'     artqa      ',
				'     arsra      ',
				'     aqsra  aa  ',
				'     aqsra asra ',
				'     aqtra asra ',
				' aa  aqtqa asra ',
				'atqa arsrtaqsqa ',
				'atra arsrrqrtqa ',
				'asra arsrtttrta ',
				'astqatrsqqrrta  ',
				'arttssqtqtaaa   ',
				' aqrrsqtra      ',
				'  aaaqqsra      ',
				'     arsra      ',
				'     arsqa      ',
				'     artqa      ',
				'  SSSartqaSSSS  ',
				' SSSSSaaaSSSSSS ',
				'   SSSSSSSSSS   ',
				'                ',
				'                '
			], colors, 2);
			var skull = Pixel([
				'                ',
				'        a     a ',
				'       a7a   a1a',
				'       aca   a7a',
				'       aca  a17a',
				'       aa1aa117a',
				'     aa111111da ',
				'    a11177171da ',
				'   a171daad116a ',
				'  a11117aa1d6ca ',
				' a17117dccd7aa  ',
				'a1d1d16caac6a   ',
				'a1cddcaa  aa    ',
				' acacca         ',
				'  a aa          ',
				'                '
			], colors, 2);
			var skullSand = Composite([sand, skull]);

			var cactusSand = Composite2(sand, cactus);

			var grass = Pixel([
				'rtuvrtturtttruvs',
				'rttusrtusrtrrtuv',
				'rttusrttssrvrttu',
				'srtrrvrrrvstrttt',
				'vrtrtvsrtustrtts',
				'uvsrtuurtuussrrs',
				'uvsrtturtturvsrt',
				'tussrttsrttruvrt',
				'rtrvsrtsrtrrtusr',
				'srruvsrsvrrtttsv',
				'srttusrtuurttrtv',
				'urttusrttrvrtrtu',
				'urttsrurtrusrrtt',
				'tsrtrtusrtuvsrrt',
				'rrvrrtuurtuvsrrt',
				'rtuvrtturttusrvr'
			], colors, 2);
			var grassTop = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'     qqqqq      ',
				'  qqqrrrrrqqq   ',
				'qqrrrrssrsrrrqqq',
				'rrssrtusrturrrrr',
				'rtrvsrtsrurrtusr',
				'srruvsrsvrrtttsv',
				'srttusrtuurttrtv',
				'urttusrttrvrtrtu',
				'urttsrurtrusrrtt',
				'tsrtrtusrtuvsrrt',
				'rrvrrtuurtuvsrrt',
				'rtuvrtturttusrvr'
			], colors, 2);
			var grassBottom = Pixel([
				'rtuvrtturtttruvs',
				'rttusrtusrtrrtuv',
				'rttusrttssrvrttu',
				'srtrrvrrrvstrttt',
				'vrtrtvsrtustrtts',
				'uvsrtuurtuussrrs',
				'ursrtturtturvsrt',
				'rrrsssrssttrrrrr',
				'qrrrrsrsrrrrqqqq',
				' qqqrrrrrqqq    ',
				'    qqqqq       ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var grassLeft = Pixel([
				'       qrtttruvs',
				'       qrrtrrtuv',
				'       qrsrvrttu',
				'      qrrvstrttt',
				'     qrrtustrtts',
				'     qrrtuussrrs',
				'     qrrtturvsrt',
				'     qrsrttruvrt',
				'      qrrtrrtusr',
				'      qrvrrtttsv',
				'      qruurttrtv',
				'      qrtrvrtrtu',
				'       qrrusrrtt',
				'       qrtuvsrrt',
				'       qrtuvsrrt',
				'       qrttusrvr'
			], colors, 2);
			var grassRight = Pixel([
				'rtuvrttrq       ',
				'rttusrtrq       ',
				'rttusrttrq      ',
				'srtrrvrrrq      ',
				'vrtrtvstrq      ',
				'uvsrtuutrq      ',
				'uvsrtturrq      ',
				'tussrttsrrq     ',
				'rtrvsrtsrrq     ',
				'srruvsrsvrq     ',
				'srttusrturq     ',
				'urttusrttrq     ',
				'urttsrusrq      ',
				'tsrtrturqq      ',
				'rrvrrturq       ',
				'rtuvrttrq       '
			], colors, 2);
			var grassTopLeft = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'         qqqqq  ',
				'        qrrrrrqq',
				'       qrtrrturr',
				'       qrrrtttsv',
				'      qruurttrtv',
				'      qrtrvrtrtu',
				'      qrtrusrrtt',
				'       qrtuvsrrt',
				'       qrtuvsrrt',
				'       qrttusrvr'
			], colors, 2);
			var grassTopRight = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'   qqqq         ',
				'qqqrrrrq        ',
				'rrrvsrtrq       ',
				'srruvsrsrq      ',
				'srttusrtrq      ',
				'urttusrtrq      ',
				'urttsrurrq      ',
				'tsrtrturrq      ',
				'rrvrrturq       ',
				'rtuvrttrq       '
			], colors, 2);
			var grassBottomLeft = Pixel([
				'       qrtttruvs',
				'       qrrtrrtuv',
				'       qrsrvrttu',
				'      qrrvstrttt',
				'      qrsustrtts',
				'      qrsuussrrs',
				'       qrturvsrt',
				'       qrrtruvrt',
				'        qqrrrrqq',
				'          qqqq  ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var grassBottomRight = Pixel([
				'rtuvrttrq       ',
				'rttusrtrq       ',
				'rttusrttrq      ',
				'srtrrvrrrq      ',
				'vrtrtvsrrq      ',
				'uvsrtuurrq      ',
				'uvsrtturq       ',
				'rrssrttrq       ',
				'qqrrrrrq        ',
				'  qqqqq         ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var grassTopLeftInterior = Pixel([
				'rtuvrtturtttruvs',
				'rttusrtusrtrrtuv',
				'rttusrttssrvrttu',
				'srtrrvrrrvstrttt',
				'vrtrtvsrtustrtts',
				'uvsrtuurtuussrrs',
				'uvsrtturtturvsrt',
				'tussrttsrttruvrr',
				'rtrvsrtsrtrrrrqq',
				'srruvsrsvrrqqq  ',
				'srttusrturq     ',
				'urttusrtrq      ',
				'urttsrurrq      ',
				'tsrtrturq       ',
				'rrvrrturq       ',
				'rtuvrttrq       '
			], colors, 2);
			var grassTopRightInterior = Pixel([
				'rtuvrtturtttruvs',
				'rttusrtusrtrrtuv',
				'rttusrttssrvrttu',
				'srtrrvrrrvstrttt',
				'vrtrtvsrtustrtts',
				'uvsrtuurtuussrrs',
				'uvsrtturtturvsrt',
				'rrrsrttsrttruvrt',
				'qqqrrrtsrtrrtusr',
				'   qqrrsvrrtttsv',
				'     qrtuurttrtv',
				'      qrtrvrtrtu',
				'      qrtrusrrtt',
				'       qrtuvsrrt',
				'       qrtuvsrrt',
				'       qrttusrvr'
			], colors, 2);
			var grassBottomLeftInterior = Pixel([
				'rtuvrttrq       ',
				'rttusrtrq       ',
				'rttusrtrq       ',
				'srtrrvrrrq      ',
				'vrtrtvsrrq      ',
				'uvsrtuurtrq     ',
				'uvsrtturttrqq   ',
				'tussrttsrttrrqqq',
				'rtrvsrtsrtrrtrrr',
				'srruvsrsvrrtttsv',
				'srttusrtuurttrtv',
				'urttusrttrvrtrtu',
				'urttsrurtrusrrtt',
				'tsrtrtusrtuvsrrt',
				'rrvrrtuurtuvsrrt',
				'rtuvrtturttusrvr'
			], colors, 2);
			var grassBottomRightInterior = Pixel([
				'       qrtttruvs',
				'       qrrtrrtuv',
				'       qrsrvrttu',
				'      qrrvstrttt',
				'      qrtustrtts',
				'     qrrtuussrrs',
				'   qqrurtturvsrt',
				'qqqrrttsrttruvrt',
				'rrrvsrtsrtrrtusr',
				'srruvsrsvrrtttsv',
				'srttusrtuurttrtv',
				'urttusrttrvrtrtu',
				'urttsrurtrusrrtt',
				'tsrtrtusrtuvsrrt',
				'rrvrrtuurtuvsrrt',
				'rtuvrtturttusrvr'
			], colors, 2);

			var grassBottomDirt = Composite([dirt, grassBottom]);
			var grassBottomRightDirt = Composite([dirt, grassBottomRight]);
			var grassRightDirt = Composite([dirt, grassRight]);
			var grassBottomRightInteriorDirt = Composite([dirt, grassBottomRightInterior]);
			var grassTopRightDirt = Composite([dirt, grassTopRight]);
			var grassTopDirt = Composite([dirt, grassTop]);
			var grassTopRightInteriorDirt = Composite([dirt, grassTopRightInterior]);
			var grassTopLeftDirt = Composite([dirt, grassTopLeft]);
			var grassLeftDirt = Composite([dirt, grassLeft]);
			var grassTopLeftInteriorDirt = Composite([dirt, grassTopLeftInterior]);
			var grassBottomLeftDirt = Composite([dirt, grassBottomLeft]);
			var grassBottomLeftInteriorDirt = Composite([dirt, grassBottomLeftInterior]);

			var grassBottomSand = Composite([sand, grassBottom]);
			var grassBottomRightSand = Composite([sand, grassBottomRight]);
			var grassRightSand = Composite([sand, grassRight]);
			var grassBottomRightInteriorSand = Composite([sand, grassBottomRightInterior]);
			var grassTopRightSand = Composite([sand, grassTopRight]);
			var grassTopSand = Composite([sand, grassTop]);
			var grassTopRightInteriorSand = Composite([sand, grassTopRightInterior]);
			var grassTopLeftSand = Composite([sand, grassTopLeft]);
			var grassLeftSand = Composite([sand, grassLeft]);
			var grassTopLeftInteriorSand = Composite([sand, grassTopLeftInterior]);
			var grassBottomLeftSand = Composite([sand, grassBottomLeft]);
			var grassBottomLeftInteriorSand = Composite([sand, grassBottomLeftInterior]);

			var water = Pixel([
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD',
				'DDDDDDDDDDDDDDDD'
			], colors, 2);
			var waterBottom = Composite([water, grassBottom]);
			var waterTop = Composite([water, grassTop]);
			var waterLeft = Composite([water, grassLeft]);
			var waterRight = Composite([water, grassRight]);
			var waterBottomLeft = Composite([water, grassBottomLeft]);
			var waterTopLeft = Composite([water, grassTopLeft]);
			var waterBottomRight = Composite([water, grassBottomRight]);
			var waterTopRight = Composite([water, grassTopRight]);
			var waterTopLeftInterior = Composite([water, grassTopLeftInterior]);
			var waterTopRightInterior = Composite([water, grassTopRightInterior]);
			var waterBottomLeftInterior = Composite([water, grassBottomLeftInterior]);
			var waterBottomRightInterior = Composite([water, grassBottomRightInterior]);

			var bush = Pixel([
				'                ',
				'       aa       ',
				'    aaattaaa    ',
				'   atttuuttta   ',
				'  astuvvvvutsa  ',
				'  assuuvvuutsa  ',
				' atrtttuuttrsta ',
				' artrssttsrstra ',
				' atssrtrrttsqsa ',
				' asrrtssttrqtsa ',
				' aqssrqqrqtssqa ',
				' arqqtsstssqqra ',
				'  arrqqqsrqrra  ',
				' qqaasrrqqraaqq ',
				'  qqqaaaaaaqqq  ',
				'    qqqqqqqq    '
			], colors, 2);
			var shadowBush = Pixel([
				'                ',
				'       aa       ',
				'    aaaJJaaa    ',
				'   aJJJKKJJJa   ',
				'  aIJKLLLLKJIa  ',
				'  aIIKKLLKKJIa  ',
				' aJHJJJKKJJHIJa ',
				' aHJHIIJJIHIJHa ',
				' aJIIHJHHJJIGIa ',
				' aIHHJIIJJHGJIa ',
				' aGIIHGGHGJIIGa ',
				' aHGGJIIJIIGGHa ',
				'  aHHGGGIHGHHa  ',
				' OOaaIHHGGHaaOO ',
				'  OOOaaaaaaOOO  ',
				'    OOOOOOOO    '
			], colors, 2);
			var rockShadowGrass = Pixel([
				'                ',
				'                ',
				'                ',
				'      aaaaa     ',
				'     a6666ca    ',
				'    a66666cca   ',
				'   a666666cba   ',
				'   a666666cba   ',
				'   a66666c5b4a  ',
				'  a66666c55b4a  ',
				'  a6666c55bb4a  ',
				'  a6666c5bbb4a  ',
				'  a666c5bbb44a  ',
				' qaaccbbbb44aa  ',
				'qqqqaaa444aaqqq ',
				' qqqqqqaaaqqqq  '
			], colors, 2);
			var rockShadowDirt = Pixel([
				'                ',
				'                ',
				'                ',
				'      aaaaa     ',
				'     a6666ca    ',
				'    a66666cca   ',
				'   a666666cba   ',
				'   a666666cba   ',
				'   a66666c5b4a  ',
				'  a66666c55b4a  ',
				'  a6666c55bb4a  ',
				'  a6666c5bbb4a  ',
				'  a666c5bbb44a  ',
				' Oaaccbbbb44aa  ',
				'OOOOaaa444aaOOO ',
				' OOOOOOaaaOOOO  '
			], colors, 2);
			var rockShadowStone = Pixel([
				'                ',
				'                ',
				'                ',
				'      aaaaa     ',
				'     a6666ca    ',
				'    a66666cca   ',
				'   a666666cba   ',
				'   a666666cba   ',
				'   a66666c5b4a  ',
				'  a66666c55b4a  ',
				'  a6666c55bb4a  ',
				'  a6666c5bbb4a  ',
				'  a666c5bbb44a  ',
				' aaaccbbbb44aa  ',
				'aaaaaaa444aaaaa ',
				' aaaaaaaaaaaaa  '
			], colors, 2);
			var redFlower = Pixel([
				'      ff        ',
				'    ffllff      ',
				'    eekjee      ',
				'      ee        ',
				'                ',
				'           ff   ',
				'         ffllff ',
				'  ff     eekjee ',
				'ffllff     ee   ',
				'eekjee          ',
				'  ee            ',
				'          ff    ',
				'        ffllff  ',
				'        eekjee  ',
				'          ee    ',
				'                '
			], colors, 2);
			var yellowFlower = Pixel([
				'                ',
				'        ww      ',
				'     p w  w     ',
				'   ppovw v      ',
				' ppoon w        ',
				'  oon  vvp      ',
				'  oo   vnopp    ',
				' x n  pv noopp  ',
				'     poo  noo   ',
				'    poonv  oo   ',
				'    pon v  n x  ',
				'   ooon v       ',
				'    x n  v      ',
				'         v      ',
				'         v      ',
				'                '
			], colors, 2);
			var orangeFlower = Pixel([
				'                ',
				'      kk        ',
				'      klk       ',
				'      jkj       ',
				'   ll  j ll     ',
				'  lkkkj1jjkll   ',
				'  kkjj j jjk    ',
				'      kkk       ',
				'      klk       ',
				'      lll       ',
				'       l        ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var blueFlower = Pixel([
				'         p      ',
				'          C     ',
				'         zBC    ',
				'         zBC    ',
				'   p     zAC    ',
				'  C      vAw    ',
				' zBC      v     ',
				' zBC            ',
				' zBC         p  ',
				' vAw  p      C  ',
				'  v    C    zBC ',
				'      zBC   zBC ',
				'      zBC   zBC ',
				'      zBC   vAw ',
				'      vAw    v  ',
				'       v        '
			], colors, 2);
			var bushGrass = Composite([grass, bush]);
			var rockGrass = Composite([grass, rockShadowGrass]);
			var rockDirt = Composite([dirt, rockShadowDirt]);
			var redFlowerGrass = Composite([grass, redFlower]);
			var yellowFlowerGrass = Composite([grass, yellowFlower]);
			var orangeFlowerGrass = Composite([grass, orangeFlower]);
			var blueFlowerGrass = Composite([grass, blueFlower]);
			var tree = Pixel([
				'      aaaa      ',
				'     atttta     ',
				'    atuvvuta    ',
				'   atuvvvvuta   ',
				'   atuvvvvuta   ',
				'  atuuuvvuuuta  ',
				'  attuuuuuutta  ',
				' attttuuuutrsta ',
				' autsrttttsttta ',
				'atttvusrsttvutta',
				'aststtuvtuvtrrta',
				'asqrrsstttsrttsa',
				'asstrrqtsrsstsra',
				'asrsstrrqstsqqsa',
				'asqrrssrsrqrrssa',
				' asrssqqqrrrsqa ',
				' asqqqrrrsqqqra ',
				'  aarraaaarraa  ',
				'   qaaOOOOaaq   ',
				' qqaPQOPPOQPaqq ',
				'qqaOQOaQQaPOOaqq',
				' qqaaaOPPOaaaqq ',
				'  qqqqaaaaqqqq  ',
				'     qqqqqq     '
			], colors, 2);
			var shadowTree = Pixel([
				'      aaaa      ',
				'     aJJJJa     ',
				'    aJKLLKJa    ',
				'   aJKLLLLKJa   ',
				'   aJKLLLLKJa   ',
				'  aJKKKLLKKKJa  ',
				'  aJJKKKKKKJJa  ',
				' aJJJJKKKKJHIJa ',
				' aKJIHJJJJIJJJa ',
				'aJJJLKIHIJJLKJJa',
				'aIJIJJKLJKLJHHJa',
				'aIGHHIIJJJIHJJIa',
				'aIIJHHGJIHIIJIHa',
				'aIHIIJHHGIJIGGIa',
				'aIGHHIIHIHGHHIIa',
				' aIHIIGGGHHHIGa ',
				' aIGGGHHHIGGGHa ',
				'  aaHHaaaaHHaa  ',
				'   OaaOOOOaaO   ',
				' OOaPQOPPOQPaOO ',
				'OOaOQOaQQaPOOaOO',
				' OOaaaOPPOaaaOO ',
				'  OOOOaaaaOOOO  ',
				'     OOOOOO     '
			], colors, 2);
			var shadowTreeDirt = Composite2(dirt, shadowTree);
			var treeGrass = Composite2(grass, tree);
			var deadTree = Pixel([
				'      a         ',
				'     aQa   aa   ',
				' a   aPOa aPQa  ',
				'aQa aRPa  aOa   ',
				'aOPa aOa aPa  a ',
				' aOa aOa aOa aQa',
				'  aPaaOaaQa  aPa',
				'  aOPaPPPQaaaPOa',
				'   aOPQQQRaPPOa ',
				'    aOPRQPPOaa  ',
				'  aaaOPRQQOa    ',
				' aPQQPOPQROa    ',
				'  aaaOOPQPa     ',
				'     aOOQPa     ',
				'     aPOPOa     ',
				'    aOPOPOPa    ',
				'  aaOOOOOPPPa   ',
				' aPPPOOOPPPOa   ',
				'  aaOOPOOPOaaa  ',
				' aQQPaOPPOQOPQa ',
				'aQPaaaPaQPaQaa  ',
				' aa aQQaaQPa    ',
				'    aPa  aPa    ',
				'     a    a     '
			], colors, 2);
			var deadTreeGrass = Composite2(grass, deadTree);
			var shadowBushDirt = Composite([dirt, shadowBush]);

			var stoneWallTop = Pixel([
				'5555555555555555',
				'66c5c66666cbc666',
				'dd656ddddd656ddd',
				'6d656dd6dd6b6ddd',
				'66cbc66666cbc666',
				'bb44bb44bbb4bbb4',
				'5c666c545c666c5b',
				'c66666cbc66666c4',
				'5cc6cc545cc66c54',
				'aa44444a4444aa44',
				'55b4b55555b4b555',
				'c55a5ccc555a55cc',
				'aaaaaaaaaaaaaaaa',
				'4bbbbb4a4bbbbb4a',
				'b5b55bbab5555bba',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var stoneWallTopRight = Pixel([
				'5555555555555555',
				'66c5c66666cbc655',
				'dd656ddddd6565c5',
				'6d656dd6dd655555',
				'66cbc666666b66c5',
				'bb44bb44bbb6dd65',
				'5c666c545446dd65',
				'c66666cb44466d65',
				'5cc6cc54c5b6dd65',
				'aa44444c6cb6dd65',
				'55b4b44c66bc66c5',
				'c55aa446664bb5b5',
				'aaaa5ba666bc66c5',
				'4bba55ac6cb6dd65',
				'ba4ac545c5b6dd65',
				'aaaac5444b46dd65'
			], colors, 2);
			var stoneWallRight = Pixel([
				'ab4ac5a5c5b66d65',
				'a5ba55ac6cb6dd65',
				'abba5b4c664c66c5',
				'a5baa446664b5555',
				'a5ba5b4c66bc66c5',
				'abbac54c6cb6dd65',
				'ab4ac545c546dd65',
				'aaaac5a4b4466d65',
				'ab4a5545c5b6dd65',
				'a5ba554c6cb6dd65',
				'a5ba5b4c66bc66c5',
				'a5baa446664bb5b5',
				'a5ba5ba666bc66c5',
				'abba55ac6cb6dd65',
				'ab4ac545c5b6dd65',
				'aaaac5444b46dd65'
			], colors, 2);
			var stoneWallBottomRight = Pixel([
				'ab4ac5a5c5b66d65',
				'aaba55ac6cb6dd65',
				'a4ba5b4c664c66c5',
				'aaaaa446664b5555',
				'cc55ab4c66bc66c5',
				'555b444c6cb6dd65',
				'44aa4445c546dd65',
				'45c66cc4b4466d65',
				'4c66666c45b6dd65',
				'b5c666c544b6dd65',
				'4bbb4bbb44b666c5',
				'666cbc66666b55b5',
				'ddd6b6dd6dd656c5',
				'ddd656ddddd65565',
				'666cbc66666c5c55',
				'5555555555555555'
			], colors, 2);
			var stoneWallBottom = Pixel([
				'aaaaaaaaaaaaaaaa',
				'abb5555babb55b5b',
				'a4bbbbb4a4bbbbb4',
				'aaaaaaaaaaaaaaaa',
				'cc55a555ccc5a55c',
				'555b4b55555b4b55',
				'44aa4444a44444aa',
				'45c66cc545cc6cc5',
				'4c66666cbc66666c',
				'b5c666c545c666c5',
				'4bbb4bbb44bb44bb',
				'666cbc66666cbc66',
				'ddd6b6dd6dd656d6',
				'ddd656ddddd656dd',
				'666cbc66666c5c66',
				'5555555555555555'
			], colors, 2);
			var stoneWallBottomLeft = Pixel([
				'56dd64b4445caaaa',
				'56dd6b5c545ca4ab',
				'56dd6bc6ca55abb4',
				'5c66cb666ab5aaaa',
				'5b5bb466644aa55c',
				'5c66cb66c44b4b55',
				'56dd6bc6c44444aa',
				'56dd6b5c45cc6cc5',
				'56d66444bc66666c',
				'56dd644545c666c5',
				'56dd6bbb44bb44bb',
				'5c66b666666cbc66',
				'555556dd6dd656d6',
				'5c5656ddddd656dd',
				'556cbc66666c5c66',
				'5555555555555555'
			], colors, 2);
			var stoneWallLeft = Pixel([
				'56dd64b4445caaaa',
				'56dd6b5c545ca4ba',
				'56dd6bc6ca55abba',
				'5c66cb666ab5ab5a',
				'5b5bb466644aab5a',
				'5c66cb66c4b5ab5a',
				'56dd6bc6c455ab5a',
				'56dd6b5c5455a4ba',
				'56d6644b4a5caaaa',
				'56dd645c545ca4ba',
				'56dd6bc6c45cabba',
				'5c66cb66c4b5ab5a',
				'5555b466644aab5a',
				'5c66c466c4b5abba',
				'56dd6bc6ca55ab5a',
				'56d66b5c5a5ca4ba'
			], colors, 2);
			var stoneWallTopLeft = Pixel([
				'5555555555555555',
				'55c5c66666cbc666',
				'56556ddddd656ddd',
				'5c656dd6dd6b6ddd',
				'5b55b66666cbc666',
				'5c666b44bbb4bbb4',
				'56dd6b445c666c5b',
				'56dd6b54c66666c4',
				'56d6644b4cc66c54',
				'56dd645c5444aa44',
				'56dd6bc6c444b555',
				'5c66cb66c4ba55cc',
				'5555b466644aaaaa',
				'5c66c466c4b5ab4a',
				'56dd6bc6ca55abaa',
				'56d66b5c5a5ca4ba'
			], colors, 2);
			var stoneWallBottomRightInterior = Pixel([
				'56dd64b4445caaaa',
				'67dd6b5c545ca4ba',
				'dd7d6bc6ca55abba',
				'6dd7db666ab5ab5a',
				'66cd7466644aab5a',
				'bb444d66c4b5ab5a',
				'5c6666d6c455ab5a',
				'c666666d5455a4ba',
				'5cc6cc546a5caaaa',
				'aa44444a4c5ca4ba',
				'55b4b55555ccabba',
				'c55a5ccc555cab5a',
				'aaaaaaaaaaaa5b5a',
				'4bbbbb4a4bbbb55a',
				'b5b55bbab5555b5a',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var stoneWallTopLeftInterior = Pixel([
				'aaaaaaaaaaaaaaaa',
				'a5b5555babb55b5b',
				'a55bbbb4a4bbbbb4',
				'a5b5aaaaaaaaaaaa',
				'a5bac555ccc5a55c',
				'abbacc55555b4b55',
				'ab4ac5c4a44444aa',
				'aaaac5a645cc6cc5',
				'ab4a5545d666666c',
				'a5ba554c6d6666c5',
				'a5ba5b4c66d444bb',
				'a5baa4466647dc66',
				'a5ba5ba666bd7dd6',
				'abba55ac6cb6d7dd',
				'ab4ac545c5b6dd76',
				'aaaac5444b46dd65'
			], colors, 2);
			var stoneWallBottomLeftInterior = Pixel([
				'ab4ac5a5c5b66d65',
				'a5ba55ac6cb6dd76',
				'abba5b4c664cd7dd',
				'a5baa446664d7ddd',
				'a5ba5b4c6647d666',
				'abbac54c66d4bbb4',
				'ab4ac5456d666c5b',
				'aaaac5a4d66666c4',
				'ab4a55465cc66c54',
				'a5ba55ca4444aa44',
				'a5ba5c5555b4b555',
				'a5bacccc555a55cc',
				'a5b5aaaaaaaaaaaa',
				'ab5bbb4a4bbbbb4a',
				'a5555bbab5555bba',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var stoneWallTopRightInterior = Pixel([
				'aaaaaaaaaaaaaaaa',
				'abb5555babb5555a',
				'a4bbbbb4a4bbb5ba',
				'aaaaaaaaaaaa5b5a',
				'cc55a555ccccab5a',
				'555b4b5555c5ab5a',
				'44aa4444ac55ab5a',
				'45c66cc56455a4ba',
				'4c66666d4a5caaaa',
				'b5c666d6545ca4ba',
				'4bbb4d66c45cabba',
				'666d7466c4b5ab5a',
				'ddd7d466644aab5a',
				'dd7dc466c4b5abba',
				'67dd6bc6ca55ab5a',
				'56d66b5c5a5ca4ba'
			], colors, 2);

			var stoneWallGreenTop = Pixel([
				'tttttttttttttttt',
				'vvutuvvvvvusuvvv',
				'wwvtvwwwwwvtvwww',
				'vwvtvwwvwwvsvwww',
				'vvusuvvvvvusuvvv',
				'ssrrssrrsssrsssr',
				'tuvvvutrtuvvvuts',
				'uvvvvvusuvvvvvur',
				'tuuvuutrtuuvvutr',
				'qqrrrrrqrrrrqqrr',
				'ttsrstttttsrsttt',
				'uttqtuuutttqttuu',
				'qqqqqqqqqqqqqqqq',
				'rsssssrqrsssssrq',
				'ststtssqsttttssq',
				'qqqqqqqqqqqqqqqq'
			], colors, 2);
			var stoneWallGreenTopRight = Pixel([
				'tttttttttttttttt',
				'vvutuvvvvvusuvtt',
				'wwvtvwwwwwvtvtut',
				'vwvtvwwvwwvttttt',
				'vvusuvvvvvvsvvut',
				'ssrrssrrsssvwwvt',
				'tuvvvutrtrrvwwvt',
				'uvvvvvusrrrvvwvt',
				'tuuvuutrutsvwwvt',
				'qqrrrrruvusvwwvt',
				'ttsrsrruvvsuvvut',
				'uttqqrrvvvrsstst',
				'qqqqtsqvvvsuvvut',
				'rssqttquvusvwwvt',
				'sqrqutrtutsvwwvt',
				'qqqqutrrrsrvwwvt'
			], colors, 2);
			var stoneWallGreenRight = Pixel([
				'qsrqutqtutsvvwvt',
				'qtsqttquvusvwwvt',
				'qssqtsruvvruvvut',
				'qtsqqrrvvvrstttt',
				'qtsqtsruvvsuvvut',
				'qssqutruvusvwwvt',
				'qsrqutrtutrvwwvt',
				'qqqqutqrsrrvvwvt',
				'qsrqttrtutsvwwvt',
				'qtsqttruvusvwwvt',
				'qtsqtsruvvsuvvut',
				'qtsqqrrvvvrsstst',
				'qtsqtsqvvvsuvvut',
				'qssqttquvusvwwvt',
				'qsrqutrtutsvwwvt',
				'qqqqutrrrsrvwwvt'
			], colors, 2);
			var stoneWallGreenBottomRight = Pixel([
				'qsrqutqtutsvvwvt',
				'qqsqttquvusvwwvt',
				'qrsqtsruvvruvvut',
				'qqqqqrrvvvrstttt',
				'uuttqsruvvsuvvut',
				'tttsrrruvusvwwvt',
				'rrqqrrrtutrvwwvt',
				'rtuvvuursrrvvwvt',
				'ruvvvvvurtsvwwvt',
				'stuvvvutrrsvwwvt',
				'rsssrsssrrsvvvut',
				'vvvusuvvvvvsttst',
				'wwwvsvwwvwwvtvut',
				'wwwvtvwwwwwvttvt',
				'vvvusuvvvvvututt',
				'tttttttttttttttt'
			], colors, 2);
			var stoneWallGreenBottom = Pixel([
				'qqqqqqqqqqqqqqqq',
				'qssttttsqssttsts',
				'qrsssssrqrsssssr',
				'qqqqqqqqqqqqqqqq',
				'uuttqtttuuutqttu',
				'tttsrstttttsrstt',
				'rrqqrrrrqrrrrrqq',
				'rtuvvuutrtuuvuut',
				'ruvvvvvusuvvvvvu',
				'stuvvvutrtuvvvut',
				'rsssrsssrrssrrss',
				'vvvusuvvvvvusuvv',
				'wwwvsvwwvwwvtvwv',
				'wwwvtvwwwwwvtvww',
				'vvvusuvvvvvutuvv',
				'tttttttttttttttt'
			], colors, 2);
			var stoneWallGreenBottomLeft = Pixel([
				'tvwwvrsrrrtuqqqq',
				'tvwwvstutrtuqrqs',
				'tvwwvsuvuqttqssr',
				'tuvvusvvvqstqqqq',
				'tstssrvvvrrqqttu',
				'tuvvusvvurrsrstt',
				'tvwwvsuvurrrrrqq',
				'tvwwvsturtuuvuut',
				'tvwvvrrrsuvvvvvu',
				'tvwwvrrtrtuvvvut',
				'tvwwvsssrrssrrss',
				'tuvvsvvvvvvusuvv',
				'tttttvwwvwwvtvwv',
				'tutvtvwwwwwvtvww',
				'ttvusuvvvvvutuvv',
				'tttttttttttttttt'
			], colors, 2);
			var stoneWallGreenLeft = Pixel([
				'tvwwvrsrrrtuqqqq',
				'tvwwvstutrtuqrsq',
				'tvwwvsuvuqttqssq',
				'tuvvusvvvqstqstq',
				'tstssrvvvrrqqstq',
				'tuvvusvvurstqstq',
				'tvwwvsuvurttqstq',
				'tvwwvstutrttqrsq',
				'tvwvvrrsrqtuqqqq',
				'tvwwvrtutrtuqrsq',
				'tvwwvsuvurtuqssq',
				'tuvvusvvurstqstq',
				'ttttsrvvvrrqqstq',
				'tuvvurvvurstqssq',
				'tvwwvsuvuqttqstq',
				'tvwvvstutqtuqrsq'
			], colors, 2);
			var stoneWallGreenTopLeft = Pixel([
				'tttttttttttttttt',
				'ttutuvvvvvusuvvv',
				'tvttvwwwwwvtvwww',
				'tuvtvwwvwwvsvwww',
				'tsttsvvvvvusuvvv',
				'tuvvvsrrsssrsssr',
				'tvwwvsrrtuvvvuts',
				'tvwwvstruvvvvvur',
				'tvwvvrrsruuvvutr',
				'tvwwvrtutrrrqqrr',
				'tvwwvsuvurrrsttt',
				'tuvvusvvursqttuu',
				'ttttsrvvvrrqqqqq',
				'tuvvurvvurstqsrq',
				'tvwwvsuvuqttqsqq',
				'tvwvvstutqtuqrsq'
			], colors, 2);
			var stoneWallGreenBottomRightInterior = Pixel([
				'tvwwvrsrrrtuqqqq',
				'vxwwvstutrtuqrsq',
				'wwxwvsuvuqttqssq',
				'vwwxwsvvvqstqstq',
				'vvuwxrvvvrrqqstq',
				'ssrrrwvvurstqstq',
				'tuvvvvwvurttqstq',
				'uvvvvvvwtrttqrsq',
				'tuuvuutrvqtuqqqq',
				'qqrrrrrqrutuqrsq',
				'ttsrstttttuuqssq',
				'uttqtuuutttuqstq',
				'qqqqqqqqqqqqtstq',
				'rsssssrqrssssttq',
				'ststtssqsttttstq',
				'qqqqqqqqqqqqqqqq'
			], colors, 2);
			var stoneWallGreenTopLeftInterior = Pixel([
				'qqqqqqqqqqqqqqqq',
				'qtsttttsqssttsts',
				'qttssssrqrsssssr',
				'qtstqqqqqqqqqqqq',
				'qtsqutttuuutqttu',
				'qssquutttttsrstt',
				'qsrquturqrrrrrqq',
				'qqqqutqvrtuuvuut',
				'qsrqttrtwvvvvvvu',
				'qtsqttruvwvvvvut',
				'qtsqtsruvvwrrrss',
				'qtsqqrrvvvrxwuvv',
				'qtsqtsqvvvswxwwv',
				'qssqttquvusvwxww',
				'qsrqutrtutsvwwxv',
				'qqqqutrrrsrvwwvt'
			], colors, 2);
			var stoneWallGreenBottomLeftInterior = Pixel([
				'qsrqutqtutsvvwvt',
				'qtsqttquvusvwwxv',
				'qssqtsruvvruwxww',
				'qtsqqrrvvvrwxwww',
				'qtsqtsruvvrxwvvv',
				'qssqutruvvwrsssr',
				'qsrqutrtvwvvvuts',
				'qqqqutqrwvvvvvur',
				'qsrqttrvtuuvvutr',
				'qtsqttuqrrrrqqrr',
				'qtsqtuttttsrsttt',
				'qtsquuuutttqttuu',
				'qtstqqqqqqqqqqqq',
				'qstsssrqrsssssrq',
				'qttttssqsttttssq',
				'qqqqqqqqqqqqqqqq'
			], colors, 2);
			var stoneWallGreenTopRightInterior = Pixel([
				'qqqqqqqqqqqqqqqq',
				'qssttttsqssttttq',
				'qrsssssrqrssstsq',
				'qqqqqqqqqqqqtstq',
				'uuttqtttuuuuqstq',
				'tttsrsttttutqstq',
				'rrqqrrrrquttqstq',
				'rtuvvuutvrttqrsq',
				'ruvvvvvwrqtuqqqq',
				'stuvvvwvtrtuqrsq',
				'rsssrwvvurtuqssq',
				'vvvwxrvvurstqstq',
				'wwwxwrvvvrrqqstq',
				'wwxwurvvurstqssq',
				'vxwwvsuvuqttqstq',
				'tvwvvstutqtuqrsq'
			], colors, 2);

			var stoneWallBlueTop = Pixel([
				'BBBBBBBBBBBBBBBB',
				'DDCBCDDDDDCACDDD',
				'EEDBDEEEEEDBDEEE',
				'DEDBDEEDEEDADEEE',
				'DDCACDDDDDCACDDD',
				'AAzzAAzzAAAzAAAz',
				'BCDDDCBzBCDDDCBA',
				'CDDDDDCACDDDDDCz',
				'BCCDCCBzBCCDDCBz',
				'yyzzzzzyzzzzyyzz',
				'BBAzABBBBBAzABBB',
				'CBByBCCCBBByBBCC',
				'yyyyyyyyyyyyyyyy',
				'zAAAAAzyzAAAAAzy',
				'ABABBAAyABBBBAAy',
				'yyyyyyyyyyyyyyyy'
			], colors, 2);
			var stoneWallBlueTopRight = Pixel([
				'BBBBBBBBBBBBBBBB',
				'DDCBCDDDDDCACDBB',
				'EEDBDEEEEEDBDBCB',
				'DEDBDEEDEEDBBBBB',
				'DDCACDDDDDDADDCB',
				'AAzzAAzzAAADEEDB',
				'BCDDDCBzBzzDEEDB',
				'CDDDDDCAzzzDDEDB',
				'BCCDCCBzCBADEEDB',
				'yyzzzzzCDCADEEDB',
				'BBAzAzzCDDACDDCB',
				'CBByyzzDDDzAABAB',
				'yyyyBAyDDDACDDCB',
				'zAAyBByCDCADEEDB',
				'AyzyCBzBCBADEEDB',
				'yyyyCBzzzAzDEEDB'
			], colors, 2);
			var stoneWallBlueRight = Pixel([
				'yAzyCByBCBADDEDB',
				'yBAyBByCDCADEEDB',
				'yAAyBAzCDDzCDDCB',
				'yBAyyzzDDDzABBBB',
				'yBAyBAzCDDACDDCB',
				'yAAyCBzCDCADEEDB',
				'yAzyCBzBCBzDEEDB',
				'yyyyCByzAzzDDEDB',
				'yAzyBBzBCBADEEDB',
				'yBAyBBzCDCADEEDB',
				'yBAyBAzCDDACDDCB',
				'yBAyyzzDDDzAABAB',
				'yBAyBAyDDDACDDCB',
				'yAAyBByCDCADEEDB',
				'yAzyCBzBCBADEEDB',
				'yyyyCBzzzAzDEEDB'
			], colors, 2);
			var stoneWallBlueBottomRight = Pixel([
				'yAzyCByBCBADDEDB',
				'yyAyBByCDCADEEDB',
				'yzAyBAzCDDzCDDCB',
				'yyyyyzzDDDzABBBB',
				'CCBByAzCDDACDDCB',
				'BBBAzzzCDCADEEDB',
				'zzyyzzzBCBzDEEDB',
				'zBCDDCCzAzzDDEDB',
				'zCDDDDDCzBADEEDB',
				'ABCDDDCBzzADEEDB',
				'zAAAzAAAzzADDDCB',
				'DDDCACDDDDDABBAB',
				'EEEDADEEDEEDBDCB',
				'EEEDBDEEEEEDBBDB',
				'DDDCACDDDDDCBCBB',
				'BBBBBBBBBBBBBBBB'
			], colors, 2);
			var stoneWallBlueBottom = Pixel([
				'yyyyyyyyyyyyyyyy',
				'yAABBBBAyAABBABA',
				'yzAAAAAzyzAAAAAz',
				'yyyyyyyyyyyyyyyy',
				'CCBByBBBCCCByBBC',
				'BBBAzABBBBBAzABB',
				'zzyyzzzzyzzzzzyy',
				'zBCDDCCBzBCCDCCB',
				'zCDDDDDCACDDDDDC',
				'ABCDDDCBzBCDDDCB',
				'zAAAzAAAzzAAzzAA',
				'DDDCACDDDDDCACDD',
				'EEEDADEEDEEDBDED',
				'EEEDBDEEEEEDBDEE',
				'DDDCACDDDDDCBCDD',
				'BBBBBBBBBBBBBBBB'
			], colors, 2);
			var stoneWallBlueBottomLeft = Pixel([
				'BDEEDzAzzzBCyyyy',
				'BDEEDABCBzBCyzyA',
				'BDEEDACDCyBByAAz',
				'BCDDCADDDyAByyyy',
				'BABAAzDDDzzyyBBC',
				'BCDDCADDCzzAzABB',
				'BDEEDACDCzzzzzyy',
				'BDEEDABCzBCCDCCB',
				'BDEDDzzzACDDDDDC',
				'BDEEDzzBzBCDDDCB',
				'BDEEDAAAzzAAzzAA',
				'BCDDADDDDDDCACDD',
				'BBBBBDEEDEEDBDED',
				'BCBDBDEEEEEDBDEE',
				'BBDCACDDDDDCBCDD',
				'BBBBBBBBBBBBBBBB'
			], colors, 2);
			var stoneWallBlueLeft = Pixel([
				'BDEEDzAzzzBCyyyy',
				'BDEEDABCBzBCyzAy',
				'BDEEDACDCyBByAAy',
				'BCDDCADDDyAByABy',
				'BABAAzDDDzzyyABy',
				'BCDDCADDCzAByABy',
				'BDEEDACDCzBByABy',
				'BDEEDABCBzBByzAy',
				'BDEDDzzAzyBCyyyy',
				'BDEEDzBCBzBCyzAy',
				'BDEEDACDCzBCyAAy',
				'BCDDCADDCzAByABy',
				'BBBBAzDDDzzyyABy',
				'BCDDCzDDCzAByAAy',
				'BDEEDACDCyBByABy',
				'BDEDDABCByBCyzAy'
			], colors, 2);
			var stoneWallBlueTopLeft = Pixel([
				'BBBBBBBBBBBBBBBB',
				'BBCBCDDDDDCACDDD',
				'BDBBDEEEEEDBDEEE',
				'BCDBDEEDEEDADEEE',
				'BABBADDDDDCACDDD',
				'BCDDDAzzAAAzAAAz',
				'BDEEDAzzBCDDDCBA',
				'BDEEDABzCDDDDDCz',
				'BDEDDzzAzCCDDCBz',
				'BDEEDzBCBzzzyyzz',
				'BDEEDACDCzzzABBB',
				'BCDDCADDCzAyBBCC',
				'BBBBAzDDDzzyyyyy',
				'BCDDCzDDCzAByAzy',
				'BDEEDACDCyBByAyy',
				'BDEDDABCByBCyzAy'
			], colors, 2);
			var stoneWallBlueBottomRightInterior = Pixel([
				'BDEEDzAzzzBCyyyy',
				'DFEEDABCBzBCyzAy',
				'EEFEDACDCyBByAAy',
				'DEEFEADDDyAByABy',
				'DDCEFzDDDzzyyABy',
				'AAzzzEDDCzAByABy',
				'BCDDDDEDCzBByABy',
				'CDDDDDDEBzBByzAy',
				'BCCDCCBzDyBCyyyy',
				'yyzzzzzyzCBCyzAy',
				'BBAzABBBBBCCyAAy',
				'CBByBCCCBBBCyABy',
				'yyyyyyyyyyyyBABy',
				'zAAAAAzyzAAAABBy',
				'ABABBAAyABBBBABy',
				'yyyyyyyyyyyyyyyy'
			], colors, 2);
			var stoneWallBlueTopLeftInterior = Pixel([
				'yyyyyyyyyyyyyyyy',
				'yBABBBBAyAABBABA',
				'yBBAAAAzyzAAAAAz',
				'yBAByyyyyyyyyyyy',
				'yBAyCBBBCCCByBBC',
				'yAAyCCBBBBBAzABB',
				'yAzyCBCzyzzzzzyy',
				'yyyyCByDzBCCDCCB',
				'yAzyBBzBEDDDDDDC',
				'yBAyBBzCDEDDDDCB',
				'yBAyBAzCDDEzzzAA',
				'yBAyyzzDDDzFECDD',
				'yBAyBAyDDDAEFEED',
				'yAAyBByCDCADEFEE',
				'yAzyCBzBCBADEEFD',
				'yyyyCBzzzAzDEEDB'
			], colors, 2);
			var stoneWallBlueBottomLeftInterior = Pixel([
				'yAzyCByBCBADDEDB',
				'yBAyBByCDCADEEFD',
				'yAAyBAzCDDzCEFEE',
				'yBAyyzzDDDzEFEEE',
				'yBAyBAzCDDzFEDDD',
				'yAAyCBzCDDEzAAAz',
				'yAzyCBzBDEDDDCBA',
				'yyyyCByzEDDDDDCz',
				'yAzyBBzDBCCDDCBz',
				'yBAyBBCyzzzzyyzz',
				'yBAyBCBBBBAzABBB',
				'yBAyCCCCBBByBBCC',
				'yBAByyyyyyyyyyyy',
				'yABAAAzyzAAAAAzy',
				'yBBBBAAyABBBBAAy',
				'yyyyyyyyyyyyyyyy'
			], colors, 2);
			var stoneWallBlueTopRightInterior = Pixel([
				'yyyyyyyyyyyyyyyy',
				'yAABBBBAyAABBBBy',
				'yzAAAAAzyzAAABAy',
				'yyyyyyyyyyyyBABy',
				'CCBByBBBCCCCyABy',
				'BBBAzABBBBCByABy',
				'zzyyzzzzyCBByABy',
				'zBCDDCCBDzBByzAy',
				'zCDDDDDEzyBCyyyy',
				'ABCDDDEDBzBCyzAy',
				'zAAAzEDDCzBCyAAy',
				'DDDEFzDDCzAByABy',
				'EEEFEzDDDzzyyABy',
				'EEFECzDDCzAByAAy',
				'DFEEDACDCyBByABy',
				'BDEDDABCByBCyzAy'
			], colors, 2);

			var caveWallTop = Pixel([
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaacccaaaaacccaa',
				'a55ccc55a55ccc55',
				'a555c555a555c555',
				'ab55555bab55555b',
				'abb555bbabb555bb',
				'aabbbbbaaabbbbba',
				'55aabaa555aabaa5',
				'55bbabb555bbabb5',
				'bbb4a4bbbbb4a4bb',
				'bb44a44bbb44a44b',
				'44aaaaa444aaaaa4',
				'4a4bbb4a4a4bbb4a',
				'a4444444a4444444',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var caveWallBottom = Pixel([
				'aaaaaaaaaaaaaaaa',
				'4444444a4444444a',
				'a4bbb4a4a4bbb4a4',
				'4aaaaa444aaaaa44',
				'b44a44bbb44a44bb',
				'bb4a4bbbbb4a4bbb',
				'5bbabb555bbabb55',
				'5aabaa555aabaa55',
				'abbbbbaaabbbbbaa',
				'bb555bbabb555bba',
				'b55555bab55555ba',
				'555c555a555c555a',
				'55ccc55a55ccc55a',
				'aacccaaaaacccaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var caveWallLeft = Pixel([
				'aaa55bba55bb4a4a',
				'aaa555bbabb4a44a',
				'aacc555bab44ab4a',
				'aaccc55bbaaaab4a',
				'aacc555bab44ab4a',
				'aaa555bbabb4a44a',
				'aaa55bba55bb4a4a',
				'aaaaaaaa55bb44aa',
				'aaa55bba55bb4a4a',
				'aaa555bbabb4a44a',
				'aacc555bab44ab4a',
				'aaccc55bbaaaab4a',
				'aacc555bab44ab4a',
				'aaa555bbabb4a44a',
				'aaa55bba55bb4a4a',
				'aaaaaaaa55bb44aa'
			], colors, 2);
			var caveWallRight = Pixel([
				'a4a4bb55abb55aaa',
				'a44a4bbabb555aaa',
				'a4ba44bab555ccaa',
				'a4baaaabb55cccaa',
				'a4ba44bab555ccaa',
				'a44a4bbabb555aaa',
				'a4a4bb55abb55aaa',
				'aa44bb55aaaaaaaa',
				'a4a4bb55abb55aaa',
				'a44a4bbabb555aaa',
				'a4ba44bab555ccaa',
				'a4baaaabb55cccaa',
				'a4ba44bab555ccaa',
				'a44a4bbabb555aaa',
				'a4a4bb55abb55aaa',
				'aa44bb55aaaaaaaa'
			], colors, 2);
			var caveWallTopLeft = Pixel([
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aacccaaaaacccaaa',
				'aaccc5aa55ccc55a',
				'aacc555a555c555a',
				'aaa555bab55555ba',
				'aaaa5bbabb555bba',
				'aaaaaaaaaabbbbaa',
				'aaa55bba55abaa55',
				'aaa555ba5bbabb55',
				'aacc555bab4a4bbb',
				'aaccc55bbaaa44bb',
				'aacc555bab44a444',
				'aaa555bbabb44a44',
				'aaa55bba55bb44aa',
				'aaaaaaaa55bb44aa'
			], colors, 2);
			var caveWallTopRight = Pixel([
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaacccaaaaacccaa',
				'a55ccc55aa5cccaa',
				'a555c555a555ccaa',
				'ab55555bab555aaa',
				'abb555bbabb5aaaa',
				'aabbbbaaaaaaaaaa',
				'55aaba55abb55aaa',
				'55bbabb5ab555aaa',
				'bbb4a4bab555ccaa',
				'bb44aaabb55cccaa',
				'444a44bab555ccaa',
				'44a44bbabb555aaa',
				'aa44bb55abb55aaa',
				'aa44bb55aaaaaaaa'
			], colors, 2);
			var caveWallBottomRight = Pixel([
				'aa44bb55aaaaaaaa',
				'aa44bb55abb55aaa',
				'44a44bbabb555aaa',
				'444a44bab555ccaa',
				'bb44aaabb55cccaa',
				'bbb4a4bab555ccaa',
				'55bbabb5ab555aaa',
				'55aaba55abb55aaa',
				'aabbbbaaaaaaaaaa',
				'abb555bbabb5aaaa',
				'ab55555bab555aaa',
				'a555c555a555ccaa',
				'a55ccc55aa5cccaa',
				'aaacccaaaaacccaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var caveWallBottomLeft = Pixel([
				'aaaaaaaa55bb44aa',
				'aaa55bba55bb44aa',
				'aaa555bbabb44a44',
				'aacc555bab44a444',
				'aaccc55bbaaa44bb',
				'aacc555bab4a4bbb',
				'aaa555ba5bbabb55',
				'aaa55bba55abaa55',
				'aaaaaaaaaabbbbaa',
				'aaaa5bbabb555bba',
				'aaa555bab55555ba',
				'aacc555a555c555a',
				'aaccc5aa55ccc55a',
				'aacccaaaaacccaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var caveWallInteriorBottomRight = Pixel([
				'aaaaaaaaaaaaaaaa',
				'a444444a4444444a',
				'a4bbb4a4a4bbb4a4',
				'a4baaa444aaaaa44',
				'a4ba44bbb44a44bb',
				'a4ba4bbbbb4a4bbb',
				'a44a4b555bbabb55',
				'a4a4bb555aabaa55',
				'aa44bb55abbbbbaa',
				'a4a4bb55ab555bba',
				'a44a4bbabb5555ba',
				'a4ba44bab55cc55a',
				'a4baaaabb55ccc5a',
				'a4ba44bab55cc5aa',
				'a44a4bbabb55c5aa',
				'a4a4bb55abb55aaa'
			], colors, 2);
			var caveWallInteriorBottomLeft = Pixel([
				'aaaaaaaaaaaaaaaa',
				'4444444a4444444a',
				'a4bbb4a4a4bbbb4a',
				'4aaaaa444aaaab4a',
				'b44a44bbb444ab4a',
				'bb4a4bbbbbb4a44a',
				'5bbabb5555bb4a4a',
				'5aabaa5555bb44aa',
				'abbbbbaa55bb4a4a',
				'bb555bbbabb4a44a',
				'b555555bab44ab4a',
				'55ccc55bbaaaab4a',
				'5cccc55bab44ab4a',
				'a55c55bbabb4a44a',
				'aaa55bba55bb4a4a',
				'aaaaaaaa55bb44aa'
			], colors, 2);
			var caveWallInteriorTopLeft = Pixel([
				'aaa55bba55bb4a4a',
				'aa5c55bbabb4a44a',
				'aa5cc55bab44ab4a',
				'a5ccc55bbaaaab4a',
				'a55cc55bab44ab4a',
				'ab5555bbabb4a44a',
				'abb555ba55bb4a4a',
				'aabbbbba55bb44aa',
				'55aabaa555bb4a4a',
				'55bbabb555b4a44a',
				'bbb4a4bbbbb4ab4a',
				'bb44a44bbb44ab4a',
				'44aaaaa444aaab4a',
				'4a4bbb4a4a4bbb4a',
				'a4444444a444444a',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var caveWallInteriorTopRight = Pixel([
				'aa44bb55aaaaaaaa',
				'a4a4bb55abb55aaa',
				'a44a4bbabb55c55a',
				'a4ba44bab55cccc5',
				'a4baaaabb55ccc55',
				'a4ba44bab555555b',
				'a44a4bbabbb555bb',
				'a4a4bb55aabbbbba',
				'aa44bb5555aabaa5',
				'a4a4bb5555bbabb5',
				'a44a4bbbbbb4a4bb',
				'a4ba444bbb44a44b',
				'a4baaaa444aaaaa4',
				'a4bbbb4a4a4bbb4a',
				'a4444444a4444444',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);
			var nothing = Pixel([
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa',
				'aaaaaaaaaaaaaaaa'
			], colors, 2);

			var fence1 = Pixel([
				'  aaaaa         ',
				' aQQQQQa        ',
				'aQTTTTTQa       ',
				'aQTRRRTQa       ',
				'aaQQQQQaaaaaaaaa',
				'aQaaaaaQaSSSTTSS',
				'aQQQQQQQaaaaaaaa',
				'aPQPQPQPaQQQQPQQ',
				'aPPQQPPPaPPOPPPP',
				'aOPPPQPOaOOOOOOO',
				'aOPPOPPOaaaaaaaa',
				'aOOPOOOOa       ',
				' aOOOOOa        ',
				'  aaaaa         ',
				'                ',
				'                '
			], colors, 2);
			var fence2 = Pixel([
				'  aaaaa         ',
				' aQQQQQa        ',
				'aQTTTTTQa       ',
				'aQTRRRTQa       ',
				'aaQQQQQaaaaaaaaa',
				'aQaaaaaQaSSSTTSS',
				'aQQQQQQQaaaaaaaa',
				'aPQaaaQPaQQQQPQQ',
				'aPaSSSaPaPPOPPPP',
				'aOaSTSaOaOOOOOOO',
				'aOaSTTaOaaaaaaaa',
				'aOaSTTaOa       ',
				' aaSTSaa        ',
				'  aSTSa         ',
				'  aSTTa         ',
				'  aSTSa         '
			], colors, 2);
			var fence3 = Pixel([
				'  aaaaa         ',
				' aQQQQQa        ',
				'aQTTTTTQa       ',
				'aQTRRRTQa       ',
				'aaQQQQQaa       ',
				'aQaaaaaQa       ',
				'aQQQQQQQa       ',
				'aPQPQPQPa       ',
				'aPPQQPPPa       ',
				'aOPPPQPOa       ',
				'aOPPOPPOa       ',
				'aOOPOOOOa       ',
				' aOOOOOa        ',
				'  aaaaa         ',
				'                ',
				'                '
			], colors, 2);
			var fence4 = Pixel([
				'  aaaaa         ',
				' aQQQQQa        ',
				'aQTTTTTQa       ',
				'aQTRRRTQa       ',
				'aaQQQQQaa       ',
				'aQaaaaaQa       ',
				'aQQQQQQQa       ',
				'aPQaaaQPa       ',
				'aPaSSTaPa       ',
				'aOaSTTaOa       ',
				'aOaSTSaOa       ',
				'aOaSTSaOa       ',
				' aaSTSaa        ',
				'  aTTSa         ',
				'  aSTTa         ',
				'  aSTSa         '
			], colors, 2);
			var fence1Grass = Composite([grass, fence1]);
			var fence2Grass = Composite([grass, fence2]);
			var fence3Grass = Composite([grass, fence3]);
			var fence4Grass = Composite([grass, fence4]);

			var houseWall = Pixel([
				'UUUUUUUUUUUUUUUU',
				'VVVVVVVVVVVVVVVV',
				'VVVVVVVVVVVVVVVV',
				'VVVVUUVVVVUUVVVV',
				'VVVVVVVVVVVVVVVV',
				'VVVVVVVVVVVVVVVV',
				'VVVVVVTTTTVVVVVV',
				'VVVVTTUUUUTTVVVV',
				'TTTTUUUUUUUUTTTT',
				'UUUUUUTSSTUUUUUU',
				'UUUUUUUTTUUUUUUU',
				'UUTTUUUUUUUUTTUU',
				'UUUUUUUUUUUUUUUU',
				'UUUUUUUUUUUUUUUU',
				'TTTTTTTTTTTTTTTT',
				'SSSSSSSSSSSSSSSS'
			], colors, 2);
			var window = Pixel([
				'                ',
				'                ',
				'      TTTT      ',
				'    TTVVVVTT    ',
				'   TVVUUUUVVT   ',
				'   TUUQQQQUUT   ',
				'  TUQQPOOPQQUT  ',
				'  TPOOQOOQOOPT  ',
				'  RPaaQaaQaaPR  ',
				'  RPQQPQQPQQPR  ',
				'   ROOQOOQOOR   ',
				'   RaaQaaQaaR   ',
				'    RRPPPPRR    ',
				'      RRRR      ',
				'                ',
				'                '
			], colors, 2);
			var houseWallWindow = Composite([houseWall, window]);
			var houseWallLeft = Pixel([
				'SUUUUUUUUUUUUUUU',
				'SSUUUUVVVVVVVVVV',
				'STSUUUVVUVVVVVVV',
				'STTSUUVVVVUUVVVV',
				'STTTSUVVVVVVVVVV',
				'SSTTTSVVVVVVVVVV',
				'SSSTTTTTTTVVVVVV',
				'STTTTTUUUUTTVVVV',
				'STTTSTUUUUUUTTTT',
				'RSTTTSTSSTUUUUUU',
				' RSTTTUTTUUUUUUU',
				'  RSTTUUUUUUTTUU',
				'   RSTUUUUUUUUUU',
				'    RSUUUUUUUUUU',
				'     RTTTTTTTTTT',
				'      SSSSSSSSSS'
			], colors, 2);
			var houseWallRight = Pixel([
				'UUUUUUUUUUUUUUUS',
				'VVVVVVVVVVUUUUSS',
				'VVVVVVVUVVUUUSTS',
				'VVVVUUVVVVUUSTTS',
				'VVVVVVVVVVUSTTTS',
				'VVVVVVVVVVSTTTSS',
				'VVVVVVTTTTTTTSSS',
				'VVVVTTUUUUTTTTTS',
				'TTTTUUUUUUTSTTTS',
				'UUUUUUTSSTSTTTSR',
				'UUUUUUUTTUTTTSR ',
				'UUTTUUUUUUTTSR  ',
				'UUUUUUUUUUTSR   ',
				'UUUUUUUUUUSR    ',
				'TTTTTTTTTTR     ',
				'SSSSSSSSSS      '
			], colors, 2);
			var houseWallLeftGrass = Composite([grass, houseWallLeft]);
			var houseWallRightGrass = Composite([grass, houseWallRight]);
			var roofBottom = Pixel([
				'CCCBCCCBCCCBCCCB',
				'BBBABBBABBBABBBA',
				'AAAzAAAzAAAzAAAz',
				'CCCyCCCyCCCyCCCy',
				'ACAyACAyACAyACAy',
				'ACAyACAyACAyACAy',
				'BCByBCByBCByBCBy',
				'yyyAyyyAyyyAyyyA',
				'AyABAyABAyABAyAB',
				'AyACAyACAyACAyAC',
				'ByBCByBCByBCByBC',
				'yAyyyAyyyAyyyAyy',
				'ABAyABAyABAyABAy',
				'ACAyACAyACAyACAy',
				'BCByBCByBCByBCBy',
				'yyyyyyyyyyyyyyyy'
			], colors, 2);
			var roof = Pixel([
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC'
			], colors, 2);
			var roofBottomLeft = Pixel([
				'yyyyzByABCCBCCCB',
				'yzByzByABBBABBBA',
				'yzByyyyzAAAzAAAz',
				'yzByzByyCCCyCCCy',
				'yyyyzyDyACAyACAy',
				'yzByyDDyACAyACAy',
				'yzByBCCyBCByBCBy',
				'yzyDyBByyyyAyyyA',
				'yyCCDyyyAyABAyAB',
				'yyBCCyDyAyACAyAC',
				'SyBByDDyByBCByBC',
				'SUyyBCDyyAyyyAyy',
				'SUUyBCCyABAyABAy',
				'SUUUyBCyACAyACAy',
				'SUUUUyByBCByBCBy',
				'SUUUUUyyyyyyyyyy'
			], colors, 2);
			var roofLeft = Pixel([
				'yyyyzByABCCCCCCC',
				'yzByzByABCCCCCCC',
				'yzByyyyzABCCCCCC',
				'yzByzByABCCCCCCC',
				'yyyyzByABCCCCCCC',
				'yzByzByABCCCCCCC',
				'yzByyyyzABCCCCCC',
				'yzByzByABCCCCCCC',
				'yyyyzByABCCCCCCC',
				'yzByzByABCCCCCCC',
				'yzByyyyzABCCCCCC',
				'yzByzByABCCCCCCC',
				'yyyyzByABCCCCCCC',
				'yzByzByABCCCCCCC',
				'yzByyyyzABCCCCCC',
				'yzByzByABCCCCCCC'
			], colors, 2);
			var roofRight = Pixel([
				'CCCCCCCBAyBzyBzy',
				'CCCCCCCBAyBzyyyy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCBAzyyyyBzy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCCBAyBzyyyy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCBAzyyyyBzy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCCBAyBzyyyy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCBAzyyyyBzy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCCBAyBzyyyy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCBAzyyyyBzy'
			], colors, 2);
			var roofBottomRight = Pixel([
				'BCCCBCCBAyBzyBzy',
				'ABBBABBBAyBzyyyy',
				'AAAAAAAAAyBzyBzy',
				'CCCyCCCyyyyyyBzy',
				'ACAyACAyBDyzyBzy',
				'ACAyACAyBDDyyyyy',
				'BCByBCByBCCByBzy',
				'yyyAyyyAyBByDyzy',
				'AyABAyAByyyDCCyy',
				'AyACAyACyDyCCByy',
				'ByBCByBCyDDyBByS',
				'yAyyyAyyBDCByyUS',
				'ABAyABAyBCCByUUS',
				'ACAyACAyBCByUUUS',
				'BCByBCByBByUUUUS',
				'yyyyyyyyyyUUUUUS'
			], colors, 2);
			var roofTop = Pixel([
				'yyyyyyyyyyyyyyyy',
				'zzzzzzzzzzzzzzzz',
				'AAAAAAAAAAAAAAAA',
				'BBBBBBBBBBBBBBBB',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC',
				'CCCCCCCCCCCCCCCC'
			], colors, 2);
			var roofTopRight = Pixel([
				'yyyyyyyyyy      ',
				'zzzzzzzzzyy     ',
				'AAAAAAAAAyBy    ',
				'BBBBBBBAzyyyy   ',
				'CCCCCCCBAyBzyy  ',
				'CCCCCCCBAyBzyyy ',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCBAzyyyyBzy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCCBAyBzyyyy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCBAzyyyyBzy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCCBAyBzyyyy',
				'CCCCCCCBAyBzyBzy',
				'CCCCCCBAzyyyyBzy'
			], colors, 2);
			var roofTopLeft = Pixel([
				'      yyyyyyyyyy',
				'     yyzzzzzzzzz',
				'    yyyzAAAAAAAA',
				'   yzByABBBBBBBB',
				'  yyzByABCCCCCCC',
				' yByzByABCCCCCCC',
				'yzByyyyzABCCCCCC',
				'yzByzByABCCCCCCC',
				'yyyyzByABCCCCCCC',
				'yzByzByABCCCCCCC',
				'yzByyyyzABCCCCCC',
				'yzByzByABCCCCCCC',
				'yyyyzByABCCCCCCC',
				'yzByzByABCCCCCCC',
				'yzByyyyzABCCCCCC',
				'yzByzByABCCCCCCC'
			], colors, 2);
			var roofTopRightGrass = Composite([grass, roofTopRight]);
			var roofTopLeftGrass = Composite([grass, roofTopLeft]);

			var chimney = Pixel([
				'                ',
				'                ',
				'                ',
				'     aaaaaa     ',
				'    aUUUUUUa    ',
				'   aUaaaaaaUa   ',
				'   aUaOOOOaUa   ',
				'   aSUaaaaUSa   ',
				'   aQSSSSSSQa   ',
				'   aQQQQQQQQa   ',
				'    aQQQQQQa    ',
				'     aaaaaa     ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var chimneyRoof = Composite([roof, chimney]);
			var door = Pixel([
				'  TTTTTTTTTTTT  ',
				' TUUUUUUUUUUUUT ',
				'TUTUTVVVVVVTUTUT',
				'TUUTSUUUUUUUTUUT',
				'TUVUSSSSSSSSUVUT',
				'TUVSSaaaaaaSSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUUSaaOOOOaaSUUT',
				'TTSSaPPPPPPaSSTT'
			], colors, 2);
			var houseWallDoor = Composite([houseWall, door]);
			var pathVertical = Pixel([
				'    UVVVVVUT    ',
				'   VVVUVVVUT    ',
				'   UVVUVVVUU    ',
				'   TVVVTVVUT    ',
				'   TVVVVVVVU    ',
				'    TVVVUVVUU   ',
				'     UVVVVVVT   ',
				'     TVVVTVVTU  ',
				'      TVVVVVVT  ',
				'      TVVVVUVT  ',
				'      UVUVVUVT  ',
				'     UVVVUVVVT  ',
				'     TVVVUVVVU  ',
				'    TVUVVUVVU   ',
				'    TVUTVVVU    ',
				'    TVVVVUVT    '
			], colors, 2);
			var pathHorizontal = Pixel([
				'                ',
				'                ',
				'                ',
				' VUTT           ',
				'UVVVVT       TTT',
				'VVVVVVUT   UTVVV',
				'VUUVVVVVTTUVVUUV',
				'VVVTVVVVVVVVVVTV',
				'VVVVVUVVVVUVVVVV',
				'VVVVVVVTVVVUUUVU',
				'UUUUVVVVVVVVVVVV',
				'TTUTUUVVVUUVVVUT',
				'     UTTVVVVVU  ',
				'       UTTTTU   ',
				'                ',
				'                '
			], colors, 2);
			var pathTopLeft = Pixel([
				'                ',
				'                ',
				'                ',
				'          TTTTT ',
				'        SUUUUUTT',
				'       TUVVVVUUU',
				'      TVVVVVVVVV',
				'      TVVVVVVUVV',
				'     TVVVTVVTVVU',
				'     UVVVVVVVVVV',
				'    TVVVUVVUUUUV',
				'   TVVVVVVVUTUTT',
				'   TVVVTVVUTT   ',
				'   UVVUVVVUU    ',
				'   VVVUVVVUT    ',
				'    UVVVVVUT    '
			], colors, 2);
			var pathTopRight = Pixel([
				'                ',
				'                ',
				'                ',
				' VUTT           ',
				'UVVVVT          ',
				'VVVVVVUT        ',
				'VUUVVVVVTT      ',
				'VVVTVVVVVVT     ',
				'VVVVVUVVVVUS    ',
				'VVVVVVVTVVVU    ',
				'UUUUVVVVVVVUT   ',
				'TTUTUUVVVVVUT   ',
				'   TTUVTVVVUT   ',
				'    UUVVUVUUT   ',
				'    TUVVVVUTT   ',
				'    TVVUVVUT    '
			], colors, 2);
			var pathBottomLeft = Pixel([
				'    TUVVUVVT    ',
				'   TTUVVVVUT    ',
				'   TUUVUVVUU    ',
				'   TUVVVTVUTT   ',
				'   TUVVVVVUUTUTT',
				'   TUVVVVVVVUUUU',
				'    UVVVTVVVVVVV',
				'    SUVVVVUVVVVV',
				'     TVVVVVVTVVV',
				'      TTVVVVVUUV',
				'        TUVVVVVV',
				'          TVVVVU',
				'           TTUV ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var pathBottomRight = Pixel([
				'    TVVUVVUT    ',
				'    TUVVVVUTT   ',
				'    UUVVUVUUT   ',
				'   TTUVTVVVUT   ',
				'TTUTUUVVVVVUT   ',
				'UUUUVVVVVVVUT   ',
				'VVVVVVVTVVVU    ',
				'VVVVVUVVVVUS    ',
				'VVVTVVVVVVT     ',
				'VUUVVVVVTT      ',
				'VVVVVVUT        ',
				'UVVVVT          ',
				' VUTT           ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var pathVerticalGrass = Composite([grass, pathVertical]);
			var pathHorizontalGrass = Composite([grass, pathHorizontal]);
			var pathTopLeftGrass = Composite([grass, pathTopLeft]);
			var pathTopRightGrass = Composite([grass, pathTopRight]);
			var pathBottomLeftGrass = Composite([grass, pathBottomLeft]);
			var pathBottomRightGrass = Composite([grass, pathBottomRight]);

			var woodFloor = Pixel([
				'QRRRRRQQQRRQQQRR',
				'QPPPQQQQPPQRPPQQ',
				'PPPPPPPPPPPPPPPP',
				'OOOOOOOOOOOOOOOO',
				'QQQRRRRQQQRQQRRQ',
				'PQQQQPPQQQQPPPPP',
				'PPPPPPPPPPPPPPPP',
				'OOOOOOOOOOOOOOOO',
				'RRQQQRRRRRQQQRRR',
				'QQQPQQQQQQPPPPQQ',
				'PPPPPPPPPPPPPPPP',
				'OOOOOOOOOOOOOOOO',
				'QRRQQRQQQRRRQQRQ',
				'PQQQPPPPPQQQQPPP',
				'PPPPPPPPPPPPPPPP',
				'OOOOOOOOOOOOOOOO'
			], colors, 2);
			var chairRight = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'  aa            ',
				' aRQa           ',
				' aQSa           ',
				' aQRa           ',
				' aSQa           ',
				' aRQa           ',
				' aRQaaaaaaaaa   ',
				' aaaaRRRRSSRRa  ',
				' aOOaSQQQRQQQSa ',
				' aPOaRSSRSSRRQa ',
				' aQOaRQRQQQQQRa ',
				' aQOaRSSSRRSSQa ',
				' aPOaRQQQQRQQSa ',
				' aPOaaaaaaaaaRa ',
				' aPPPPQQPPQQPaa ',
				' aPPOOOOOOOOPPa ',
				' aPOaaaaaaaaOPa ',
				' aPOa      aOPa ',
				' aOOa      aOOa ',
				'  aa        aa  '
			], colors, 2);
			var chairLeft = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'            aa  ',
				'           aQRa ',
				'           aSQa ',
				'           aRQa ',
				'           aQSa ',
				'           aQRa ',
				'   aaaaaaaaaQRa ',
				'  aRRSSRRRRaaaa ',
				' aSQQQRQQQSaOOa ',
				' aQRRSSRSSRaOPa ',
				' aRQQQQQRQRaOQa ',
				' aQSSRRSSSRaOQa ',
				' aSQQRQQQQRaOPa ',
				' aRaaaaaaaaaOPa ',
				' aaPQQPPQQPPPPa ',
				' aPPOOOOOOOOPPa ',
				' aPOaaaaaaaaOPa ',
				' aPOa      aOPa ',
				' aOOa      aOOa ',
				'  aa        aa  '
			], colors, 2);
			var chairRightFloor = Composite2(woodFloor, chairRight);
			var chairLeftFloor = Composite2(woodFloor, chairLeft);
			var table = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'   aaaaaaaaaa   ',
				' aaRQSRQSRQQRaa ',
				'aRSQRQQRQQQRRQRa',
				'aQQRQRRSSRRQQRQa',
				'aSRQRQRQQQQSRQRa',
				'aaaRQSSRSRQQRaaa',
				'aOPaaaaaaaaaaPOa',
				' aaPOPPOOOOPOaa ',
				'   aaaaaaaaaa   ',
				'     aOOOOa     ',
				'   aaaPOOPaaa   ',
				'  aQQQPPPPQQQa  ',
				'   aaQQQQQQaa   ',
				'     aaaaaa     '
			], colors, 2);
			var tableFloor = Composite2(woodFloor, table);

			var houseWallBottomIn = Pixel([
				'SSSSSSSSSSSSSSSS',
				'TTTTTTTTTTTTTTTT',
				'UUUUUUUUUUUUUUUU',
				'UUUUUUUUUUUUUUUU',
				'UUTTUUUUUUUUTTUU',
				'UUUUUUUTTUUUUUUU',
				'UUUUUUTSSTUUUUUU',
				'TTTTUUUUUUUUTTTT',
				'VVVVTTUUUUTTVVVV',
				'VVVVVVTTTTVVVVVV',
				'VVVVVVVVVVVVVVVV',
				'VVVVVVVVVVVVVVVV',
				'VVVVUUVVVVUUVVVV',
				'VVVVVVVVVVVVVVVV',
				'VVVVVVVVVVVVVVVV',
				'UUUUUUUUUUUUUUUU'
			], colors, 2);
			var windowDown = Pixel([
				'                ',
				'                ',
				'      RRRR      ',
				'    RRPPPPRR    ',
				'   RaaQaaQaaR   ',
				'   ROOQOOQOOR   ',
				'  RPQQPQQPQQPR  ',
				'  RPaaQaaQaaPR  ',
				'  TPOOQOOQOOPT  ',
				'  TUQQPOOPQQUT  ',
				'   TUUQQQQUUT   ',
				'   TVVUUUUVVT   ',
				'    TTVVVVTT    ',
				'      TTTT      ',
				'                ',
				'                '
			], colors, 2);
			var houseWindowDown = Composite([houseWallBottomIn, windowDown]);
			var houseWallRightIn = Pixel([
				'STUUUUUTVVVVVVVU',
				'STUUUUUTVVVVVVVU',
				'STUUTUUTVVVVVVVU',
				'STUUTUUTVVVVVVVU',
				'STUUUUUUTVVVUVVU',
				'STUUUUUUTVVVUVVU',
				'STUUUUTUUTVVVVVU',
				'STUUUTSUUTVVVVVU',
				'STUUUTSUUTVVVVVU',
				'STUUUUTUUTVVVVVU',
				'STUUUUUUTVVVUVVU',
				'STUUUUUUTVVVUVVU',
				'STUUTUUTVVVVVVVU',
				'STUUTUUTVVVVVVVU',
				'STUUUUUTVVVVVVVU',
				'STUUUUUTVVVVVVVU'
			], colors, 2);
			var houseWallLeftIn = Pixel([
				'UVVVVVVVTUUUUUTS',
				'UVVVVVVVTUUUUUTS',
				'UVVVVVVVTUUTUUTS',
				'UVVVVVVVTUUTUUTS',
				'UVVUVVVTUUUUUUTS',
				'UVVUVVVTUUUUUUTS',
				'UVVVVVTUUTUUUUTS',
				'UVVVVVTUUSTUUUTS',
				'UVVVVVTUUSTUUUTS',
				'UVVVVVTUUTUUUUTS',
				'UVVUVVVTUUUUUUTS',
				'UVVUVVVTUUUUUUTS',
				'UVVVVVVVTUUTUUTS',
				'UVVVVVVVTUUTUUTS',
				'UVVVVVVVTUUUUUTS',
				'UVVVVVVVTUUUUUTS'
			], colors, 2);
			var houseWallTopLeftIn = Pixel([
				'UUUUUUUUUUUUUUUU',
				'UUVVVVVVVVVVVVVV',
				'UVUVVVVVVVVVVVVV',
				'UVVUUUVVVVUUVVVV',
				'UVVUUVVVVVVVVVVV',
				'UVVUVUVVVVVVVVVV',
				'UVVVVVUTTTVVVVVV',
				'UVVVVVTTUUTTVVVV',
				'UVVVVVTUTUUUTTTT',
				'UVVVVVTUUTUUUUUU',
				'UVVUVVVTUUTUUUUU',
				'UVVUVVVTUUUTTTUU',
				'UVVVVVVVTUUTTUUU',
				'UVVVVVVVTUUTUTUU',
				'UVVVVVVVTUUUUUST',
				'UVVVVVVVTUUUUUTS'
			], colors, 2);
			var houseWallTopRightIn = Pixel([
				'UUUUUUUUUUUUUUUU',
				'VVVVVVVVVVVVVVUU',
				'VVVVVVVVVVVVVUVU',
				'VVVVUUVVVVUUUVVU',
				'VVVVVVVVVVVUUVVU',
				'VVVVVVVVVVUVUVVU',
				'VVVVVVTTTUVVVVVU',
				'VVVVTTUUTTVVVVVU',
				'TTTTUUUTUTVVVVVU',
				'UUUUUUTUUTVVVVVU',
				'UUUUUTUUTVVVUVVU',
				'UUTTTUUUTVVVUVVU',
				'UUUTTUUTVVVVVVVU',
				'UUTUTUUTVVVVVVVU',
				'TSUUUUUTVVVVVVVU',
				'STUUUUUTVVVVVVVU'
			], colors, 2);
			var houseWallBottomLeftIn = Pixel([
				'UVVVVVVVTUUUUUTS',
				'UVVVVVVVTUUUUUST',
				'UVVVVVVVTUUTUTUU',
				'UVVVVVVVTUUTTUUU',
				'UVVUVVVTUUUTTTUU',
				'UVVUVVVTUUTUUUUU',
				'UVVVVVTUUTUUUUUU',
				'UVVVVVTUTUUUTTTT',
				'UVVVVVTTUUTTVVVV',
				'UVVVVVUTTTVVVVVV',
				'UVVUVUVVVVVVVVVV',
				'UVVUUVVVVVVVVVVV',
				'UVVUUUVVVVUUVVVV',
				'UVUVVVVVVVVVVVVV',
				'UUVVVVVVVVVVVVVV',
				'UUUUUUUUUUUUUUUU'
			], colors, 2);
			var houseWallBottomRightIn = Pixel([
				'STUUUUUTVVVVVVVU',
				'TSUUUUUTVVVVVVVU',
				'UUTUTUUTVVVVVVVU',
				'UUUTTUUTVVVVVVVU',
				'UUTTTUUUTVVVUVVU',
				'UUUUUTUUTVVVUVVU',
				'UUUUUUTUUTVVVVVU',
				'TTTTUUUTUTVVVVVU',
				'VVVVTTUUTTVVVVVU',
				'VVVVVVTTTUVVVVVU',
				'VVVVVVVVVVUVUVVU',
				'VVVVVVVVVVVUUVVU',
				'VVVVUUVVVVUUUVVU',
				'VVVVVVVVVVVVVUVU',
				'VVVVVVVVVVVVVVUU',
				'UUUUUUUUUUUUUUUU'
			], colors, 2);
			var doorDown = Pixel([
				'TTSSaPPPPPPaSSTT',
				'TUUSaaOOOOaaSUUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSaaaaaaaaSVUT',
				'TUVSSaaaaaaSSVUT',
				'TUVUSSSSSSSSUVUT',
				'TUUTSUUUUUUUTUUT',
				'TUTUTVVVVVVTUTUT',
				' TUUUUUUUUUUUUT ',
				'  TTTTTTTTTTTT  '
			], colors, 2);
			var houseWallDoorDown = Composite([houseWallBottomIn, doorDown]);
			var stairs = Pixel([
				' aaaaaaaaaaaaaa ',
				'ac666c6666c666ca',
				'a6c6c5cccc5c6c6a',
				'a665aaaaaaaa566a',
				'a6ca44444444ac6a',
				'a6ca4aaaaaa4ac6a',
				'a6ca4aaaaaa4a5ca',
				'ac5a4aaaaaa4ac6a',
				'a6ca4aa44aa4ac6a',
				'a6ca4a5555a4ac6a',
				'a6ca4abbbba4ac6a',
				'a6ca46666664a5ca',
				'ac5a4cccccc4ac6a',
				'a6ca77777777ac6a',
				'a6caddddddddac6a',
				' aaaaaaaaaaaaaa '
			], colors, 2);
			var blueStairs = Pixel([
				' yyyyyyyyyyyyyy ',
				'yBCCCBCCCCBCCCBy',
				'yCBCBABBBBABCBCy',
				'yCCAzzzzzzzzACCy',
				'yCBzyyyyyyyyzBCy',
				'yCBzyaaaaaayzBCy',
				'yCBzyaaaaaayzABy',
				'yBAzyaaaaaayzBCy',
				'yCBzyaayyaayzBCy',
				'yCBzyaAAAAayzBCy',
				'yCBzyazzzzayzBCy',
				'yCBzyBBBBBByzABy',
				'yBAzyAAAAAAyzBCy',
				'yCBzCCCCCCCCzBCy',
				'yCBzBBBBBBBBzBCy',
				' yyyyyyyyyyyyyy '
			], colors, 2);


			var stairsGrass = Composite([grass, stairs]);
			var stoneFloor = Pixel([
				'dddc6ddd6ddc5ddd',
				'dddc6dd6c6d6cdd6',
				'556dcdd66c6dc665',
				'6656dddd6c656cc6',
				'd65c666dd65666dd',
				'd6c6c556665ddddd',
				'66c6d66c556ddddd',
				'5c6c6dd666cddd66',
				'666c666ddd6dd655',
				'5dd6556dddc66c66',
				'cdd66656dd6c56d6',
				'ddddd656ddd66ddc',
				'6ddddd6c66dddd65',
				'5c6d66d65c566656',
				'66c6cc66666c656d',
				'dd6c666dddd656dd'
			], colors, 2);
			var stairsStoneWall = Composite([stoneWallTop, stairs]);
			var blueStairsWall = Composite([stoneWallBlueTop, blueStairs]);
			var stump = Pixel([
				'                ',
				'     aaaaaa     ',
				'    aTTTTTTa    ',
				'   aTVVVVVVTa   ',
				'   aVVTTUUVVa   ',
				'   aaVVVVTVaa   ',
				'   aQaaaaaaQPa  ',
				'  aQQPQQPQPPQa  ',
				' aQPOPQPQPQaPQa ',
				'aQPOaQPPOPQaOOOa',
				'qaaaaQPaOPPQaaaq',
				'qqqaQPOaaOPPaqqq',
				'  qaPOaqqaaaqq  ',
				'  qqaaqqqqqqq   ',
				'   qqqq   qq    ',
				'                '
			], colors, 2);
			var stumpDirtShadow = Pixel([
				'                ',
				'     aaaaaa     ',
				'    aTTTTTTa    ',
				'   aTVVVVVVTa   ',
				'   aVVTTUUVVa   ',
				'   aaVVVVTVaa   ',
				'   aQaaaaaaQPa  ',
				'  aQQPQQPQPPQa  ',
				' aQPOPQPQPQaPQa ',
				'aQPOaQPPOPQaOOOa',
				'OaaaaQPaOPPQaaaO',
				'OOOaQPOaaOPPaOOO',
				'  OaPOaOOaaaOO  ',
				'  OOaaOOOOOOO   ',
				'   OOOO   OO    ',
				'                '
			], colors, 2);
			var rockStoneFloor = Composite([stoneFloor, rockShadowStone]);

			var stumpGrass = Composite([grass, stump]);
			var stumpDirt = Composite([dirt, stumpDirtShadow]);
			var lilyPad = Pixel([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'     rrrrrrr    ',
				'   rsssssssssr  ',
				'  qstttttttttsq ',
				'  qsstttstttssq ',
				' AAqqsssssssqqAA',
				'  AAAqqqqqqqAAA ',
				'    AAAAAAAAA   ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var lilyPadWater = Composite([water, lilyPad]);
			var lily = Pixel([
				'                ',
				'                ',
				'        X       ',
				'       XYX      ',
				'     XWYXYWX    ',
				'    XYWXYXWYW   ',
				'    WYXYYYXYW   ',
				'     WWYWYWW    ',
				'      WWWWW     ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                '
			], colors, 2);
			var waterLily = Composite([water, lilyPad, lily]);

			var blueFloorTile = Pixel([
				'zyyABBCCBAzzDDDz',
				'AAAzABCAAzADEEAy',
				'DEDAyyzyyADECCzA',
				'EDCzBDDByACDCAyD',
				'DCByDEEDBzACBAzC',
				'CBAyADEEDyAAAzAB',
				'AAyAzCDDCBzyzDyA',
				'yyADzACCBBAyDEDy',
				'zADEAyABBBBzDEED',
				'zADECAzABBBzCDEC',
				'zACDCAyABBAyBCDC',
				'AzACBBByzzyABCCB',
				'BAyAyyzABBAzBBBB',
				'BBAyAADDEEDAzABB',
				'BAzACDEEDDCByAAB',
				'AAyABCDDCCBAyyzA'
			], colors, 2);
			var stoneFloorTile = Pixel([
				'ddcbb44444bbc6dd',
				'cc4bbb6666bb4ccc',
				'44bbb6d77d6bb444',
				'666bbc6dd6cbbbb6',
				'7d66b4c66c4bbb6d',
				'd7d66b4cc4b66b46',
				'677dd6b44b6dd6bc',
				'c6d766bbb6d776b4',
				'4c66ccbbb6d77d6b',
				'b4cc44bbbcc6d76c',
				'bb44b666b44c6d6c',
				'bbbb6dddd6b4ccc4',
				'66bb6d77dd6b444b',
				'dd6b6d777d6bb666',
				'7d6bc6ddd6cb6d77',
				'77db4ccccc4b6d77'
			], colors, 2);
			var greenFloorTile = Pixel([
				'ssssssssssssssss',
				'sxwwwwwxsxwwwwwx',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'sxuuuuuxsxuuuuux',
				'ssssssssssssssss',
				'sxwwwwwxsxwwwwwx',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'svxxxxxvsvxxxxxv',
				'sxuuuuuxsxuuuuux'
			], colors, 2);

			var tombstone1 = Pixel([
				'                ',
				'    aaaaaaaa    ',
				'   a77777777a   ',
				'   a77777777a   ',
				'   a76666667a   ',
				'   a66666666a   ',
				'   a6cccc6c6a   ',
				'   a66666666a   ',
				'   a6c6cccc6a   ',
				'   a66666666a   ',
				'   a6cccc6c6a   ',
				'  a5666666665a  ',
				' a455555555554a ',
				' qaa44444444aaq ',
				'  qqaaaaaaaaqq  ',
				'    qqqqqqqq    '
			], colors, 2);
			var tombstone1Grass = Composite([grass, tombstone1]);
			var tombstone2 = Pixel([
				'     aaaaaa     ',
				'     a7777a     ',
				'     a7777a     ',
				'  aaaa6666aaaa  ',
				'  a7776666777a  ',
				'  a777c666777a  ',
				'  a6666c66666a  ',
				'  a6666c666c6a  ',
				'  accc6666ccca  ',
				'   aaac66caaa   ',
				'     ac66ca     ',
				'     ac66ca     ',
				'   qqa5cc5aqq   ',
				'  qqabb55bbaqq  ',
				'  qqqaaaaaaqqq  ',
				'   qqqqqqqqqq   '
			], colors, 2);
			var tombstone2Grass = Composite([grass, tombstone2]);
		}
		var blocks = {
			' ': {
				name: 'nothing',
				type: 'solid',
				image: nothing
			},
			'!': {
				name: 'grass',
				type: 'walkable',
				image: grass
			},
			'#': {
				name: 'grass top dirt',
				type: 'walkable',
				image: grassTopDirt
			},
			'$': {
				name: 'grass bottom dirt',
				type: 'walkable',
				image: grassBottomDirt
			},
			'%': {
				name: 'grass left dirt',
				type: 'walkable',
				image: grassLeftDirt
			},
			'&': {
				name: 'grass right dirt',
				type: 'walkable',
				image: grassRightDirt
			},
			'(': {
				name: 'grass top left interior',
				type: 'walkable',
				image: grassTopLeftInteriorDirt
			},
			')': {
				name: 'grass top right interior',
				type: 'walkable',
				image: grassTopRightInteriorDirt
			},
			'*': {
				name: 'grass bottom left interior',
				type: 'walkable',
				image: grassBottomLeftInteriorDirt
			},
			'+': {
				name: 'grass bottom right interior',
				type: 'walkable',
				image: grassBottomRightInteriorDirt
			},
			',': {
				name: 'grass top left',
				type: 'walkable',
				image: grassTopLeftDirt
			},
			'-': {
				name: 'grass top right',
				type: 'walkable',
				image: grassTopRightDirt
			},
			'.': {
				name: 'grass bottom left',
				type: 'walkable',
				image: grassBottomLeftDirt
			},
			'/': {
				name: 'grass bottom right',
				type: 'walkable',
				image: grassBottomRightDirt
			},
			'0': {
				name: 'dirt',
				type: 'walkable',
				image: dirt
			},
			'1': {
				name: 'tree grass',
				type: 'solid',
				image: treeGrass,
				large: true
			},
			'2': {
				name: 'rock dirt',
				type: 'solid',
				image: rockDirt
			},
			'3': {
				name: 'rock grass',
				type: 'solid',
				image: rockGrass
			},
			'4': {
				name: 'fence 1',
				type: 'solid',
				image: fence1Grass
			},
			'5': {
				name: 'fence 2',
				type: 'solid',
				image: fence2Grass
			},
			'6': {
				name: 'fence 3',
				type: 'solid',
				image: fence3Grass
			},
			'7': {
				name: 'fence 4',
				type: 'solid',
				image: fence4Grass
			},
			'8': {
				name: 'yellow flower',
				type: 'walkable',
				image: yellowFlowerGrass
			},
			'9': {
				name: 'red flower',
				type: 'walkable',
				image: redFlowerGrass
			},
			':': {
				name: 'house wall',
				type: 'solid',
				image: houseWall
			},
			';': {
				name: 'house wall',
				type: 'solid',
				image: houseWallWindow
			},
			'<': {
				name: 'house wall left',
				type: 'solid',
				image: houseWallLeftGrass
			},
			'=': {
				name: 'house wall right',
				type: 'solid',
				image: houseWallRightGrass
			},
			'>': {
				name: 'roof',
				type: 'solid',
				image: roof
			},
			'?': {
				name: 'roof bottom',
				type: 'solid',
				image: roofBottom
			},
			'@': {
				name: 'roof bottom left',
				type: 'solid',
				image: roofBottomLeft
			},
			'A': {
				name: 'roof left',
				type: 'solid',
				image: roofLeft
			},
			'B': {
				name: 'roof right',
				type: 'solid',
				image: roofRight
			},
			'C': {
				name: 'roof bottom right',
				type: 'solid',
				image: roofBottomRight
			},
			'D': {
				name: 'roof top left',
				type: 'solid',
				image: roofTopLeftGrass
			},
			'E': {
				name: 'roof top',
				type: 'solid',
				image: roofTop
			},
			'F': {
				name: 'roof top right',
				type: 'solid',
				image: roofTopRightGrass
			},
			'G': {
				name: 'chimney',
				type: 'solid',
				image: chimneyRoof
			},
			'H': {
				name: 'door up',
				type: 'up',
				image: houseWallDoor
			},
			'I': {
				name: 'path vertical',
				type: 'walkable',
				image: pathVerticalGrass
			},
			'J': {
				name: 'path horizontal',
				type: 'walkable',
				image: pathHorizontalGrass
			},
			'K': {
				name: 'path top left',
				type: 'walkable',
				image: pathTopLeftGrass
			},
			'L': {
				name: 'path top right',
				type: 'walkable',
				image: pathTopRightGrass
			},
			'M': {
				name: 'path bottom left',
				type: 'walkable',
				image: pathBottomLeftGrass
			},
			'N': {
				name: 'path bottom right',
				type: 'walkable',
				image: pathBottomRightGrass
			},
			'O': {
				name: 'cave wall top',
				image: caveWallTop,
				type: 'solid'
			},
			'P': {
				name: 'cave wall bottom',
				image: caveWallBottom,
				type: 'solid'
			},
			'Q': {
				name: 'cave wall left',
				image: caveWallLeft,
				type: 'solid'
			},
			'R': {
				name: 'cave wall right',
				image: caveWallRight,
				type: 'solid',
			},
			'S': {
				name: 'cave wall top left',
				image: caveWallTopLeft,
				type: 'solid',
			},
			'T': {
				name: 'cave wall top right',
				image: caveWallTopRight,
				type: 'solid'
			},
			'U': {
				name: 'cave wall bottom left',
				image: caveWallBottomLeft,
				type: 'solid',
			},
			'V': {
				name: 'cave wall bottom right',
				image: caveWallBottomRight,
				type: 'solid',
			},
			'W': {
				name: 'cave wall interior top left',
				image: caveWallInteriorTopLeft,
				type: 'solid'
			},
			'X': {
				name: 'cave wall interior top right',
				image: caveWallInteriorTopRight,
				type: 'solid'
			},
			'Y': {
				name: 'cave wall interior bottom right',
				image: caveWallInteriorBottomRight,
				type: 'solid'
			},
			'Z': {
				name: 'cave wall interior bottom left',
				image: caveWallInteriorBottomLeft,
				type: 'solid'
			},
			'[': {
				name: 'wood floor',
				type: 'walkable',
				image: woodFloor
			},
			']': {
				name: 'stone wall top',
				type: 'solid',
				image: stoneWallTop
			},
			'^': {
				name: 'stone wall bottom',
				type: 'solid',
				image: stoneWallBottom
			},
			'_': {
				name: 'stone wall left',
				type: 'solid',
				image: stoneWallLeft
			},
			'`': {
				name: 'stone wall right',
				type: 'solid',
				image: stoneWallRight
			},
			'a': {
				name: 'stone wall top left',
				type: 'solid',
				image: stoneWallTopLeft
			},
			'b': {
				name: 'stone wall top right',
				type: 'solid',
				image: stoneWallTopRight
			},
			'c': {
				name: 'stone wall bottom left',
				type: 'solid',
				image: stoneWallBottomLeft
			},
			'd': {
				name: 'stone wall bottom right',
				type: 'solid',
				image: stoneWallBottomRight
			},
			'e': {
				name: 'stone wall top left interior',
				type: 'solid',
				image: stoneWallTopLeftInterior
			},
			'f': {
				name: 'stone wall top right interior',
				type: 'solid',
				image: stoneWallTopRightInterior
			},
			'g': {
				name: 'stone wall bottom left interior',
				type: 'solid',
				image: stoneWallBottomLeftInterior
			},
			'h': {
				name: 'stone wall bottom right interior',
				type: 'solid',
				image: stoneWallBottomRightInterior
			},
			'i': {
				name: 'water right',
				type: 'walkable',
				image: waterRight
			},
			'j': {
				name: 'water top left',
				type: 'walkable',
				image: waterTopLeft
			},
			'k': {
				name: 'water top right',
				type: 'walkable',
				image: waterTopRight
			},
			'l': {
				name: 'water bottom left',
				type: 'walkable',
				image: waterBottomLeft
			},
			'm': {
				name: 'water bottom right',
				type: 'walkable',
				image: waterBottomRight
			},
			'n': {
				name: 'water top left interior',
				type: 'walkable',
				image: waterTopLeftInterior
			},
			'o': {
				name: 'water top right interior',
				type: 'walkable',
				image: waterTopRightInterior
			},
			'p': {
				name: 'water bottom left interior',
				type: 'walkable',
				image: waterBottomLeftInterior
			},
			'q': {
				name: 'water bottom right interior',
				type: 'walkable',
				image: waterBottomRightInterior
			},
			'r': {
				name: 'water',
				type: 'solid',
				image: water
			},
			's': {
				name: 'chair right',
				type: 'solid',
				image: chairRightFloor,
				large: true
			},
			't': {
				name: 'chair left',
				type: 'solid',
				image: chairLeftFloor,
				large: true
			},
			'u': {
				name: 'table',
				type: 'solid',
				image: tableFloor,
				large: true
			},
			'v': {
				name: 'house wall bottom',
				type: 'solid',
				image: houseWallBottomIn,
			},
			'w': {
				name: 'house wall left',
				type: 'solid',
				image: houseWallLeftIn
			},
			'x': {
				name: 'house wall right',
				type: 'solid',
				image: houseWallRightIn
			},
			'z': {
				name: 'house wall top left',
				type: 'solid',
				image: houseWallTopLeftIn
			},
			'{': {
				name: 'house wall top right',
				type: 'solid',
				image: houseWallTopRightIn
			},
			'|': {
				name: 'house wall bottom left',
				type: 'solid',
				image: houseWallBottomLeftIn
			},
			'}': {
				name: 'house wall bottom right',
				type: 'solid',
				image: houseWallBottomRightIn
			},
			'~': {
				name: 'door down',
				type: 'down',
				image: houseWallDoorDown
			},
			'€': {
				name: 'bush',
				type: 'solid',
				image: bushGrass
			},
			'‚': {
				name: 'grass stairs',
				type: 'down',
				image: stairsGrass
			},
			'ƒ': {
				name: 'stump grass',
				type: 'solid',
				image: stumpGrass,
			},
			'„': {
				name: 'blue flower',
				type: 'walkable',
				image: blueFlowerGrass
			},
			'…': {
				name: 'orange flower',
				type: 'walkable',
				image: orangeFlowerGrass
			},
			'†': {
				name: 'lily pad',
				type: 'walkable',
				image: lilyPadWater
			},
			'‡': {
				name: 'water lily',
				type: 'walkable',
				image: waterLily
			},
			'ˆ': {
				name: 'stairs up stone',
				type: 'up',
				image: stairs
			},
			'‰': {
				name: 'stairs down stone',
				type: 'down',
				image: stairs
			},
			'Š': {
				name: 'stone floor',
				type: 'walkable',
				image: stoneFloor
			},
			'‹': {
				name: 'stone floor rock',
				type: 'solid',
				image: rockStoneFloor
			},
			'Œ': {
				name: 'blue floor tile',
				type: 'walkable',
				image: blueFloorTile
			},
			'Ž': {
				name: 'water bottom',
				type: 'walkable',
				image: waterBottom
			},
			'‘': {
				name: 'water top',
				type: 'walkable',
				image: waterTop
			},
			'’': {
				name: 'water left',
				type: 'walkable',
				image: waterLeft
			},
			'•': {
				name: 'stone tile',
				type: 'walkable',
				image: stoneFloorTile
			},
			'–': {
				name: 'stone wall green top',
				type: 'solid',
				image: stoneWallGreenTop
			},
			'—': {
				name: 'stone wall green bottom',
				type: 'solid',
				image: stoneWallGreenBottom
			},
			'˜': {
				name: 'stone wall green left',
				type: 'solid',
				image: stoneWallGreenLeft
			},
			'™': {
				name: 'stone wall green right',
				type: 'solid',
				image: stoneWallGreenRight
			},
			'š': {
				name: 'stone wall green top left',
				type: 'solid',
				image: stoneWallGreenTopLeft
			},
			'›': {
				name: 'stone wall green top right',
				type: 'solid',
				image: stoneWallGreenTopRight
			},
			'œ': {
				name: 'stone wall green bottom left',
				type: 'solid',
				image: stoneWallGreenBottomLeft
			},
			'ž': {
				name: 'stone wall green bottom right',
				type: 'solid',
				image: stoneWallGreenBottomRight
			},
			'Ÿ': {
				name: 'stone wall green top left interior',
				type: 'solid',
				image: stoneWallGreenTopLeftInterior
			},
			'¡': {
				name: 'stone wall green top right interior',
				type: 'solid',
				image: stoneWallGreenTopRightInterior
			},
			'¢': {
				name: 'stone wall green bottom left interior',
				type: 'solid',
				image: stoneWallGreenBottomLeftInterior
			},
			'£': {
				name: 'stone wall green bottom right interior',
				type: 'solid',
				image: stoneWallGreenBottomRightInterior
			},
			'¤': {
				name: 'green floor tile',
				type: 'walkable',
				image: greenFloorTile
			},
			'¥': {
				name: 'stone wall blue top',
				type: 'solid',
				image: stoneWallBlueTop
			},
			'¦': {
				name: 'stone wall blue bottom',
				type: 'solid',
				image: stoneWallBlueBottom
			},
			'§': {
				name: 'stone wall blue left',
				type: 'solid',
				image: stoneWallBlueLeft
			},
			'¨': {
				name: 'stone wall blue right',
				type: 'solid',
				image: stoneWallBlueRight
			},
			'©': {
				name: 'stone wall blue top left',
				type: 'solid',
				image: stoneWallBlueTopLeft
			},
			'ª': {
				name: 'stone wall blue top right',
				type: 'solid',
				image: stoneWallBlueTopRight
			},
			'«': {
				name: 'stone wall blue bottom left',
				type: 'solid',
				image: stoneWallBlueBottomLeft
			},
			'¬': {
				name: 'stone wall blue bottom right',
				type: 'solid',
				image: stoneWallBlueBottomRight
			},
			'®': {
				name: 'stone wall blue top left interior',
				type: 'solid',
				image: stoneWallBlueTopLeftInterior
			},
			'¯': {
				name: 'stone wall blue top right interior',
				type: 'solid',
				image: stoneWallBlueTopRightInterior
			},
			'°': {
				name: 'stone wall blue bottom left interior',
				type: 'solid',
				image: stoneWallBlueBottomLeftInterior
			},
			'±': {
				name: 'stone wall blue bottom right interior',
				type: 'solid',
				image: stoneWallBlueBottomRightInterior
			},
			'²': {
				name: 'window down',
				type: 'solid',
				image: houseWindowDown
			},
			'³': {
				name: 'shadow tree',
				type: 'solid',
				image: shadowTreeDirt,
				large: true
			},
			'´': {
				name: 'shadow bush',
				type: 'solid',
				image: shadowBushDirt
			},
			'µ': {
				name: 'stump dirt',
				type: 'solid',
				image: stumpDirt
			},
			'¶': {
				name: 'tombstone 1',
				type: 'solid',
				image: tombstone1Grass
			},
			'·': {
				name: 'tombstone 2',
				type: 'solid',
				image: tombstone2Grass
			},
			'¸': {
				name: 'grass top sand',
				type: 'walkable',
				image: grassTopSand
			},
			'¹': {
				name: 'grass bottom sand',
				type: 'walkable',
				image: grassBottomSand
			},
			'º': {
				name: 'grass left sand',
				type: 'walkable',
				image: grassLeftSand
			},
			'»': {
				name: 'grass right sand',
				type: 'walkable',
				image: grassRightSand
			},
			'¼': {
				name: 'grass top left interior',
				type: 'walkable',
				image: grassTopLeftInteriorSand
			},
			'½': {
				name: 'grass top right interior',
				type: 'walkable',
				image: grassTopRightInteriorSand
			},
			'¾': {
				name: 'grass bottom left interior',
				type: 'walkable',
				image: grassBottomLeftInteriorSand
			},
			'¿': {
				name: 'grass bottom right interior',
				type: 'walkable',
				image: grassBottomRightInteriorSand
			},
			'À': {
				name: 'grass top left',
				type: 'walkable',
				image: grassTopLeftSand
			},
			'Á': {
				name: 'grass top right',
				type: 'walkable',
				image: grassTopRightSand
			},
			'Â': {
				name: 'grass bottom left',
				type: 'walkable',
				image: grassBottomLeftSand
			},
			'Ã': {
				name: 'grass bottom right',
				type: 'walkable',
				image: grassBottomRightSand
			},
			'Ä': {
				name: 'sand',
				type: 'walkable',
				image: sand
			},
			'Å': {
				name: 'skull',
				type: 'walkable',
				image: skullSand
			},
			'Æ': {
				name: 'cactus',
				type: 'solid',
				image: cactusSand,
				large: true
			},
			'Ç': {
				name: 'blue stairs up',
				type: 'up',
				image: blueStairsWall
			},
			'È': {
				name: 'blue stairs down',
				type: 'down',
				image: blueStairsWall
			}
		};
		var maps = [
			{
				x: 0,
				y: 0,
				z: 0,
				map: [
        '111111111111111',
        '111111111111111',
        '111111111111111',
        '1111!!9!!9!!111',
        '11!!!!1!!!!!!11',
        '1!!11DEEEF1!811',
        '!!!!!A>>>B1!!11',
        'JJL8!@???C!!!11',
        '!!I!!<:H:=!1!11',
        '11ML!93I!!8!!11',
        '111MJJJN9!!1111',
        '111111!!!111111',
        '111111111111111',
        '111111111111111'],
				enemy: [{
						name: 'shadow imp',
						x: 2,
						y: 5
		},
					{
						name: 'shadow imp',
						x: 5,
						y: 3
		},
					{
						name: 'shadow imp',
						x: 8,
						y: 4
		},
					{
						name: 'shadow imp',
						x: 11,
						y: 4
		},
					{
						name: 'shadow imp',
						x: 10,
						y: 10
		},
					{
						name: 'shadow imp',
						x: 3,
						y: 8
		}]
	},
			{
				x: 0,
				y: 0,
				z: 1,
				map: [
			'               ',
			'               ',
			'               ',
			'               ',
			'    z:::::{    ',
			'    w[sut[x    ',
			'    w[[[[[x    ',
			'    w[[[[[x    ',
			'    |vv~vv}    ',
			'               ',
			'               ',
			'               ',
			'               ',
			'               '],
				quests: [{
					name: 'Marshal Jordan',
					x: 5,
					y: 5
		}],
				vendors: [{
					name: 'Pamela Fox',
					x: 9,
					y: 5
		}],
	},
			{
				x: -1,
				y: 0,
				z: 0,
				map: [
        '111111111111111',
        '111111111111111',
        '11111111!!!1111',
        '111‚1111…!!1111',
        '11!!!1!!!!!8111',
        '111!!!!!1!!!!11',
        '11118!113!11!!!',
        '111!!!!1!!1!!JJ',
        '11!!!!!9!!!!!!!',
        '1119!1!!99!1!11',
        '111!!!!1!!!!!!1',
        '11111!!!!!31111',
        '111111111111111',
        '111111111111111'],
				enemy: [{
						name: 'shadow imp',
						x: 12,
						y: 7
			},
					{
						name: 'shadow imp',
						x: 10,
						y: 5
			},
					{
						name: 'shadow imp',
						x: 7,
						y: 4
			},
					{
						name: 'shadow imp',
						x: 5,
						y: 6
			},
					{
						name: 'shadow imp',
						x: 2,
						y: 8
			},
					{
						name: 'shadow imp',
						x: 6,
						y: 10
			},
					{
						name: 'shadow imp',
						x: 9,
						y: 6
			}]
	},
			{
				x: -1,
				y: 0,
				z: -1,
				map: [
        '               ',
        '         SOOOOO',
        '       SOWŠŠŠŠŠ',
        ' SOˆOOOWŠŠŠYZŠŠ',
        ' QŠŠŠŠŠŠŠYPVUZŠ',
        ' QŠŠŠŠŠYPV   UP',
        ' UZ‹ŠŠYV       ',
        '  UZŠŠXOOOOT   ',
        '  SWŠŠŠŠŠŠŠXOT ',
        '  QŠŠŠŠŠŠŠŠŠŠR ',
        '  QŠŠŠ‹ŠŠŠŠŠŠR ',
        '  QŠŠŠŠŠŠŠ‹ŠŠR ',
        '  UZŠŠŠŠŠŠŠŠYV ',
        '   UPPPPPPPPV  '],
				enemy: [
					{
						name: 'cave bat',
						x: 5,
						y: 6
			},
					{
						name: 'cave bat',
						x: 7,
						y: 4
			},
					{
						name: 'cave bat',
						x: 10,
						y: 2
			},
					{
						name: 'cave bat',
						x: 3,
						y: 9
			},
					{
						name: 'cave bat',
						x: 7,
						y: 10
			},
					{
						name: 'cave bat',
						x: 10,
						y: 12
			},
		],
				quests: [{
						name: 'Wruce Bayne',
						x: 10,
						y: 8
			}
		]
	},
			{
				x: 0,
				y: 0,
				z: -1,
				map: [
        ' QŠR           ',
        'OWŠXT          ',
        'ŠŠŠŠXOT  SOOOT ',
        'ŠŠŠŠŠŠXOOWŠŠŠR ',
        'ŠŠYZŠŠŠŠŠŠŠŠŠR ',
        'PPVUPZŠŠŠŠYZŠXT',
        '     UZŠŠŠRQŠŠR',
        ' SOOT UZŠŠRQŠ‰R',
        'SWŠŠXTSWŠYVUPPV',
        'QŠŠŠŠXWŠŠR     ',
        'QŠŠŠŠŠŠŠYV a]]b',
        'QŠŠŠŠŠYPV  _‰•`',
        'UZŠŠŠYV    _••`',
        ' UPPPV     _••`'],
				enemy: [
					{
						name: 'cave bat',
						x: 3,
						y: 3
			},
					{
						name: 'cave bat',
						x: 6,
						y: 5
			},
					{
						name: 'cave bat',
						x: 10,
						y: 4
			},
					{
						name: 'cave bat',
						x: 3,
						y: 9
			},
					{
						name: 'cave bat',
						x: 8,
						y: 9
			}
        ]
	},
			{
				x: 0,
				y: 0,
				z: -2,
				map: [
        '    SOOOOT     ',
        '   SWŠŠŠŠXT    ',
        '  SWŠŠYZŠŠR    ',
        '  QŠŠYVUZŠXOT  ',
        ' SWŠYV SWŠŠŠXT ',
        ' QŠŠR SWŠŠŠŠŠXT',
        ' QŠYV QŠŠYPZŠŠR',
        ' QŠR SWŠYV QŠˆR',
        ' QŠXTQŠŠR  UPPV',
        ' QŠŠXWŠYV      ',
        ' UZŠŠŠŠXOT SOOT',
        '  UPZŠŠŠŠXOWˆŠR',
        '    UPPZŠŠŠŠŠŠR',
        '       UPPPPPPV'],
				enemy: [
					{
						name: 'cave bat',
						x: 9,
						y: 5
			},
					{
						name: 'cave bat',
						x: 7,
						y: 8
			},
					{
						name: 'cave bat',
						x: 9,
						y: 12
			}
		]
	},
			{
				x: 0,
				y: -1,
				z: -1,
				map: [
        '               ',
        '               ',
        '               ',
        '               ',
        '    SOOOT      ',
        '    QŠŠŠR      ',
        '   SWŠˆŠR      ',
        '   QŠŠŠŠR      ',
        '  SWŠYPPV      ',
        ' SWŠŠR         ',
        ' QŠŠYV         ',
        ' QŠYV          ',
        ' QŠR           ',
        ' QŠR           '],
	},
			{
				x: 0,
				y: 1,
				z: -1,
				map: [
        '           _••`',
        '           _••`',
        '  a]]]]]b  _••`',
        '  _•••••g]]h••`',
        '  _•••••••••••`',
        '  _•••••••••••`',
        '  _•••••e^^^^^d',
        '  c^^^^^d      ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               '],
				interactings: [
					{
						name: 'gloomblade chest',
						x: 5,
						y: 4
			}
        ]
	},
			{
				x: 0,
				y: -1,
				z: 0,
				map: [
        '!!!!!!!!!!!!!!!',
        '!!!!!!…!!!!!9€!',
        '!1€8!1!!9!199!!',
        '!!!!11!!!ƒ!!!9!',
        '!!9!!($)!!8!!ƒ!',
        '!999(/0.)!!!…!!',
        '!!!!&0‰0%1!!!!!',
        '!!!!*-0,+11!€!!',
        '!…!ƒ!*#+9111!8!',
        '!€!8!!!!!!1!!!!',
        '!!!!!!€!!!!11!!',
        '!11!!!!!ƒ!1111!',
        '11111!11!111111',
        '111111111111111'],
	},
			{
				x: -1,
				y: -1,
				z: 0,
				map: [
        '!!!!!!!!!999!!!',
        '!!!!!!8!€991!!!',
        '!8€!!1!!!!!!!8!',
        '!!!…!!!nŽŽŽŽo!!',
        '!!…!nŽŽm†rrrlo!',
        '!11nm†rrrr‡r†’!',
        '!1!irrr‡rrrj‘q!',
        '!!!pkrrrrj‘q!…!',
        '!!!9p1‘‘‘1!!9!!',
        '!!999!!!8!!899!',
        '1!!!!!11!!!!99!',
        '11!!!111…!!11!!',
        '111111111111111',
        '111111111111111'],
				enemy: [
					{
						name: 'killer bunny',
						x: 9,
						y: 10
					},
					{
						name: 'killer bunny',
						x: 11,
						y: 8
					},
					{
						name: 'killer bunny',
						x: 11,
						y: 2
					},
					{
						name: 'killer bunny',
						x: 6,
						y: 3
					},
					{
						name: 'killer bunny',
						x: 2,
						y: 1
					},
					{
						name: 'killer bunny',
						x: 2,
						y: 6
					}]
	},
			{
				x: -2,
				y: -1,
				z: 0,
				map: [
        '!!!!!!!!!!!!!!!',
        '!!!„!!…!!111!„!',
        '!!„„11!!„!111!!',
        '!…!11111„„nŽo!!',
        '!!1111111!i†lo!',
        '!!1DEEEF11irr’!',
        '!11A>>>B11pk†’!',
        '!11@???C11!p11!',
        '!!1<;H;=1…!11!!',
        '!!!!9!!!!!11!!!',
        '!!!11!!1„nŽo!…1',
        '!„1111!!nmr’!11',
        '!„„11!…!i‡jq111',
        '!!!!!!!!p‘q!111'],
				enemy: [
					{
						name: 'african swallow',
						x: 6,
						y: 11
					},
					{
						name: 'african swallow',
						x: 2,
						y: 9
					},
					{
						name: 'african swallow',
						x: 1,
						y: 5
					},
					{
						name: 'african swallow',
						x: 1,
						y: 1
					},
					{
						name: 'african swallow',
						x: 7,
						y: 2
					},
					{
						name: 'african swallow',
						x: 13,
						y: 3
					},
					{	
						name: 'african swallow',
						x: 12,
						y: 9
					},
					{
						name: 'african swallow',
						x: 9,
						y: 4
					},
					{
						name: 'african swallow',
						x: 1,
						y: 13
					}
				]
	},
			{
				x: -2,
				y: -1,
				z: 1,
				map: [
        '               ',
        '               ',
        '               ',
        '  z;:;:;{      ',
        '  w[[[[[x      ',
        '  w[sut[x      ',
        '  w[[[[[x      ',
        '  w[[[[[x      ',
        '  |²v~v²}      ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               '],
				quests: [
					{
						name: 'John Cleese',
						x: 7,
						y: 4
			}
        ],
				vendors: [{
					name: 'Roger the Shrubber',
					x: 3,
					y: 7
		}],
	},
			{
				x: -2,
				y: 0,
				z: 0,
				map: [
        '!!!!!!!!!!!!111',
        '„„!1„„!11!!!!11',
        '!3„!€„!!11!„„!1',
        'Žo!!!!!…!!„„„!1',
        'rlŽŽo!3!!€!…!11',
        'rrrrlo!!!!!!!11',
        'rrrrrlo!!!!!111',
        'rrrrrr’!111!111',
        'rrrrjklo31!!€11',
        'rj‘klmr’!!!!!!1',
        'kloirrr’!!1!!!1',
        'mrlmrrrlo!!1!11',
        'rrrrrrrr’!„„!11',
        'rrrrrrrr’…!„!11'],
				enemy: [
					{
						name: 'african swallow',
						x: 3,
						y: 2
					},
					{
						name: 'african swallow',
						x: 7,
						y: 4
					},
					{
						name: 'african swallow',
						x: 10,
						y: 1
					},
					{
						name: 'african swallow',
						x: 11,
						y: 6
					},
					{
						name: 'african swallow',
						x: 9,
						y: 10
					},
					{
						name: 'african swallow',
						x: 13,
						y: 10
					}
				]
	},
			{
				x: -3,
				y: -1,
				z: 0,
				map: [
        'rrr’!!!!!!!!!!!',
        'rrr’3!!!!!ƒ!11!',
        'rrr’!ƒ!!…!„111!',
        'rrr’!!„!!!!1„„!',
        'rrrlo„„3ƒ!!!!!!',
        'rrrr’ƒ!!()1!ƒ…!',
        'rrrr’!!!&.)!!!!',
        'rrrrlo()*#111!!',
        'rrrrr’*+($)111!',
        'rrrrr’!(/‰.$)1!',
        'rrrrr’…*-000%!!',
        'rrrrrlo!11-0%!!',
        'rrrrrr’!31*#+…!',
        'rrrrrr’!!!„„!!!'],
	},
			{
				x: -3,
				y: 0,
				z: 0,
				map: [
        'rrrrrr’„!!!!!!!',
        'rrrrrrlŽo1!1„„!',
        'rjkrrrrrlŽŽo11!',
        'rlmrrrrrrrrlŽŽŽ',
        'rrrrrj‘‘krrrrrr',
        'rrrj‘q!1pkrrrrr',
        'rrjqDEEF!irrrrr',
        'rr’!@??C…pkrrrr',
        'rr’1<H:=1!irrrr',
        'rrlo!I11„€ij‘kr',
        'rrr’1ML1KNi’nmj',
        'rrrlo„MJNnmlmrl',
        'rrrrlŽŽŽŽmrrrrr',
        'rrrrrrrrrrrrrrr'],
	},
			{
				x: -2,
				y: 1,
				z: 0,
				map: [
        'rrrrrrrr’!!!!11',
        'rrrrrrrr’„!!!11',
        'rrrrrrrr’ƒ!1„„1',
        'rrrrrrrrlo!!!!!',
        'rrrrrrrrr’!111!',
        'rj1111krr’9911!',
        'r’DEEFirrlo9!„!',
        'r’@??Cirrr’!1!!',
        'r’<:H=irrr’!11!',
        'r’11!„irrjq„11!',
        'r’1‚1nmrr’ƒ„!19',
        'rlo„nmrrjq!!!!9',
        'rrlŽmrrr’!!1!9!',
        'rrrrrrrr’!„!!!!'],
	},
			{
				x: -3,
				y: 0,
				z: 1,
				map: [
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '   z::::{      ',
        '   w[[[[x      ',
        '   w[[[[x      ',
        '   |v~vv}      ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               '],
				quests: [
					{
						name: 'Johnny Thunder',
						x: 7,
						y: 6
					}
				]
	},
			{
				x: -1,
				y: 1,
				z: 0,
				map: [
        '111111111111111',
        '11!„!!!11111111',
        '1!„„!!11!„„!!31',
        '!!!1111!!„!!!€!',
        '!!111111!!11!!!',
        '!!11111111111!!',
        '!!11111!111111!',
        '!€!1ƒ1!!!!1111!',
        '!!!!„„!11!11!!!',
        '!!!!!„!!!!1!!!1',
        '!31€1!!111!„111',
        '!1111!1111„„111',
        '!111!!3111!€€11',
        '!!!!!!!!!!!!111'],
				enemy: [
					{
						name: 'bandit',
						x: 4,
						y: 1
					},
					{
						name: 'bandit',
						x: 8,
						y: 2
					},
					{
						name: 'bandit',
						x: 13,
						y: 5
					},
					{
						name: 'bandit',
						x: 10,
						y: 10
					},
					{
						name: 'bandit',
						x: 7,
						y: 6
					},
					{
						name: 'bandit',
						x: 3,
						y: 8
					},
					{
						name: 'bandit',
						x: 1,
						y: 4
					},
					{
						name: 'bandit',
						x: 6,
						y: 13
					}
				]
	},
			{
				x: 0,
				y: 1,
				z: 0,
				map: [
					'111111111111111',
					'11!!!!111111111',
					'1!!11!!11111111',
					'!!!113„1111111!',
					'!!€111„11111€3!',
					'!„!111!„1111!!!',
					'!„„!!1!!!111!€„',
					'!311!!!1!111„„!',
					'!!!11!11!111„!!',
					'1!!!!„!!!!!!!!1',
					'111€1„„111!!311',
					'11111!111111111',
					'111111111111111',
					'111111111111111'],
				enemy: [
					{
						name: 'bandit',
						x: 1,
						y: 2
					},
					{
						name: 'bandit',
						x: 6,
						y: 3
					},
					{
						name: 'bandit',
						x: 3,
						y: 9
					},
					{
						name: 'bandit',
						x: 8,
						y: 7
					},
					{
						name: 'bandit',
						x: 10,
						y: 10
					},
					{
						name: 'bandit',
						x: 12,
						y: 5
					}
				]
			},
			{
				x: -4,
				y: -1,
				z: 0,
				map: [
        'ÄÄÄÄÄÄÅÄº!!irrr',
        'ÄÄÄÄÄÄÄÄº€…irrr',
        'ÄÄÄÆÄÄÄÄº!!irrr',
        'ÄÄÄÄÄÄÄÄº!!irrr',
        'ÄÅÄÄÄÄÆÄºƒ…irrr',
        'ÄÄÄÄÄÄÄÄº!ƒpkrr',
        'ÄÄÄÄÄÄÄÄÂ½!!irr',
        'ÄÄÄÄÄÄÄÄÄº!€irr',
        'ÄÄÄÄÄÄÄÄÄÂ½!pkr',
        'ÄÄÄÆÄ‰ÄÄÄÄº…!ir',
        'ÄÄÄÄÄÄÄÄÄÄºƒ!ir',
        'ÄÄÄÄÄÅÄÄÆÄÂ½…ir',
        'ÄÆÄÄÄÄÄÄÄÄÄº€ir',
        'ÄÄÄÄÄÄÄÄÄÄÄº!ir'],
				enemy: [
					{
						name: 'mummy',
						x: 7,
						y: 6
					},
					{
						name: 'mummy',
						x: 3,
						y: 4
					},
					{
						name: 'mummy',
						x: 2,
						y: 11
					},
					{
						name: 'mummy',
						x: 10,
						y: 12
					}
				]
	},
			{
				x: -3,
				y: -1,
				z: -1,
				map: [
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '      a]]]]]b  ',
        '      _•••••`  ',
        ']]]]]]h•••••`  ',
        '•••••••••ˆ••`  ',
        '^^^^^^f•••••`  ',
        '      _•••••`  ',
        '      c^f•e^d  ',
        '        _•`    '],
	},
			{
				x: -4,
				y: -1,
				z: -1,
				map: [
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '   a]]]b       ',
        '   _•••g]]]]]]]',
        '   _•ˆ•••••••••',
        '   _•••e^^^^^^^',
        '   c^^^d       ',
        '               ',
        '               '],
	},
			{
				x: -3,
				y: 0,
				z: -1,
				map: [
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    '],
	},
			{
				x: -2,
				y: 1,
				z: -1,
				map: [
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        '  a]b          ',
        '  _ˆ`          ',
        ']]h•`          ',
        '••••`          ',
        '^^^^d          '],
	},
			{
				x: -3,
				y: 1,
				z: -1,
				map: [
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•`    ',
        '        _•g]]]]',
        '        _••••••',
        '        c^^^^^^'],
			},
			{
				x: 1,
				y: 1,
				z: 0,
				map: [
        '111111111111111',
        '111111111111111',
        '111111111111111',
        '!!1111111111111',
        '!11111111111111',
        '!€1!„„!11111111',
        '!!!!!!ƒ!„111111',
        '!„!ƒ!!„!€„11111',
        '!!„!!„!„!!11111',
        '1!!!!!„!ƒ„11111',
        '111!!ƒ!!!„11111',
        '1111„„!!„111111',
        '111111111111111',
        '111111111111111'],
				quests: [{
					name: 'Knight who says Ni',
					x: 6,
					y: 8
				}]
			},
			{
				x: -4,
				y: 0,
				z: 0,
				map: [
        'ÄÄÄÄÄÄÄÄÄÄÄº!ir',
        'ÄÄÄÄÄÄÄÀÁÄÄº!ir',
        'ÄÄÄÆÄÄÄÂÃÄÆºnmr',
        'ÄÄÄÄÄÄÄÄÄÅÄºirr',
        'ÄÆÅÄÄÄÄÆÄÄÀ¿irr',
        'ÄÄÄÄÄÄÄÄÄÄºnmrr',
        'ÄÄÄÆÆÄÄÄÄÄºirrr',
        'ÄÄÆÆÆÄÄÄÄÀ¿pkrr',
        'ÄÄÄÆÄÄÅÆÆÂ¹½irr',
        'ÄÄÄÄÄÄÄÄÄÄÄºirr',
        'ÄÄÄÄÄÄÄÄÄÄÀ¿pkr',
        'ÄÅÄÄÄÄÄÆÆÀ¿!!ir',
        'ÄÄÆÄÄÄÆÆÄÂ¹½!ir',
        'ÄÄÄÄÄÄÄÄÄÄÄº!ir'],
				enemy: [
					{
						name: 'mummy',
						x: 2,
						y: 2
					},
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 4
					},
					{
						name: 'bloodsand scorpion',
						x: 8,
						y: 3
					},
					{
						name: 'mummy',
						x: 8,
						y: 7
					},
					{
						name: 'mummy',
						x: 3,
						y: 9
					},
					{
						name: 'bloodsand scorpion',
						x: 6,
						y: 10
					},
					{
						name: 'bloodsand scorpion',
						x: 8,
						y: 12
					}
				]
			},
			{
				x: -4,
				y: 1,
				z: 0,
				map: [
        'ÄÄÄÄÄÄÄÄÄÄÄº!ir',
        'ÄÄÄÄÄÄÄÄÀ¸Áº!ir',
        'ÄÅÄÄÄÆÆÄº¼Ãº„p‘',
        'ÄÄÄÄÆÆÆÄÂÃÄº!!!',
        'ÄÄÄÄÄÆÄÄÄÄÄÂ½…!',
        'ÄÄÄÄÄÄÄÄÆÄÄÄº!!',
        'ÄÄÆÄÄÄÄÄÅÄÄÄº„!',
        'ÄÄÄÄÄÄÄÄÄÀÁÄº!…',
        'ÄÄÄÄÄÆÄÄÄÂÃÄº!!',
        'ÄÄÄÄÄÄÄÄÄÄÄÄÂ½!',
        'ÄÄÄÅÄÄÄÄÄÄÀÁÄº!',
        'ÄÄÆÄÄÄÆÄÄÀ¿»Äº!',
        'ÄÄÄÄÄÄÄÄÅÂ¹ÃÄº!',
        'ÄÄÄÄÄÄÄÄÄÄÄÄÄº…'],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 2,
						y: 2
					},
					{
						name: 'mummy',
						x: 4,
						y: 5
					},
					{
						name: 'mummy',
						x: 7,
						y: 3
					},
					{
						name: 'bloodsand scorpion',
						x: 10,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 7,
						y: 8
					},
					{
						name: 'mummy',
						x: 1,
						y: 8
					},
					{
						name: 'mummy',
						x: 5,
						y: 11
					},
					{
						name: 'bloodsand scorpion',
						x: 12,
						y: 11
					}
				]
			},
			{
				x: -3,
				y: 1,
				z: 0,
				map: [
        'rrrrrrrrrrrrrrr',
        'rrrrrrjkrrrrrrr',
        '‘krrrjqirrrrrrr',
        '8irrrlŽmrrrrrrr',
        '!pkrrrrrrrrrrrr',
        '!!p‘‘krrrrrrrrr',
        '!9!!!pkrrjkrrrr',
        '!!!!8!irrlmrrrr',
        '!!!111pkrrrrrrr',
        '!!13131p‘‘krrrr',
        '!13($)31!!pkrrr',
        '!13&0%31!9!irrr',
        '!1!*#+!1!!!pkrr',
        '!!!8!!!!!!!9irr'],
				vendors: [
					{
						name: 'Master Don Jon',
						x: 4,
						y: 11
					},
				]
			},
			{
				x: -2,
				y: 1,
				z: 1,
				map: [
        '               ',
        '               ',
        '               ',
        '               ',
        '               ',
        ' z::::{        ',
        ' w[[[[x        ',
        ' w[[[[x        ',
        ' |vv~v}        ',
        '               ',
        '               ',
        '               ',
        '               ',
        '               '],
				quests: [
					{
						name: 'Daedalus',
						x: 2,
						y: 6
					}
				]
			},
			{
				x: -1,
				y: -2,
				z: 0,
				map: [
					'³³³³³³³0³³³³³³³',
					'³³³³³³³0´³³³³³³',
					'0³³0³³´0³0³³³³³',
					'00000³³0³00´0³³',
					'00000000000000³',
					'000³0³³000µ0000',
					'0µ0³´0³³2000³³0',
					'0200³00³³³00³³0',
					'000µ³³00³³00200',
					'0000µ000µ000000',
					'00³002000020µ00',
					'0³³000000µ00000',
					'##1-02µ0000,1##',
					'!!!*#######+!!!'],
				enemy: [
					{
						name: 'wraith',
						x: 7,
						y: 2
					},
					{
						name: 'shadow imp',
						x: 1,
						y: 4
					},
					{
						name: 'shadow imp',
						x: 5,
						y: 7
					},
					{
						name: 'shadow imp',
						x: 9,
						y: 4
					},
					{
						name: 'shadow imp',
						x: 11,
						y: 8
					},
					{
						name: 'shadow imp',
						x: 8,
						y: 11
					},
					{
						name: 'shadow imp',
						x: 3,
						y: 10
					}
				]
			},
			{
				x: 0,
				y: -2,
				z: 0,
				map: [
					'³00000000000000',
					'³³00³³00µ00³³³0',
					'³³0µ´³0000´³³³0',
					'³³00000³´00³³µ0',
					'³³³³0³³³0000³00',
					'0³³³0³³³0000000',
					'00³³³0µ³0³µ´000',
					'00³³³0000³³³00³',
					'0³0³³³00³³³00³³',
					'0´´0³³³³³³³³³³³',
					'00³µ³³³³³³³³³³³',
					'000µµ³³³´00³³µ0',
					'#1#-0³µ0,#1#-00',
					'!!!*####+!!!*##'],
				enemy: [
					{
						name: 'wraith',
						x: 3,
						y: 1
					},
					{
						name: 'wraith',
						x: 7,
						y: 7
					},
					{
						name: 'wraith',
						x: 9,
						y: 2
					},
					{
						name: 'wraith',
						x: 12,
						y: 5
					},
					{
						name: 'shadow imp',
						x: 1,
						y: 7
					},
					{
						name: 'shadow imp',
						x: 4,
						y: 12
					},
					{
						name: 'shadow imp',
						x: 9,
						y: 11
					},
					{
						name: 'shadow imp',
						x: 13,
						y: 12
					}	
				]
			},
			{
				x: -2,
				y: -2,
				z: 0,
				map: [
					'!!!&0000³³0³³³³',
					'!!!*-0000³0³³³³',
					'!€!!&0³00000³³0',
					'!!!1&20000µ00³0',
					'…!1ƒ&0000³02000',
					'!!!!*-µ0³³³´000',
					'!!€1!1#-0³³00´0',
					'!…54447&0³00³00',
					'!!73¶·7*-000³³0',
					'!17·!9711-00000',
					'!1446!61!&2µ000',
					'!!11!!€!!*#-0³0',
					'!!1…!!!!3…!*11#',
					'!!!!!!!!!!!!!!!'
				],
				enemy: [
					{
						name: 'shadow imp',
						x: 12,
						y: 3
					},
					{
						name: 'shadow imp',
						x: 7,
						y: 4
					},
					{
						name: 'shadow imp',
						x: 10,
						y: 9
					},
					{
						name: 'shadow imp',
						x: 5,
						y: 2
					}
				]
			},
			{
				x: -3,
				y: -2,
				z: 0,
				map: [
					'ÄÄÄÂ½!!!!!!!!!!',
					'ÄÄÄÄÂ½!!8!!!!!!',
					'ÄÅÄÆÄº!€!!!!9!!',
					'ÄÄÄÄÄº!!!!!!!!!',
					'ÄÄÄÄÄº!3!…!11!!',
					'ÄÄÆÄÄº!!!111!!!',
					'ÄÄÄÅÄº8!!!1€8!!',
					'¸ÁÄÄÀ¿!!!!!!!!!',
					'!¾¸¸¿!!1!!!!!1!',
					'!!!!!!111…!3!!!',
					'Žo!!3!9€!!!!!!!',
					'rlo!!!!!!!!1!!!',
					'rrlo€!!!8!!…!!!',
					'rrr’!!!!!!!!!!!'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 2
					},
					{
						name: 'bloodsand scorpion',
						x: 2,
						y: 6
					}
				]
			},
			{
				x: -4,
				y: -2,
				z: 0,
				map: [
					'ÄÄÄÀ¸¸¸¸ÁÄÄÄÄÄÄ',
					'ÄÄÀ1nŽŽo»ÄÄÄÄÄÄ',
					'ÄÄºnmrr’»ÄÄÄÄÄÄ',
					'ÅÄºirrr’»ÄÄÆÄÄÄ',
					'ÄÄº1krjq»ÄÄÆÆÄÄ',
					'ÄÄÂ½ir’¼ÃÄÄÄÄÄÄ',
					'ÄÄÄºir’»ÄÄÄÄÅÄÄ',
					'ÄÆÄºp1q»ÄÆÄÄÀ¸¸',
					'ÄÆÆÂ¹¹¹ÃÆÄÀ¸¿!!',
					'ÄÄÆÄÄÄÅÄÄÀ¿!!!!',
					'ÄÄÄÄÄÄÄÄÀ¿!!!nŽ',
					'ÄÅÄÄÄÄÄÄº!!nŽmr',
					'ÄÄÄÄÆÄÄÄº!!irrr',
					'ÄÄÄÄÄÄÄÄº!!irrr'],
				enemy: [
					{
						name: 'mummy',
						x: 2,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 5,
						y: 10
					},
					{
						name: 'mummy',
						x: 12,
						y: 5
					},
					{
						name: 'bloodsand scorpion',
						x: 9,
						y: 2
					}
				]
			},
			{
				x: 1,
				y: 0,
				z: 0,
				map: [
					'11!!!!!!!!!!!!!',
					'1111„!!!!!!€!!!',
					'111!!!!!€8!!!!!',
					'111!811!!!!!„!!',
					'1111!11„!1!!!!!',
					'111!!!1!1111!!!',
					'111!!!!!111!!€!',
					'11!!1!8!1!!!!!!',
					'11!„11!!!!11!8!',
					'111!!!!1!„!11!!',
					'11111!111!!!111',
					'111111111111111',
					'111111111111111',
					'111111111111111'],
			},
			{
				x: 1,
				y: -1,
				z: 0,
				map: [
					'!!!!!!!!!!!!!!!',
					'9!!!!!!€!!9!!!!',
					'!!!5444444447!!',
					'!!!7€KJJJJJJ7!!',
					'!!17!I€!DEEEF!!',
					'!!!7€I!5AG>GB!!',
					'!!!7!I€7A>>>B9!',
					'!!97€I!7AG>GB!!',
					'!1!7!I€7A>>>B!!',
					'!!!7€I!7@???C1!',
					'!8!46I46<;H;=!!',
					'!!!!!MJJJJN!!9!',
					'1!!!1!!8!!!1!!!',
					'11!!!!!!!!!!!!!'],
				interactings: [
					{
						name: 'potato plant',
						x: 4,
						y: 4
					},
					{
						name: 'potato plant',
						x: 6,
						y: 5
					},
					{
						name: 'potato plant',
						x: 4,
						y: 6
					},
					{
						name: 'potato plant',
						x: 6,
						y: 7
					},
					{
						name: 'potato plant',
						x: 4,
						y: 8
					},
					{
						name: 'potato plant',
						x: 6,
						y: 9
					}
				]
			},
			{
				x: 1,
				y: -1,
				z: 1,
				map: [
					'               ',
					'               ',
					'       z:::::{ ',
					'       wsut[[x ',
					'       w[[[[[x ',
					'       w[[[[[x ',
					'       w[[[[[x ',
					'       w[[sutx ',
					'       w[[[[[x ',
					'       w[[[[[x ',
					'       |²v~v²} ',
					'               ',
					'               ',
					'               '],
				quests: [{
					name: 'Ol\' Philip',
					x: 9,
					y: 5
				}]
			},
			{
				x: 1,
				y: -2,
				z: 0,
				map: [
					'000000000000000',
					'000200µ0000³³³0',
					'0000000000³³³³0',
					'000³³´0³000´³00',
					'00³³³³³³³0000µ0',
					'000´³³³³0000000',
					'00000³³2000020³',
					'³000000000³³³³³',
					'³³³³0000³³³³³³³',
					'³³³³³³³³³³³³³³³',
					'³³³³³³³³³³³³³³0',
					'0´³³³0³³³´0³200',
					'00³,##-³³,####-',
					'###+!9*##+!9!!*'
				],
				enemy: [
					{
						name: 'wraith',
						x: 2,
						y: 5
					},
					{
						name: 'wraith',
						x: 6,
						y: 2
					},
					{
						name: 'wraith',
						x: 8,
						y: 6
					},
					{
						name: 'wraith',
						x: 11,
						y: 5
					},
					{
						name: 'wraith',
						x: 9,
						y: 1
					},
					{
						name: 'wraith',
						x: 4,
						y: 7
					},
					{
						name: 'wraith',
						x: 2,
						y: 1
					}
				]
			},
			{
				x: -4,
				y: 2,
				z: 0,
				map: [
					'ÄÄÄÄÄÄÄÄÄÄÄÄÄº!',
					'ÄÄÄÄÄÄÄÄÄÆÄÄÄº!',
					'ÄÄÄÄÄÄÄÄÆÄÆÄÄº…',
					'ÄÄÅÄÄÄÄÄÅÄÀÁÄº!',
					'ÄÄÄÆÄÆÄÄÄÀ¿»À¿!',
					'ÄÄÄÄÆÆÄÄÄÂ½»º!!',
					'ÄÄÄÄÄÄÄÄÆÄÂÃº!!',
					'ÄÆÄÄÄÄÄÄÄÄÄÄº!!',
					'ÄÄÆÄÄÄÅÄÀÁÄÄº!…',
					'ÄÄÄÄÄÄÄÄÂÃÄÄº!!',
					'ÄÄÄÄÄÆÄÄÄÄÆÀ¿!!',
					'ÄÄÄÄÆÆÆÄÄÄÅº!!!',
					'ÄÄÄÅÆÄÄÄÄÄÄº!!!',
					'ÄÄÄÄÄÄÄÄÄÄÄº!…!'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 1,
						y: 2
					},
					{
						name: 'bloodsand scorpion',
						x: 6,
						y: 3
					},
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 7
					},
					{
						name: 'bloodsand scorpion',
						x: 2,
						y: 11
					},
					{
						name: 'bloodsand scorpion',
						x: 7,
						y: 12
					},
					{
						name: 'bloodsand scorpion',
						x: 10,
						y: 8
					},
					{
						name: 'bloodsand scorpion',
						x: 6,
						y: 9
					},
					{
						name: 'bloodsand scorpion',
						x: 12,
						y: 1
					}
				]
			},
			{
				x: -3,
				y: 2,
				z: 0,
				map: [
					'!!!!!!!!!!!!irr',
					'!!!!!…3!!!1!irr',
					'!!!9!!!!!!11pkr',
					'!1!!($$)1!9!!p‘',
					'!!!(/02.$)!!!!!',
					'!3(/00000.)3!…!',
					'!!&2002002.)!!!',
					'!!&002‰2000%!!!',
					'9!&00000002%!9!',
					'!!*-200000,+!1!',
					'!!!*#-02,#+!31!',
					'!…3!!*##+!!!!!!',
					'!!!19!!3!!91!!!',
					'!!!!!!!!!!!!!!…'
				],
			},
			{
				x: -3,
				y: 2,
				z: -1,
				map: [
					'               ',
					'               ',
					'               ',
					'               ',
					'               ',
					'               ',
					'               ',
					'    ©¥Ç¥ª  ©Èª ',
					'    §ŒŒŒ¨  §Œ¨ ',
					'    §ŒŒŒ°¥¥±Œ¨ ',
					'    §ŒŒŒŒŒŒŒŒ¨ ',
					'    §ŒŒŒ®¦¦¦¦¬ ',
					'    «¦¦¦¬      ',
					'               '],
			},
			{
				x: -3,
				y: 2,
				z: -2,
				map: [
					'               ',
					'  ©¥¥¥¥¥¥¥¥¥¥¥¥',
					'  §ŒŒŒŒŒŒŒŒŒŒŒŒ',
					'  §ŒŒŒŒŒŒ®¦¦¦¦¦',
					'  §ŒŒŒŒŒŒ¨     ',
					'  §ŒŒŒŒŒŒ¨     ',
					'  §ŒŒŒŒŒŒ¨     ',
					'  §ŒŒŒŒŒŒ¨ ©Çª ',
					'  §ŒŒŒŒŒŒ¨ §Œ¨ ',
					'  §ŒŒŒŒŒŒ°¥±Œ¨ ',
					'  §ŒŒŒŒŒŒŒŒŒŒ¨ ',
					'  §ŒŒŒŒŒŒŒŒŒŒ¨ ',
					'  «¦¦¦¦¦¦¦¦¦¦¬ ',
					'               '],
				enemy: [
					{
						name: 'gazer',
						x: 12,
						y: 2
					},
					{
						name: 'gazer',
						x: 5,
						y: 2
					},
					{
						name: 'gazer',
						x: 8,
						y: 5
					},
					{
						name: 'gazer',
						x: 4,
						y: 8
					},
					{
						name: 'gazer',
						x: 7,
						y: 11
					},
					{
						name: 'gazer',
						x: 11,
						y: 10
					}
				]
			},
			{
				x: -2,
				y: 2,
				z: -2,
				map: [
					'©¥¥¥ª©¥¥¥ª©¥Ç¥ª',
					'±ŒŒŒ°±ŒŒŒ¨§ŒŒŒ¨',
					'ŒŒŒŒŒŒŒŒŒ¨§ŒŒŒ¨',
					'¯ŒŒŒ®¯ŒŒŒ¨§ŒŒŒ¨',
					'«¦¦¦¬«¯Œ®¬«¯Œ®¬',
					'©¥¥¥ª©±Œ°ª©±Œ°ª',
					'§ŒŒŒ°±ŒŒŒ°±ŒŒŒ¨',
					'§ŒŒŒŒŒŒŒŒŒŒŒŒŒ¨',
					'§ŒŒŒ®¯ŒŒŒ®¯ŒŒŒ¨',
					'«¯Œ®¬«¦¦¦¬«¦¦¦¬',
					' §Œ°¥¥¥¥¥¥¥¥¥¥¥',
					' §ŒŒŒŒŒŒŒŒŒŒŒŒŒ',
					' «¦¦¦¦¦¦¦¦¦¦¦¦¦',
					'               '
				],
				enemy: [
					{
						name: 'gazer',
						x: 2,
						y: 2
					},
					{
						name: 'gazer',
						x: 7,
						y: 2
					},
					{
						name: 'gazer',
						x: 7,
						y: 7
					},
					{
						name: 'gazer',
						x: 12,
						y: 7
					},
					{
						name: 'gazer',
						x: 12,
						y: 2
					},
					{
						name: 'gazer',
						x: 2,
						y: 7
					},
					{
						name: 'gazer',
						x: 2,
						y: 11
					},
					{
						name: 'gazer',
						x: 7,
						y: 11
					},
					{
						name: 'gazer',
						x: 12,
						y: 11
					}
				]
			},
			{
				x: -2,
				y: 2,
				z: -1,
				map: [
					'          ©¥È¥ª',
					'          §ŒŒŒ¨',
					'          §ŒŒŒ¨',
					'          §ŒŒŒ¨',
					'  ©¥¥¥ª   «¯Œ®¬',
					'  §ŒŒŒ¨    §Œ¨ ',
					'  §ŒŒŒ¨    §Œ¨ ',
					'  §ŒŒŒ¨    §Œ¨ ',
					'  «¯Œ®¬    §Œ¨ ',
					'   §Œ¨     §Œ¨ ',
					'   §Œ°¥¥¥¥¥±Œ¨ ',
					'   §ŒŒŒŒŒŒŒŒŒ¨ ',
					'   «¦¦¦¦¦¦¦¦¦¬ ',
					'               '
				],
				enemy: [
					{
						name: 'gazer',
						x: 12,
						y: 4
					},
					{
						name: 'gazer',
						x: 12,
						y: 8
					},
					{
						name: 'gazer',
						x: 11,
						y: 11
					},
					{
						name: 'gazer',
						x: 7,
						y: 11
					},
					{
						name: 'gazer',
						x: 4,
						y: 10
					}
				],
				interactings: [
					{
						name: 'crystalline chest',
						x: 4,
						y: 6
					}
				]
			},
			{
				x: -1,
				y: 2,
				z: -2,
				map: [
					'               ',
					'               ',
					'               ',
					'   ©¥¥¥¥¥ª     ',
					'   §ŒŒŒŒŒ¨     ',
					'   §ŒŒŒŒŒ¨     ',
					'   §ŒŒŒŒŒ¨     ',
					'   §ŒŒŒŒŒ¨     ',
					'   §ŒŒŒŒŒ¨     ',
					'   §Œ®¦¦¦¬     ',
					'¥¥¥±Œ¨         ',
					'ŒŒŒŒŒ¨         ',
					'¦¦¦¦¦¬         ',
					'               '
				],
				enemy: [
					{
						name: 'gazer',
						x: 4,
						y: 11
					}
				],
				interactings: [
					{
						name: 'enchanted chest',
						x: 6,
						y: 6
					}
				]
			},
			{
				x: -5,
				y: -2,
				z: 0,
				map: [
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÄÆÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÆÄÄÄÄÅÄÄÄÄÆÄÄÄ',
					'ÆÆÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÄÆÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÆÄÄÄÄÆÄÄÄÅÄÄÄÄ',
					'ÆÆÄÄÄÄÄÄÄÄÄÄÆÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÄÄÄÄÄÄÆÄÄÄÄÄÄ',
					'ÄÆÄÄÆÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÆÄÄÄ',
					'ÄÆÄÄÄÄÄÅÄÄÄÄÄÄÄ',
					'ÆÄÄÄÆÄÄÄÄÄÄÄÅÄÄ',
					'ÆÆÄÄÄÄÄÄÄÄÄÄÄÄÄ'
				],
				enemy: [
					{
						name: 'mummy',
						x: 4,
						y: 2
					},
					{
						name: 'bloodsand scorpion',
						x: 11,
						y: 3
					},
					{
						name: 'mummy',
						x: 8,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 3,
						y: 8
					},
					{
						name: 'mummy',
						x: 5,
						y: 11
					},
					{
						name: 'bloodsand scorpion',
						x: 11,
						y: 9
					}
				]
			},
			{
				x: -5,
				y: -1,
				z: 0,
				map: [
					'ÆÆÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÆÆÄÄÄÄÅÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÄÆÄÄÄÄÄÄÄ',
					'ÆÆÄÄÄÄÄÄÄÄÆÄÄÄÄ',
					'ÆÄÆÄÆÄÄÄÄÄÄÄÅÄÄ',
					'ÄÆÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÅÄÄÄÄÆÄÄÄÄ',
					'ÆÆÄÄÆÄÄÄÄÄÄÄÄÄÄ',
					'ÄÆÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÆÆÄÄÄÄÆÄÄÅÄÄÄÄ',
					'ÆÆÄÄÄÄÆÄÄÄÄÄÄÆÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÆÄÄÄÄÄÆÄÄÄÄÄÄÄ',
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 3,
						y: 3
					},
					{
						name: 'bloodsand scorpion',
						x: 7,
						y: 5
					},
					{
						name: 'bloodsand scorpion',
						x: 11,
						y: 4
					},
					{
						name: 'bloodsand scorpion',
						x: 9,
						y: 8
					},
					{
						name: 'bloodsand scorpion',
						x: 2,
						y: 8
					},
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 10
					},
					{
						name: 'bloodsand scorpion',
						x: 9,
						y: 11
					},
					{
						name: 'bloodsand scorpion',
						x: 13,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 2,
						y: 12
					},
					{
						name: 'bloodsand scorpion',
						x: 6,
						y: 2
					}
				]
			},
			{
				x: -5,
				y: 0,
				z: 0,
				map: [
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÆÄÄÄÄÄÆÄÄÄÄÄÄ',
					'ÄÆÄÆÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÆÆÄÄÄÅÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÆÄÄÄ',
					'ÆÄÆÄÄÆÄÄÄÄÄÄÆÄÄ',
					'ÄÆÄÆÄÄÄÄÄÆÄÄÄÄÄ',
					'ÆÄÆÄÄÄÆÄÄÄÄÄÄÄÄ',
					'ÆÆÆÄÄÄÄÄÄÄÄÄÅÄÄ',
					'ÄÆÄÄÄÅÄÄÄÄÄÄÄÄÄ',
					'ÄÆÄÆÄÄÄÄÆÆÄÄÄÄÄ',
					'ÆÄÄÄÄÄÄÄÄÄÄÄÆÄÄ',
					'ÆÆÄÄÄÆÄÄÄÅÄÄÄÄÄ',
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 2
					},
					{
						name: 'mummy',
						x: 6,
						y: 4
					},
					{
						name: 'mummy',
						x: 10,
						y: 3
					},
					{
						name: 'bloodsand scorpion',
						x: 12,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 9,
						y: 8
					},
					{
						name: 'mummy',
						x: 3,
						y: 7
					},
					{
						name: 'mummy',
						x: 5,
						y: 10
					},
					{
						name: 'bloodsand scorpion',
						x: 11,
						y: 11
					}
				]
			},
			{
				x: -5,
				y: 1,
				z: 0,
				map: [
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÄÆÄÆÄÄÄÆÄÄÄÄÄ',
					'ÄÆÆÅÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÆÄÅÄÄÆÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÄÆÄÆÄÄÄÄÄÄÄÄÄ',
					'ÄÄÆÄÄÄÄÆÄÄÄÄÆÄÄ',
					'ÄÆÄÆÄÅÄÄÄÄÄÅÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÄÄÄÄÆÄÄÄÄÆÄÄÄ',
					'ÄÆÄÆÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÆÄÄÄÄÄÄÆÄÄÄÄÄ',
					'ÆÅÄÄÆÄÄÅÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ'
				],
				enemy: [
					{
						name: 'mummy',
						x: 4,
						y: 2
					},
					{
						name: 'mummy',
						x: 6,
						y: 4
					},
					{
						name: 'mummy',
						x: 9,
						y: 2
					},
					{
						name: 'mummy',
						x: 13,
						y: 4
					},
					{
						name: 'mummy',
						x: 9,
						y: 6
					},
					{
						name: 'mummy',
						x: 12,
						y: 8
					},
					{
						name: 'mummy',
						x: 8,
						y: 10
					},
					{
						name: 'mummy',
						x: 2,
						y: 9
					},
					{
						name: 'mummy',
						x: 5,
						y: 11
					}
				]
			},
			{
				x: -5,
				y: 2,
				z: 0,
				map: [
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÄÆÄÄÄÄÄÅÄÄÄÄÄ',
					'ÄÆÅÄÆÄÄÄÄÄÄÄÄÆÄ',
					'ÆÆÆÄÄÄÄÄÄÆÄÄÄÄÄ',
					'ÆÄÆÆÄÅÄÄÄÄÄÄÄÄÄ',
					'ÄÆÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÆÆÄÄÄÄÄÄÄÆÄÄÅÄ',
					'ÆÄÆÄÄÄÆÄÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÄÆÄÄÄÄÄÆÄÄÄÄÄ',
					'ÄÆÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÄÆÄÄÆÄÄÄÄÄÄÆÄÄ',
					'ÆÆÅÆÄÄÄÄÅÄÄÄÄÄÄ',
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ'
				],
				enemy: [
					{
						name: 'mummy',
						x: 5,
						y: 2
					},
					{
						name: 'bloodsand scorpion',
						x: 8,
						y: 4
					},
					{
						name: 'bloodsand scorpion',
						x: 12,
						y: 3
					},
					{
						name: 'mummy',
						x: 11,
						y: 8
					},
					{
						name: 'mummy',
						x: 7,
						y: 9
					},
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 3,
						y: 10
					},
					{
						name: 'mummy',
						x: 10,
						y: 11
					}
				]
			},
			{
				x: -5,
				y: -3,
				z: 0,
				map: [
					'11!111!111!1111',
					'¹11…111!!11!!1!',
					'ÆÆÂ¹¹½1!!!!!!…!',
					'ÆÆÆÄÄÂ¹½1!…!1!!',
					'ÆÄÆÆÄÄÄÂ¹¹¹½!!!',
					'ÄÆÄÄÄÄÆÄÄÄÄÂ¹¹¹',
					'ÄÆÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÅÄÄÄÅÄÆÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÄÆÄÄÆÄÄÄÄÄÄÆÄ',
					'ÄÆÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÄÆÄÄÄÄÅÄÆÄÄÄÄÄ',
					'ÆÆÄÄÆÄÄÄÄÄÄÄÅÄÄ',
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 6
					},
					{
						name: 'mummy',
						x: 9,
						y: 8
					},
					{
						name: 'mummy',
						x: 3,
						y: 11
					},
					{
						name: 'bloodsand scorpion',
						x: 11,
						y: 11
					}
				]
			},
			{
				x: -4,
				y: -3,
				z: 0,
				map: [
					'11!!111!1111!11',
					'!111!!11!…1!11!',
					'!!!11!1111!1!!!',
					'!1!!!1…!1!!!1!!',
					'!!…!!!!1!!!„!!!',
					'¹¹½!!!!!!!1!!!!',
					'ÄÄÂ½!„!1!!!!!!…',
					'ÄÄÄÂ¹½!!!…!!1!!',
					'ÄÄÄÄÄÂ¹¹¹½!!!!!',
					'ÄÆÄÄÄÄÄÄÄÂ¹¹¹½!',
					'ÄÄÄÄÆÄÄÅÄÄÄÄÄÂ¹',
					'ÄÄÄÄÄÄÄÄÄÄÆÄÄÄÄ',
					'ÄÆÄÄÅÄÆÄÄÄÄÄÅÆÄ',
					'ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 2,
						y: 9
					},
					{
						name: 'mummy',
						x: 7,
						y: 11
					},
					{
						name: 'bloodsand scorpion',
						x: 11,
						y: 11
					}
				]
			},
			{
				x: -3,
				y: -3,
				z: 0,
				map: [
					'11!!111&³³³0³0³',
					'!1111!!1-³0³³³³',
					'!!1!1!1!&2³³³0³',
					'„!!!!!…!*-µ³0³0',
					'!1!!1!!€!*-0³20',
					'!!!!!!!!!!*-³³0',
					'!!1!!!!!!!!*-0³',
					'!3!!!1!!3!!!*##',
					'!!!!!!!!!1!!!!!',
					'!!!€!!!„!!!!€!!',
					'¹½!!…!!!!!!…!!!',
					'ÄÂ½!!!1!!!3!!1!',
					'ÄÅº!!!!!…!!!!!!',
					'ÄÄÂ½!!!!!!!!!!!'
				],
			},
			{
				x: -2,
				y: -3,
				z: 0,
				map: [
					'³³³0³³³³00³³³0³',
					'³00³³³0³³³0³0³³',
					'³³³³0³³³³00³³0³',
					'00³200³00³³0³³0',
					'0000´00³0000´20',
					'0³0000000³00000',
					'³³³³0³000200000',
					'#-³³³000000³³00',
					'!&µ0³³0³´00³³³0',
					'!1-³0³³³0000³00',
					'!…&0³³0³0³00000',
					'!!&µ0³³0³³00200',
					'!!1-³0µ³00³0000',
					'!!!&0000³³0³³³³'
				],
				enemy: [
					{
						name: 'wraith',
						x: 2,
						y: 5
					},
					{
						name: 'wraith',
						x: 8,
						y: 3
					},
					{
						name: 'wraith',
						x: 6,
						y: 7
					},
					{
						name: 'wraith',
						x: 12,
						y: 5
					},
					{
						name: 'wraith',
						x: 10,
						y: 10
					},
					{
						name: 'wraith',
						x: 13,
						y: 11
					},
					{
						name: 'wraith',
						x: 5,
						y: 3
					}
				]
			},
			{
				x: -1,
				y: -3,
				z: 0,
				map: [
					'³³³0³³³00³³0³³³',
					'³0³³³0³³³00³00³',
					'³00³³³0³0³³0³³³',
					'000³µ00000³0020',
					'0200000´0000000',
					'00000000000³000',
					'00µ³´³000³0³³µ0',
					'00³³³³000³³³´00',
					'000³³³³02000000',
					'0´0000³0000³³00',
					'0000000000³0µ00',
					'00³00³00³³³³³00',
					'0³³³³0002³³³³³0',
					'³³³³³³³0³³³³³³³'
				],
				enemy: [
					{
						name: 'wraith',
						x: 3,
						y: 10
					},
					{
						name: 'wraith',
						x: 9,
						y: 8
					},
					{
						name: 'wraith',
						x: 6,
						y: 6
					},
					{
						name: 'wraith',
						x: 9,
						y: 4
					},
					{
						name: 'wraith',
						x: 4,
						y: 4
					},
					{
						name: 'wraith',
						x: 1,
						y: 2
					},
					{
						name: 'wraith',
						x: 1,
						y: 6
					},
					{
						name: 'wraith',
						x: 13,
						y: 9
					},
					{
						name: 'wraith',
						x: 12,
						y: 3
					}
				]
			},
			{
				x: 0,
				y: -3,
				z: 0,
				map: [
					'³³³³0³³³0³³³³0³',
					'³³0³³³0³³0³0³³0',
					'³0³³³0³³³³³³³0³',
					'000³00002³³µ0³0',
					'000000´00000000',
					'020³00000000³00',
					'00³³µ000000³³³0',
					'00³000³³0³0³³³0',
					'00000³³µ0³02³00',
					'0´00³³³³00000´0',
					'00000³³³³0³³000',
					'00³000³³00³³³00',
					'00³³00´0020³000',
					'³00000000000000'
				],
				enemy: [
					{
						name: 'wraith',
						x: 2,
						y: 4
					},
					{
						name: 'wraith',
						x: 4,
						y: 7
					},
					{
						name: 'wraith',
						x: 9,
						y: 5
					},
					{
						name: 'wraith',
						x: 12,
						y: 9
					},
					{
						name: 'wraith',
						x: 8,
						y: 11
					},
					{
						name: 'wraith',
						x: 1,
						y: 11
					}
				]
			},
			{
				x: 1,
				y: -3,
				z: 0,
				map: [
					'³³³00³³0³³³0³³³',
					'0³0³³0³³00³³³³0',
					'³³³0³³0³³³µ³0³³',
					'0³µ³0000³0³00´0',
					'000000200000000',
					'020³³00000³´000',
					'000³³³0³³000³00',
					'00³³³µ00³µ00000',
					'0´³³³00³³³02000',
					'000000³³³³000³0',
					'000³000³0000³³0',
					'00³³0´0000³³³00',
					'00³³³00020³³µ00',
					'000000000000000'
				],
				enemy: [
					{
						name: 'wraith',
						x: 2,
						y: 5
					},
					{
						name: 'wraith',
						x: 5,
						y: 3
					},
					{
						name: 'wraith',
						x: 9,
						y: 5
					},
					{
						name: 'wraith',
						x: 13,
						y: 7
					},
					{
						name: 'wraith',
						x: 5,
						y: 9
					},
					{
						name: 'wraith',
						x: 9,
						y: 11
					},
					{
						name: 'wraith',
						x: 1,
						y: 11
					}
				]
			},
			{
				x: 2,
				y: -3,
				z: 0,
				map: [
					'³0³³0³³³³0³³³0³',
					'0´µ³³³0³0³³³0³³',
					'³00µ³0³³³³0³³0³',
					'0000020³00³0µ³0',
					'00´00000000³³0³',
					'020000³³³200³0³',
					'000³00µ³³³000³³',
					'0³³³³000³00³0³0',
					'0³³³³0´000³µ³0³',
					'0µ³³00000000³³³',
					'00³200³³00000³0',
					'000000³³³00³³³³',
					'0000´00³³200³0³',
					'0000000000000³³'
				],
				enemy: [
					{
						name: 'wraith',
						x: 2,
						y: 3
					},
					{
						name: 'wraith',
						x: 5,
						y: 6
					},
					{
						name: 'wraith',
						x: 9,
						y: 4
					},
					{
						name: 'wraith',
						x: 10,
						y: 10
					},
					{
						name: 'wraith',
						x: 6,
						y: 12
					},
					{
						name: 'wraith',
						x: 2,
						y: 11
					},
					{
						name: 'wraith',
						x: 12,
						y: 6
					}
				]
			},
			{
				x: 2,
				y: -2,
				z: 0,
				map: [
					'0000000000000³³',
					'000000200³³000³',
					'0³³00³000³µ0³³³',
					'0³³³0³³³000³³³0',
					'00³2µ³³³00000³³',
					'00000³³000µ³³2,',
					'000000000³0³³0%',
					'³0³´020³³³³³³µ%',
					'³³³0³0³³³³³³00%',
					'³³³³³³³³³00µ2,+',
					'³³³³³³³0µ0,##11',
					'0µµ³00´,##+„111',
					'000µ,##+!!€!!11',
					'####+!!„!!!!1!1'
				],
				enemy: [
					{
						name: 'wraith',
						x: 2,
						y: 5
					},
					{
						name: 'wraith',
						x: 6,
						y: 6
					},
					{
						name: 'wraith',
						x: 4,
						y: 2
					},
					{
						name: 'wraith',
						x: 8,
						y: 1
					},
					{
						name: 'wraith',
						x: 9,
						y: 4
					},
					{
						name: 'wraith',
						x: 11,
						y: 1
					}
				]
			},
			{
				x: 2,
				y: -1,
				z: 0,
				map: [
					'!!!!!!!!!!!!1!1',
					'!!!!!1ƒ1!€!!111',
					'!!!!1111!!!11!1',
					'!!3!8111!!11811',
					'!!!ƒ!!1!!113!1!',
					'!!!!!!!91111111',
					'!!€!!!111111!!1',
					'!!!!!111111!!11',
					'!!!11!11!1!!1!1',
					'!!!!!!1!!!!!1!1',
					'!!8!!!!!!191!11',
					'!!!!€3!!11!111!',
					'!!!!9!!!!1111!1',
					'!!!!!!!!!!81!11'
				],
			},
			{
				x: 2,
				y: 0,
				z: 0,
				map: [
					'!!!!!!!!!!!1!11',
					'!„!!€!„1!!!!1!1',
					'!!!!!!111!€…1!1',
					'!!1…!111!!!!111',
					'!111!!1!1!3!!1!',
					'!!13!!„!!1!11!1',
					'!!!!!!!!1111!11',
					'!€!!!1!!!111111',
					'!!!!111!!!11!1„',
					'!!„111!!!!!…11!',
					'1!1!!!!!1!!11!1',
					'1111!…!11!!!111',
					'111!3!!1!!€„!1!',
					'11!!!!!!!!!!1!1'
				],
			},
			{
				x: 2,
				y: 1,
				z: 0,
				map: [
					'11!!!!!!!!!!1!1',
					'111„!!!8!!3!!1!',
					'11111!!!1!!!111',
					'1111!!€11„!11!1',
					'111!!!11!!!181!',
					'111!1„!!!!!1!11',
					'11111!3!111!1!1',
					'1111!!!!1€!11!1',
					'1118!!!!!!!111!',
					'111111!!!!„!!1!',
					'11111!!1!11!111',
					'111€!!!111!!1!1',
					'111!!!„!11!1!11',
					'11!!8!!!!!!!1!1'
				],
			},
			{
				x: 2,
				y: 2,
				z: 0,
				map: [
					'11!!!!!!!!!!1!1',
					'1!!1!!…11!…11!1',
					'!!111!!111!!111',
					'!…111!!311!!!1!',
					'!!€1!!!!€!!!111',
					'!!!!!11!!!1!1!1',
					'!!!1111!!!!1111',
					'!€!111!…!€!!11!',
					'!!!!13!!!!!!…11',
					'!!!!!…!!1!!11!1',
					'!…11!!!111!3111',
					'!1111!111!!!11!',
					'!311!!113!…1!11',
					'!!!!…!!!!!!!!11'
				],
			},
			{
				x: 2,
				y: 3,
				z: 0,
				map: [
					'!!!!!!!!!!…!!11',
					'!9!1!!!€!13!1!1',
					'!!111ƒ!!!!!!111',
					'!1111!…1!!91!!1',
					'!€113!111!!1111',
					'!!!…!!111ƒ!!11!',
					'!!!119!1!!!1!11',
					'!!1111!€1!9!1!1',
					'!9!111!!!3!1111',
					'!€!!!!!!…!!!1!1',
					'!!!1!9111!11!11',
					'1!1311!1!11!11!',
					'!11…1!1!11!1!11',
					'1111!1111!11111'
				],
			},
			{
				x: 1,
				y: 2,
				z: 0,
				map: [
					'111111111111111',
					'111111111111111',
					'111ƒ!111111111!',
					'!311!!1111311€!',
					'!!!€!!!ƒ19!!„!!',
					'!!!!!!!!!!!!!!!',
					'!93!!1„!!€!1!19',
					'!!!!1111!!!111!',
					'!!1!1111!!111!!',
					'!11!9€1!!1111!„',
					'!11€!!!„!111€!!',
					'!111!!ƒ!11113!!',
					'!31„!ƒ!!!11„!!!',
					'!!!!!!!!9!!!!!!'
				],
			},
			{
				x: 0,
				y: 2,
				z: 0,
				map: [
					'111111111111111',
					'111111111111111',
					'!11111111!11!11',
					'1!111ƒ!1111!1!!',
					'!!€1!!11!!1!!!!',
					'!!!!!!9!!8!!1€!',
					'!8!!!1!!!€!!!9!',
					'!!!!1111!!!!!!!',
					'!!!1111ƒ!!111!!',
					'!!!9€1!!!11111!',
					'!!1!!8!!9!1118!',
					'!111!!!1!!1ƒ€!!',
					'!ƒ119!111!8!!!!',
					'!!!!!!!!!!!!!!!'
				],
			},
			{
				x: -1,
				y: 2,
				z: 0,
				map: [
					'!!!!!!!!!!!!111',
					'!!!!!!!3!!9!111',
					'!!!11„!!!!1!!1!',
					'!9111!€!!111!„1',
					'!!ƒ1!!!!1111!!!',
					'!!!!!!!9!11!!€!',
					'!!!!!11!!€!!1!!',
					'!3!!1111!!!111!',
					'!!!111113!„111!',
					'!!!9!1ƒ!!!1119!',
					'!!1!!!1!!!!ƒ1!!',
					'!111!!!!11!!!!!',
					'!!1ƒ„!€!111!!3!',
					'!!!!!!!!!!!9!!!'
				],
			},
			{
				x: -2,
				y: 2,
				z: 0,
				map: [
					'rrrrrrrr’!!!!!!',
					'rrrrrj‘‘q!!91!!',
					'rrj‘‘q!!€!!!!…!',
					'‘‘q!!!!!!!!!!€!',
					'!!!!!…3!!!11!!!',
					'!!9!!!!!!11…!!!',
					'!!!!!!!€!!!!!!!',
					'!3!!1!!!!93!1!!',
					'!!!11!!!!!!!!…!',
					'!!!!!!!!!!!!!!!',
					'!!!!!9!!1!!!!!!',
					'!!1€!!3!€11!93!',
					'!9!!!!!!!1!!!!!',
					'!!!!!!!…!!!!!!!'
				],
			},
			{
				x: 1,
				y: 3,
				z: 0,
				map: [
					'!!!!!!!!!!!!!!!',
					'!!!!!!!111!€1!!',
					'!!11!„111!!„11!',
					'!1111!!1!!!!!9!',
					'!„1111!9!!1!!€!',
					'!!311ƒ!!!111!„!',
					'!!!!1!!!1111!!!',
					'!!1!!!€!„13!11!',
					'!1119!!!!!9!1!!',
					'!3111!!!1!!€!!!',
					'!!!!!„1!!!!„!1!',
					'!!1!11!11!1!111',
					'1111!111!1111!!',
					'!1!111!111!1111'
				],
			},
			{
				x: 0,
				y: 3,
				z: 0,
				map: [
					'!!!!!!!!!!!!!!!',
					'!!111!!8!111„€!',
					'!111111!1111!!!',
					'!!ƒ1131!!11ƒ1!!',
					'!!„!1!!!!!3!8!!',
					'!!!!!!€!!!!!!!!',
					'!€!!!!!8!11!!€!',
					'!!!111!!1111!!!',
					'!!11111!31ƒ11!!',
					'!!!ƒ1!!!!„1!!8!',
					'!3„!!81!!!!8!1!',
					'!!1!!1111!1!11!',
					'11!111!11111111',
					'!111!!11!111!1!'
				],
			},
			{
				x: -1,
				y: 3,
				z: 0,
				map: [
					'!!!!!!!!!!!!!!!',
					'!!!!1!!€„!8!!€!',
					'!!1111!!!!!1!!!',
					'!!!18!!!ƒ!!!ƒ!!',
					'!„!!!!!ƒƒ!!!„!!',
					'!!!!!1!!!81!!€!',
					'!3!!!!„€!111!!!',
					'ŽŽŽŽo3!!!!113!!',
					'rrrrlŽŽo!!!ƒ!!!',
					'rrrrrrrlŽŽo!8!„',
					'rrj‘krrrrrlŽŽo!',
					'rjqnmrrrrrrrrlo',
					'rlŽmrrrrrrrrrr1',
					'rrrrrrrrrrrrrr’'
				],
			},
			{
				x: -2,
				y: 3,
				z: 0,
				map: [
					'!!!!!!!!!!!!!!!',
					'!€!!!9!!!!81ƒ!!',
					'!!!1!!€!!!!!!8!',
					'!9!ƒ1!!!!1!9€!!',
					'!!!!8!!!11ƒ!!!!',
					'!!11!39!!!!!1!!',
					'!1!nŽŽŽŽŽŽo3!!!',
					'ŽŽŽmrrrrrrlŽŽŽŽ',
					'rrrrrrrrrrrrrrr',
					'rrrrrj‘krrrrrrr',
					'rrrrjq!1krrrrrr',
					'rrrr’…11pkrrrrr',
					'rrrrlo!…nmrrrrr',
					'rrrrrlŽŽmrrrrrr'
				],
			},
			{
				x: -3,
				y: 3,
				z: 0,
				map: [
					'!!!!!!!9!!!!!!!',
					'!!!!…!!!!1!!ƒ!!',
					'!!1!!!1!!!€!!9!',
					'!ƒ!!!ƒ11!9!!!!!',
					'!…€!!9ƒ!!!!1!…!',
					'!!!!1!!!!…11ƒ!!',
					'!!9!!!!!€!!ƒ!3!',
					'!!!!3!ƒ9!!nŽŽŽŽ',
					'!11…!!nŽŽŽmrrrr',
					'!!13nŽmrrrrrrrr',
					'!!nŽmrrrrrrrrrr',
					'!nmrrrrrjkrrrrr',
					'Žmrrrrrrlmrrrrr',
					'rrrrrrrrrrrrrrr'
				],
			},
			{
				x: -4,
				y: 3,
				z: 0,
				map: [
					'ÄÄÄÄÄÄÄÄÄÄÄº…!!',
					'ÄÄÅÄÄÆÄÄÄÄÄº!1!',
					'ÄÄÄÄÄÄÄÄÄÅÀ¿!!!',
					'ÄÄÄÆÄÄÄÄÄÄº!€!…',
					'ÄÄÄÄÄÄÄÄÄÀ¿!!!!',
					'ÄÆÄÄÄÆÄÄÄº!…!1!',
					'ÄÄÄÄÄÄÄÄÆº!!!!!',
					'ÄÅÄÆÄÄÄÄÄÂ½!!€!',
					'ÄÄÄÄÄÄÅÄÄÄº1!…!',
					'ÄÄÄÄÄÄÄÄÄÄÂ½!!!',
					'ÄÆÄÄÆÄÄÆÄÄÄº11!',
					'ÆÄÆÆÆÄÆÄÄÄÄº!!!',
					'ÆÆÆÄÆÆÄÆÆÆÆÂ½nŽ',
					'ÆÄÆÆÄÆÆÄÆÆÄÆÆ1r'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 1,
						y: 8
					},
					{
						name: 'bloodsand scorpion',
						x: 5,
						y: 10
					},
					{
						name: 'bloodsand scorpion',
						x: 8,
						y: 7
					},
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 5
					},
					{
						name: 'bloodsand scorpion',
						x: 8,
						y: 3
					},
					{
						name: 'bloodsand scorpion',
						x: 3,
						y: 1
					}
				]
			},
			{
				x: -5,
				y: 3,
				z: 0,
				map: [
					'ÆÄÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÄÆÆÄÄÆÄÄÅÄÄÄÆÄÄ',
					'ÆÆÄÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÄÄÄÄÄ',
					'ÆÆÆÆÄÅÄÄÄÄÆÄÄÄÄ',
					'ÄÆÄÄÄÄÄÄÄÄÄÄÄÅÄ',
					'ÆÄÆÄÄÄÄÄÆÄÄÄÄÄÄ',
					'ÆÆÄÆÄÄÄÄÄÄÄÄÄÆÄ',
					'ÄÆÄÄÆÄÄÄÄÅÄÄÄÄÄ',
					'ÄÆÆÄÆÄÆÄÄÄÄÄÄÄÄ',
					'ÆÄÆÄÄÄÄÄÄÄÆÄÄÄÄ',
					'ÆÆÄÆÄÆÆÄÆÄÆÆÆÄÆ',
					'ÆÄÆÆÆÄÆÆÆÆÆÄÆÆÆ',
					'ÄÆÆÄÆÆÆÆÄÆÆÆÄÄÆ'
				],
				enemy: [
					{
						name: 'bloodsand scorpion',
						x: 4,
						y: 10
					},
					{
						name: 'mummy',
						x: 8,
						y: 9
					},
					{
						name: 'mummy',
						x: 3,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 6,
						y: 3
					},
					{
						name: 'mummy',
						x: 3,
						y: 1
					},
					{
						name: 'mummy',
						x: 11,
						y: 2
					},
					{
						name: 'bloodsand scorpion',
						x: 12,
						y: 6
					},
					{
						name: 'bloodsand scorpion',
						x: 13,
						y: 10
					}
				]
			}
		];
		/*
		'template': {
			name: 'template',
			type: 'type',
			image: templateImage,
			animation: templateAnimation, // clothing only
			armor: 0, // clothing only
			health: 0, // food and necklace only
			energy: 0, // ring and drink only
			buy: 0,
			sell: 0,
			slots: 0, // bags only
			amount: 0, // not necessary unless a starting item,
			teaches: 'nothing' // ability scrolls only
			damage: {
				min: 0,
				max: 0
			} // weapons only
		}
		*/
		var items = {
			'brown pants': {
				name: 'brown pants',
				type: 'pants',
				image: brownPants,
				animation: brownPantsAnimation,
				armor: 10,
				buy: 23,
				sell: 17
			},
			'blue feather': {
				name: 'blue feather',
				image: blueFeather,
				type: 'junk',
				buy: 37,
				sell: 19
			},
			'feather': {
				name: 'feather',
				image: feather,
				type: 'junk',
				buy: 29,
				sell: 15
			},
			'paper airplane': {
				name: 'paper airplane',
				image: paperAirplane,
				type: 'junk',
				buy: 39,
				sell: 21
			},
			'swallow egg': {
				name: 'swallow egg',
				image: swallowEgg,
				type: 'junk',
				buy: 35,
				sell: 17
			},
			'blessing of the falcon': {
				name: 'blessing of the falcon',
				teaches: 'blessing of the falcon',
				type: 'spell',
				image: blessingOfTheFalcon,
				buy: 136,
				sell: 89
			},
			'ni': {
				name: 'ni',
				teaches: 'ni',
				type: 'spell',
				image: ni,
				buy: 136,
				sell: 89
			},
			'water bottle': {
				name: 'water bottle',
				image: waterBottle,
				type: 'drink',
				energy: 15,
				buy: 20,
				sell: 10,
				amount: 10
			},
			'short brown hair': {
				name: 'short brown hair',
				type: 'hair',
				animation: shortBrownHair
			},
			'short black hair': {
				name: 'short black hair',
				type: 'hair',
				animation: shortBlackHair
			},
			'short blond hair': {
				name: 'short blond hair',
				type: 'hair',
				animation: shortBlondHair
			},
			'short sandy hair': {
				name: 'short sandy hair',
				type: 'hair',
				animation: shortSandyHair
			},
			'short dark blue hair': {
				name: 'short dark blue hair',
				type: 'hair',
				animation: shortDarkBlueHair
			},
			'short light blue hair': {
				name: 'short light blue hair',
				type: 'hair',
				animation: shortLightBlueHair
			},
			'short purple hair': {
				name: 'short purple hair',
				type: 'hair',
				animation: shortPurpleHair
			},
			'short pink hair': {
				name: 'short pink hair',
				type: 'hair',
				animation: shortPinkHair
			},
			'short orange hair': {
				name: 'short orange hair',
				type: 'hair',
				animation: shortOrangeHair
			},
			'short dark green hair': {
				name: 'short dark green hair',
				type: 'hair',
				animation: shortDarkGreenHair
			},
			'short light green hair': {
				name: 'short light green hair',
				type: 'hair',
				animation: shortLightGreenHair
			},
			'short gray hair': {
				name: 'short gray hair',
				type: 'hair',
				animation: shortGrayHair
			},
			'short red hair': {
				name: 'short red hair',
				type: 'hair',
				animation: shortRedHair
			},
			'long black hair': {
				name: 'long black hair',
				type: 'hair',
				animation: longBlackHair
			},
			'long blond hair': {
				name: 'long blond hair',
				type: 'hair',
				animation: longBlondHair
			},
			'long sandy hair': {
				name: 'long sandy hair',
				type: 'hair',
				animation: longSandyHair
			},
			'long brown hair': {
				name: 'long brown hair',
				type: 'hair',
				animation: longBrownHair
			},
			'long dark blue hair': {
				name: 'long dark blue hair',
				type: 'hair',
				animation: longDarkBlueHair
			},
			'long red hair': {
				name: 'long red hair',
				type: 'hair',
				animation: longRedHair
			},
			'long light blue hair': {
				name: 'long light blue hair',
				type: 'hair',
				animation: longLightBlueHair
			},
			'long purple hair': {
				name: 'long purple hair',
				type: 'hair',
				animation: longPurpleHair
			},
			'long pink hair': {
				name: 'long pink hair',
				type: 'hair',
				animation: longPinkHair
			},
			'long orange hair': {
				name: 'long orange hair',
				type: 'hair',
				animation: longOrangeHair
			},
			'long dark green hair': {
				name: 'long dark green hair',
				type: 'hair',
				animation: longDarkGreenHair
			},
			'long light green hair': {
				name: 'long light green hair',
				type: 'hair',
				animation: longLightGreenHair
			},
			'long gray hair': {
				name: 'long gray hair',
				type: 'hair',
				animation: longGrayHair
			},
			'spiked black hair': {
				name: 'spiked black hair',
				type: 'hair',
				animation: spikedBlackHair
			},
			'spiked blond hair': {
				name: 'spiked blond hair',
				type: 'hair',
				animation: spikedBlondHair
			},
			'spiked sandy hair': {
				name: 'spiked sandy hair',
				type: 'hair',
				animation: spikedSandyHair
			},
			'spiked brown hair': {
				name: 'spiked brown hair',
				type: 'hair',
				animation: spikedBrownHair
			},
			'spiked red hair': {
				name: 'spiked red hair',
				type: 'hair',
				animation: spikedRedHair
			},
			'spiked dark blue hair': {
				name: 'spiked dark blue hair',
				type: 'hair',
				animation: spikedDarkBlueHair
			},
			'spiked light blue hair': {
				name: 'spiked light blue hair',
				type: 'hair',
				animation: spikedLightBlueHair
			},
			'spiked purple hair': {
				name: 'spiked purple hair',
				type: 'hair',
				animation: spikedPurpleHair
			},
			'spiked pink hair': {
				name: 'spiked pink hair',
				type: 'hair',
				animation: spikedPinkHair
			},
			'spiked orange hair': {
				name: 'spiked orange hair',
				type: 'hair',
				animation: spikedOrangeHair
			},
			'spiked dark green hair': {
				name: 'spiked dark green hair',
				type: 'hair',
				animation: spikedDarkGreenHair
			},
			'spiked light green hair': {
				name: 'spiked light green hair',
				type: 'hair',
				animation: spikedLightGreenHair
			},
			'spiked gray hair': {
				name: 'spiked gray hair',
				type: 'hair',
				animation: spikedGrayHair
			},
			'brown pack': {
				name: 'brown pack',
				type: 'bag',
				image: brownPack,
				slots: 12,
				buy: 1000,
				sell: 800
			},
			'small sack': {
				name: 'small sack',
				type: 'bag',
				image: smallSack,
				slots: 4,
				buy: 120,
				sell: 48
			},
			'blue jeans': {
				name: 'blue jeans',
				type: 'pants',
				image: blueJeans,
				animation: blueJeansAnimation,
				armor: 5,
				buy: 8,
				sell: 2
			},
			'ugly yellow shirt': {
				name: 'ugly yellow shirt',
				type: 'shirt',
				image: yellowShirt,
				animation: yellowShirtAnimation,
				armor: 7,
				buy: 10,
				sell: 5
			},
			'roger shirt': {
				name: 'roger shirt',
				type: 'shirt',
				image: rogerShirt,
				animation: rogerShirtAnimation,
				armor: 12,
				buy: 20,
				sell: 12
			},
			'red shirt': {
				name: 'red shirt',
				type: 'shirt',
				image: redShirt,
				animation: redShirtAnimation,
				armor: 10,
				buy: 11,
				sell: 4
			},
			'blue shirt': {
				name: 'blue shirt',
				type: 'shirt',
				image: blueShirt,
				animation: blueShirtAnimation,
				armor: 8,
				buy: 10,
				sell: 3
			},
			'green shirt': {
				name: 'green shirt',
				type: 'shirt',
				image: greenShirt,
				animation: greenShirtAnimation,
				armor: 12,
				buy: 14,
				sell: 5
			},
			'black shirt': {
				name: 'black shirt',
				type: 'shirt',
				image: blackShirt,
				animation: blackShirtAnimation,
				armor: 10,
				buy: 7,
				sell: 3
			},
			'The Lord of the Rings': {
				name: 'The Lord of the Rings',
				type: 'book',
				image: theLordOfTheRings,
				buy: 390,
				sell: 128
			},
			'black boots': {
				name: 'black boots',
				type: 'boots',
				image: blackBoots,
				animation: blackBootsAnimation,
				armor: 4,
				buy: 10,
				sell: 6
			},
			'black pants': {
				name: 'black pants',
				type: 'pants',
				image: blackPants,
				animation: blackPantsAnimation,
				armor: 12,
				buy: 18,
				sell: 9
			},
			'green crocs': {
				name: 'green crocs',
				type: 'boots',
				image: greenCrocs,
				animation: greenCrocsAnimation,
				armor: 2,
				buy: 5,
				sell: 1
			},
			'tan shoes': {
				name: 'tan shoes',
				type: 'boots',
				image: tanShoes,
				animation: tanShoesAnimation,
				armor: 5,
				buy: 12,
				sell: 7
			},
			'red sneakers': {
				name: 'red sneakers',
				type: 'boots',
				image: redSneakers,
				animation: redSneakersAnimation,
				armor: 5,
				buy: 10,
				sell: 4
			},
			'chipped cutlass': {
				name: 'chipped cutlass',
				type: 'weapon',
				image: chippedCutlass,
				damage: {
					min: 3,
					max: 10
				},
				buy: 13,
				sell: 5
			},
			'fly swatter': {
				name: 'fly swatter',
				type: 'weapon',
				image: flySwatter,
				damage: {
					min: 5,
					max: 18
				},
				buy: 23,
				sell: 13
			},
			'broad sword': {
				name: 'broad sword',
				type: 'weapon',
				image: broadSword,
				damage: {
					min: 10,
					max: 28
				},
				buy: 109,
				sell: 78
			},
			'smoked ham': {
				name: 'smoked ham',
				type: 'food',
				image: smokedHam,
				buy: 18,
				sell: 10,
				health: 15,
				amount: 10
			},
			'strange mushroom': {
				name: 'strange mushroom',
				type: 'food',
				image: strangeMushroom,
				buy: 32,
				sell: 15,
				health: 20
			},
			'raw bat meat': {
				name: 'raw bat meat',
				type: 'food',
				image: rawBatMeat,
				buy: 16,
				sell: 12,
				health: 9
			},
			'glowing rune': {
				name: 'glowing rune',
				type: 'spell',
				image: glowingRune,
				buy: 100,
				sell: 30,
				teaches: 'shadowstrike',
			},
			'steel breastplate': {
				name: 'steel breastplate',
				type: 'shirt',
				image: steelBreastplate,
				animation: steelBreastplateAnimation,
				armor: 23,
				buy: 170,
				sell: 25
			},
			'steel boots': {
				name: 'steel boots',
				type: 'boots',
				image: steelBoots,
				animation: steelBootsAnimation,
				armor: 17,
				buy: 110,
				sell: 18
			},
			'steel helmet': {
				name: 'steel helmet',
				type: 'helmet',
				image: steelHelmet,
				animation: steelHelmetAnimation,
				armor: 18,
				buy: 150,
				sell: 40
			},
			'red mask': {
				name: 'red mask',
				type: 'helmet',
				image: redMask,
				animation: redMaskAnimation,
				armor: 12,
				buy: 124,
				sell: 67
			},
			'steel leggings': {
				name: 'steel leggings',
				type: 'pants',
				image: steelLeggings,
				animation: steelLeggingsAnimation,
				armor: 22,
				buy: 202,
				sell: 48
			},
			'stuffed winston': {
				name: 'stuffed winston',
				type: 'collectable',
				image: stuffedWinston,
				buy: 35,
				sell: 10
			},
			'school backpack': {
				name: 'school backpack',
				type: 'bag',
				image: backpack,
				slots: 8,
				buy: 346,
				sell: 198
			},
			'purple pebble': {
				name: 'purple pebble',
				type: 'junk',
				image: purplePebble,
				sell: 3,
				buy: 6
			},
			'tattered rags': {
				name: 'tattered rags',
				type: 'junk',
				image: tatteredRags,
				sell: 4,
				buy: 8
			},
			'spark of darkness': {
				name: 'spark of darkness',
				type: 'junk',
				image: sparkOfDarkness,
				sell: 12,
				buy: 19
			},
			'sharp fang': {
				name: 'sharp fang',
				type: 'junk',
				image: sharpFang,
				sell: 6,
				buy: 10
			},
			'leathery wing': {
				name: 'leathery wing',
				type: 'junk',
				image: leatheryWing,
				sell: 10,
				buy: 19
			},
			'staring eye': {
				name: 'staring eye',
				type: 'junk',
				image: staringEye,
				sell: 9,
				buy: 17
			},
			'lesser ring': {
				name: 'lesser ring',
				type: 'ring',
				image: lesserRing,
				sell: 47,
				buy: 102,
				energy: 25
			},
			'sapphire ring': {
				name: 'sapphire ring',
				type: 'ring',
				image: sapphireRing,
				buy: 157,
				sell: 83,
				energy: 50
			},
			'stagnant water': {
				name: 'stagnant water',
				image: stagnantWater,
				type: 'drink',
				energy: 15,
				buy: 18,
				sell: 9,
			},
			'water skin': {
				name: 'water skin',
				image: waterSkin,
				type: 'drink',
				energy: 25,
				buy: 37,
				sell: 19,
			},
			'bucket of milk': {
				name: 'bucket of milk',
				image: bucketOfMilk,
				type: 'drink',
				energy: 25,
				buy: 37,
				sell: 19,
			},
			'gloomblade': {
				name: 'gloomblade',
				type: 'weapon',
				image: gloomBlade,
				damage: {
					min: 7,
					max: 21
				},
				buy: 109,
				sell: 78
			},
			'dull dagger': {
				name: 'dull dagger',
				type: 'weapon',
				image: dagger,
				damage: {
					min: 12,
					max: 19
				},
				buy: 126,
				sell: 82
			},
			'black gloves': {
				name: 'black gloves',
				type: 'gloves',
				image: blackGloves,
				animation: blackGlovesAnimation,
				armor: 15,
				buy: 89,
				sell: 44
			},
			'coconut': {
				name: 'coconut',
				type: 'food',
				image: coconut,
				buy: 32,
				sell: 10,
				health: 25,
			},
			'strand of creeper': {
				name: 'strand of creeper',
				type: 'junk',
				image: strandOfCreeper,
				sell: 15,
				buy: 20
			},
			'the holy hand grenade': {
				name: 'the holy hand grenade',
				type: 'weapon',
				image: theHolyHandGrenade,
				damage: {
					min: 18,
					max: 49
				},
				buy: 307,
				sell: 120
			},
			'mail coif': {
				name: 'mail coif',
				type: 'helmet',
				image: mailCoif,
				animation: mailCoifAnimation,
				armor: 20,
				buy: 175,
				sell: 100
			},
			'book of armaments': {
				name: 'book of armaments',
				type: 'spell',
				image: bookOfArmaments,
				buy: 170,
				sell: 80,
				teaches: 'a mere fleshwound',
			},
			'tuft of rabbit fur': {
				name: 'tuft of rabbit fur',
				type: 'junk',
				image: tuftOfRabbitFur,
				buy: 18,
				sell: 23,
			},
			'carrot': {
				type: 'food',
				name: 'carrot',
				image: carrot,
				buy: 37,
				sell: 16,
				health: 35,
			},
			'potato': {
				type: 'food',
				name: 'potato',
				image: potato,
				buy: 37,
				sell: 16,
				health: 20,
			},
			'silver necklace': {
				name: 'silver necklace',
				type: 'necklace',
				health: 35,
				buy: 243,
				sell: 125,
				image: silverNecklace
			},
			'easter egg': {
				name: 'easter egg',
				type: 'collectable',
				buy: 0,
				sell: 0,
				image: easterEgg
			},
			'steel greathelm': {
				name: 'steel greathelm',
				type: 'helmet',
				image: steelGreatHelm,
				animation: steelGreatHelmAnimation,
				armor: 38,
				buy: 227,
				sell: 126
			},
			'chalice': {
				name: 'chalice',
				type: 'junk',
				image: chalice,
				buy: 197,
				sell: 79
			},
			'crude idol': {
				name: 'crude idol',
				type: 'junk',
				image: crudeIdol,
				buy: 40,
				sell: 27
			},
			'orange crystal': {
				name: 'orange crystal',
				type: 'junk',
				image: orangeCrystal,
				buy: 23,
				sell: 15
			},
			'shadow fragment': {
				name: 'shadow fragment',
				type: 'junk',
				image: shadowFragment,
				buy: 75,
				sell: 42
			},
			'shadowplate': {
				name: 'shadowplate',
				type: 'pants',
				image: shadowPlate,
				animation: shadowPlateAnimation,
				armor: 26,
				buy: 237,
				sell: 104
			},
			'crystalline leggings': {
				name: 'crystalline leggings',
				type: 'pants',
				image: crystallineLeggings,
				animation: crystallineLeggingsAnimation,
				armor: 21,
				buy: 211,
				sell: 97
			},
			'skull': {
				name: 'skull',
				type: 'junk',
				image: skullItem,
				buy: 48,
				sell: 23
			},
			'snapped femur': {
				name: 'snapped femur',
				type: 'junk',
				image: snappedFemur,
				buy: 39,
				sell: 18
			},
			'cracked wooden shield': {
				name: 'cracked wooden shield',
				type: 'shield',
				buy: 137,
				sell: 80,
				image: crackedWoodenShield,
				armor: 17
			},
			'buckler': {
				name: 'buckler',
				type: 'shield',
				buy: 213,
				sell: 107,
				image: buckler,
				armor: 26
			},
			'shrubbery': {
				name: 'shrubbery',
				type: 'junk',
				buy: 120,
				sell: 87,
				image: shrubbery
			},
			'very small rocks': {
				name: 'very small rocks',
				type: 'junk',
				buy: 48,
				sell: 26,
				image: verySmallRocks
			},
			'oak staff': {
				name: 'oak staff',
				type: 'weapon',
				image: oakStaff,
				damage: {
					min: 3,
					max: 13
				},
				buy: 48,
				sell: 15
			},
			'ni helmet': {
				name: 'ni helmet',
				type: 'helmet',
				image: niHelmet,
				animation: niHelmetAnimation,
				armor: 35,
				buy: 200,
				sell: 103
			},
			'massive eye': {
				name: 'massive eye',
				type: 'junk',
				image: massiveEye,
				buy: 67,
				sell: 45
			},
			'tentacle': {
				name: 'tentacle',
				type: 'junk',
				image: tentacle,
				buy: 78,
				sell: 51
			},
			'blue crystal': {
				name: 'blue crystal',
				type: 'junk',
				image: blueCrystal,
				buy: 72,
				sell: 49
			},
			'shadow forged axe': {
				name: 'shadow forged axe',
				type: 'weapon',
				image: shadowForgedAxe,
				buy: 243,
				sell: 162,
				damage: {
					min: 16,
					max: 38
				}
			},
			'damp scroll': {
				name: 'damp scroll',
				type: 'spell',
				image: dampScroll,
				buy: 264,
				sell: 137,
				teaches: 'vigor'
			},
			'crystal-shard necklace': {
				name: 'crystal-shard necklace',
				type: 'necklace',
				health: 50,
				buy: 343,
				sell: 225,
				image: crystalShardNecklace
			},
			'acidic ichor': {
				name: 'acidic ichor',
				type: 'junk',
				buy: 81,
				sell: 63,
				image: acidicIchor
			},
			'bloodsand gloves': {
				name: 'bloodsand gloves',
				type: 'gloves',
				image: bloodSandGloves,
				animation: bloodSandGlovesAnimation,
				armor: 31,
				buy: 93,
				sell: 51
			},
			'scorpion stinger': {
				name: 'scorpion stinger',
				type: 'junk',
				image: scorpionStinger,
				buy: 59,
				sell: 27
			},
			'scorpion leg': {
				name: 'scorpion leg',
				type: 'junk',
				image: scorpionLeg,
				buy: 63,
				sell: 31
			},
			'tough claw': {
				name: 'tough claw',
				type: 'junk',
				image: toughClaw,
				buy: 67,
				sell: 33
			},
			'drop of venom': {
				name: 'drop of venom',
				type: 'junk',
				image: dropOfVenom,
				buy: 61,
				sell: 29
			},
			'potted sand': {
				name: 'potted cactus',
				type: 'junk',
				image: pottedCactus,
				buy: 83,
				sell: 47
			},
			'jar of sand': {
				name: 'jar of sand',
				type: 'junk',
				image: jarOfSand,
				buy: 74,
				sell: 39
			},
			'funeral wrap': {
				name: 'funeral wrap',
				type: 'shirt',
				image: funeralWrap,
				animation: funeralWrapAnimation,
				armor: 24,
				buy: 223,
				sell: 107
			},
			'cowboy shirt': {
				name: 'cowboy shirt',
				type: 'shirt',
				image: cowboyShirt,
				animation: cowboyShirtAnimation,
				armor: 20,
				buy: 193,
				sell: 85
			},
			'cowboy pants': {
				name: 'cowboy pants',
				type: 'pants',
				image: cowboyPants,
				animation: brownPantsAnimation,
				armor: 21,
				buy: 197,
				sell: 87
			},
			'cowboy hat': {
				name: 'cowboy hat',
				type: 'helmet',
				image: cowboyHat,
				animation: cowboyHatAnimation,
				armor: 23,
				buy: 203,
				sell: 103
			},
			'cap of darkness': {
				name: 'cap of darkness',
				type: 'helmet',
				image: capOfDarkness,
				animation: capOfDarknessAnimation,
				armor: 32,
				buy: 1200,
				sell: 600
			},
			'golden ankh': {
				name: 'golden ankh',
				type: 'junk',
				image: goldenAnkh,
				buy: 83,
				sell: 41
			}
		}; // stores item information
		/*
		'template': {
			name: 'template',
			type: 'type', // damage or healing
			image: templateImage,
			energyCost: 0,
			amount: 0,
			cooldown: 0
		}
		*/
		var abilities = {
			'slash': {
				name: 'slash',
				type: 'damage',
				image: slash,
				energyCost: 35,
				amount: 10,
				cooldown: 180,
				animation: slashCycle
			},
			'shadowstrike': {
				name: 'shadowstrike',
				type: 'damage',
				image: shadowStrike,
				energyCost: 40,
				amount: 30,
				cooldown: 90,
				animation: lightningCycle
			},
			'a mere fleshwound': {
				name: 'a mere fleshwound',
				type: 'damage',
				image: aMereFleshWound,
				energyCost: 15,
				amount: 15,
				cooldown: 80,
				animation: aMereFleshWoundCycle
			},
			'blessing of the falcon': {
				name: 'blessing of the falcon',
				type: 'buff',
				image: blessingOfTheFalcon,
				energyCost: 15,
				animation: falconCycle,
				cooldown: 120,
				buffName: 'blessing of the falcon'
			},
			'vigor': {
				name: 'vigor',
				type: 'buff',
				image: vigor,
				animation: vigorCycle,
				cooldown: 120,
				energyCost: 20,
				buffName: 'vigor'
			},
			'ni': {
				name: 'ni',
				type: 'damage',
				image: ni,
				energyCost: 50,
				amount: 50,
				cooldown: 20,
				animation: niCycle
			},
		}; // stores ability information
		var buffs = {
			'blessing of the falcon': {
				name: 'blessing of the falcon',
				type: 'healthRegen',
				amount: 0.05,
				image: blessingOfTheFalcon,
				duration: 18000
			},
			'vigor': {
				name: 'vigor',
				type: 'energyRegen',
				amount: 0.05,
				image: vigor,
				duration: 18000
			},
			'black breath': {
				name: 'black breath',
				type: 'dot',
				amount: 15,
				duration: 300,
				image: blackBreath
			}
		};
		/*
		'template': {
			name: 'template',
			aggression: 'passive', // passive or aggressive
			level: {
				min: 0,
				max: 100
			},
			maxHealth: 100,
			maxEnergy: 100,
			damage: {
				min: 2,
				max: 10
			},
			loot: [{name: 'example loot', chance: 0}],
			image: templateImage,
			speed: 50
		}
		*/
		var enemies = {
			'shadow imp': {
				name: 'shadow imp',
				aggression: 'aggressive',
				level: {
					min: 1,
					max: 3
				},
				maxHealth: 40,
				maxEnergy: 40,
				damage: {
					min: 6,
					max: 20
				},
				loot: [{
					name: 'glowing rune',
					chance: 20
				}, {
					name: 'small sack',
					chance: 25
				}, {
					name: 'cracked wooden shield',
					chance: 40
				}, {
					name: 'smoked ham',
					chance: 60
				}, {
					name: 'purple pebble',
					chance: 80
				}, {
					name: 'tattered rags',
					chance: 100
				}],
				image: shadowImp,
				speed: 200,
			},
			'cave bat': {
				name: 'cave bat',
				aggression: 'aggressive',
				level: {
					min: 3,
					max: 5
				},
				maxHealth: 60,
				maxEnergy: 40,
				damage: {
					min: 17,
					max: 20
				},
				loot: [{
					name: 'lesser ring',
					chance: 20
				}, {
					name: 'strange mushroom',
					chance: 40
				}, {
					name: 'raw bat meat',
					chance: 50
				}, {
					name: 'stagnant water',
					chance: 60,
				}, {
					name: 'leathery wing',
					chance: 80
				}, {
					name: 'staring eye',
					chance: 90
				}, {
					name: 'sharp fang',
					chance: 100
				}],
				image: caveBat,
				speed: 50,
				wide: true
			},
			'african swallow': {
				name: 'african swallow',
				aggression: 'passive',
				level: {
					min: 4,
					max: 7
				},
				maxHealth: 80,
				maxEnergy: 60,
				damage: {
					min: 8,
					max: 20
				},
				loot: [{
					name: 'the holy hand grenade',
					chance: 5
				}, {
					name: 'blessing of the falcon',
					chance: 10,
				}, {
					name: 'coconut',
					chance: 60,
				}, {
					name: 'blue feather',
					chance: 65
				}, {
					name: 'paper airplane',
					chance: 70
				}, {
					name: 'feather',
					chance: 80
				}, {
					name: 'swallow egg',
					chance: 90
				}, {
					name: 'strand of creeper',
					chance: 100
				}],
				image: africanSwallow,
				speed: 60
			},
			'killer bunny': {
				name: 'killer bunny',
				aggression: 'aggressive',
				level: {
					min: 6,
					max: 8
				},
				maxHealth: 100,
				maxEnergy: 30,
				damage: {
					min: 8,
					max: 15
				},
				loot: [
					{
						name: 'easter egg',
						chance: 0
				},
					{
						name: 'silver necklace',
						chance: 20
				}, {
						name: 'carrot',
						chance: 55,
				}, {
						name: 'tuft of rabbit fur',
						chance: 100
				}],
				image: killerBunny,
				speed: 15,
				wide: true
			},
			'wraith': {
				name: 'wraith',
				aggression: 'aggressive',
				level: {
					min: 7,
					max: 12
				},
				maxHealth: 160,
				maxEnergy: 70,
				damage: {
					min: 22,
					max: 30
				},
				loot: [
					{
						name: 'crystal-shard necklace',
						chance: 5
					},
					{
						name: 'shadowplate',
						chance: 10
					},
					{
						name: 'black shirt',
						chance: 30
					},
					{
						name: 'skull',
						chance: 60
					},
					{
						name: 'snapped femur',
						chance: 80
					},
					{
						name: 'spark of darkness',
						chance: 90
					},
					{
						name: 'shadow fragment',
						chance: 100
					}
				],
				image: wraith,
				speed: 45,
				debuff: 'black breath'
			},
			'bandit': {
				name: 'bandit',
				aggression: 'aggressive',
				level: {
					min: 5,
					max: 10
				},
				maxHealth: 180,
				maxEnergy: 50,
				damage: {
					min: 12,
					max: 30
				},
				loot: [
					{
						name:'red mask',
						chance: 10
					},
					{
						name: 'fly swatter',
						chance: 25
					},
					{
						name: 'tan shoes',
						chance: 45
					},
					{
						name: 'buckler',
						chance: 65
					},
					{
						name: 'water skin',
						chance: 85
					},
					{
						name: 'dull dagger',
						chance: 90
					},
					{
						name: 'black pants',
						chance: 100
					}
				],
				image: bandit,
				speed: 50
			},
			'gazer': {
				name: 'gazer',
				aggression: 'aggressive',
				level: {
					min: 8,
					max: 11,
				},
				maxHealth: 200,
				maxEnergy: 100,
				damage: {
					min: 30,
					max: 60
				},
				loot: [
					{
						name: 'damp scroll',
						chance: 5
					},
					{
						name: 'shadow forged axe',
						chance: 10
					},
					{
						name: 'acidic ichor',
						chance: 30
					},
					{
						name: 'blue crystal',
						chance: 50
					},
					{
						name: 'orange crystal',
						chance: 70
					},
					{
						name: 'tentacle',
						chance: 90
					},
					{
						name: 'massive eye',
						chance: 100
					},
				],
				image: gazer,
				speed: 80
			},
			'bloodsand scorpion': {
				name: 'bloodsand scorpion',
				aggression: 'aggressive',
				level: {
					min: 7,
					max: 9
				},
				damage: {
					min: 15,
					max: 32
				},
				maxHealth: 180,
				maxEnergy: 100,
				wide: true,
				loot: [
					{
						name: 'bloodsand gloves',
						chance: 10
					},
					{
						name: 'potted cactus',
						chance: 30
					},
					{
						name: 'jar of sand',
						chance: 45
					},
					{
						name: 'scorpion leg',
						chance: 60
					},
					{
						name: 'tough claw',
						chance: 65
					},
					{
						name: 'drop of venom',
						chance: 80
					},
					{
						name: 'scorpion stinger',
						chance: 100
					}
				],
				image: bloodSandScorpion,
				speed: 70
			},
			'mummy': {
				name: 'mummy',
				aggression: 'aggressive',
				level: {
					min: 7,
					max: 9
				},
				damage: {
					min: 15,
					max: 40
				},
				maxHealth: 180,
				maxEnergy: 80,
				loot: [
					{
						name: 'funeral wrap',
						chance: 10
					},
					{
						name: 'skull',
						chance: 30
					},
					{
						name: 'chalice',
						chance: 45
					},
					{
						name: 'crude idol',
						chance: 60
					},
					{
						name: 'snapped femur',
						chance: 65
					},
					{
						name: 'potted cactus',
						chance: 80
					},
					{
						name: 'golden ankh',
						chance: 100
					}
				],
				image: mummy,
				speed: 90
			}
		}; // stores enemy information
		/*
		'John Doe': {
			name: 'John Doe',
			sells: ['test'],
			outfit: {
				'shirt': 'nothing',
				'pants': 'nothing',
				'gloves': 'nothing',
				'boots': 'nothing',
				'helmet': 'nothing'
			}
		}
		*/
		var vendors = {
			'Pamela Fox': {
				name: 'Pamela Fox',
				sells: ['school backpack', 'stuffed winston', 'water bottle'],
				outfit: {
					'shirt': 'green shirt',
					'pants': 'blue jeans',
					'gloves': 'nothing',
					'boots': 'red sneakers',
					'helmet': 'long brown hair'
				}
			},
			'Roger the Shrubber': {
				name: 'Roger the Shrubber',
				sells: ['shrubbery', 'oak staff', 'very small rocks'],
				outfit: {
					'shirt': 'roger shirt',
					'pants': 'brown pants',
					'gloves': 'nothing',
					'boots': 'tan shoes',
					'helmet': 'long dark blue hair'
				}
			},
			'Master Don Jon': {
				name: 'Master Don Jon',
				sells: ['bucket of milk', 'carrot', 'chalice', 'golden ankh', 'potted cactus', 'skull'],
				outfit: {
					'shirt': 'blue shirt',
					'pants': 'blue jeans',
					'boots': 'nothing',
					'gloves': 'nothing',
					'helmet': 'spiked light blue hair'
				}
			}
		};
		/*
		'John Doe': {
			name: 'John Doe',
			gives: 'test',
			outfit: {
				'shirt': 'nothing',
				'pants': 'nothing',
				'gloves': 'nothing',
				'boots': 'nothing',
				'helmet': 'nothing'
			}
		}
		*/
		var questGivers = {
			'Marshal Jordan': {
				name: 'Marshal Jordan',
				gives: 'The Invading Shadow',
				outfit: {
					'shirt': 'steel breastplate',
					'pants': 'steel leggings',
					'gloves': 'nothing',
					'boots': 'steel boots',
					'helmet': 'steel helmet'
				}
			},
			'Wruce Bayne': {
				name: 'Wruce Bayne',
				gives: 'b-b-b-bats!',
				outfit: {
					'shirt': 'black shirt',
					'pants': 'black pants',
					'gloves': 'nothing',
					'boots': 'black boots',
					'helmet': 'short black hair'
				}
			},
			'John Cleese': {
				name: 'John Cleese',
				gives: 'Imported Coconuts',
				outfit: {
					'shirt': 'steel breastplate',
					'pants': 'steel leggings',
					'gloves': 'nothing',
					'boots': 'steel boots',
					'helmet': 'mail coif'
				}
			},
			'Knight who says Ni': {
				name: 'Knight who says Ni',
				gives: 'Fetch a Shrubbery',
				outfit: {
					'shirt': 'black shirt',
					'pants': 'black pants',
					'gloves': 'black gloves',
					'boots': 'black boots',
					'helmet': 'ni helmet'
				}
			},
			'Ol\' Philip': {
				name: 'Ol\' Philip',
				gives: 'P\'tatos!',
				outfit: {
					'shirt': 'green shirt',
					'pants': 'blue jeans',
					'boots': 'tan shoes',
					'gloves': 'nothing',
					'helmet': 'short brown hair'
				}
			},
			'Johnny Thunder': {
				name: 'Johnny Thunder',
				gives: 'You don\'t want this mummy!',
				outfit: {
					'shirt': 'cowboy shirt',
					'pants': 'cowboy pants',
					'boots': 'tan shoes',
					'gloves': 'nothing',
					'helmet': 'cowboy hat'
				}
			},
			'Daedalus': {
				name: 'Daedalus',
				gives: 'Easter egg',
				outfit: {
					'shirt': 'black shirt',
					'pants': 'black pants',
					'boots': 'black boots',
					'gloves': 'black gloves',
					'helmet': 'cap of darkness'
				}
			}
		};
		/*
		template
		'test': {
			name: 'test',
			chain: [{
				requires: 'test item',
				amount: 0,
				reward: 'test item',
				xp: 0,
				details: 'he he nothing here!',
				status: 'nothing'
			}],
			current: 0
		}
		*/
		var quests = {
			'The Invading Shadow': {
				chain: [{
						name: 'The Invading Shadow',
						type: 'gather',
						requires: 'glowing rune',
						amount: 1,
						slain: 0,
						reward: 'steel helmet',
						xp: 75,
						details: 'These shadow imps have been traveling down from Northern Galdor and terrorizing the people with their dark magic. Please bring me a glowing rune so that I may discover the source of their power.',
						finish: 'I suspect that these runes are remnants of power left by the Necromancer, only further scrutiny will reveal more.',
						status: 'nothing'
					},
					{
						name: 'The Invading Shadow',
						type: 'kill',
						requires: 'shadow imp',
						amount: 5,
						slain: 0,
						reward: 'steel boots',
						xp: 100,
						details: 'These are certainly minions of the Necromancer, and they must not remain in this land, slay five of the evil spawn and you will be greatly rewarded!',
						finish: 'Thank you for your noble deeds, the land is safer with your blade to protect it!',
						status: 'nothing'
					}
				],
				current: 0
			},
			'b-b-b-bats!': {
				chain: [{
					name: 'b-b-b-bats!',
					type: 'kill',
					requires: 'cave bat',
					amount: 10,
					reward: 'black gloves',
					xp: 200,
					slain: 0,
					details: 'I am terrified of bats, so I chose to live in this cave full of them! Obviously! Could you please remove some of the pesky rodents from my house!',
					finish: 'Thank you, I might be able to sleep now! Take my gloves, they may not survive a dog, but they may help against cats...',
					status: 'nothing'
				}],
				current: 0
			},
			'Imported Coconuts': {
				chain: [{
					name: 'Imported Coconuts',
					type: 'gather',
					requires: 'coconut',
					amount: 10,
					reward: 'book of armaments',
					xp: 250,
					slain: 0,
					details: 'I gathered some coconuts for a recent project, but these pesky swallows have stolen my entire stock! (don\'t ask me how they did it) Please retrieve my coconuts and bring them back to me.',
					finish: 'My gratitude can never be fully expressed... what was their velocity? I am quite curious!',
					status: 'nothing'
				}],
				current: 0
			},
			'Fetch a Shrubbery': {
				chain: [{
						name: 'Fetch a Shrubbery',
						type: 'gather',
						requires: 'shrubbery',
						amount: 1,
						reward: 'ni',
						xp: 250,
						slain: 0,
						details: 'NI! I am a knight who says Ni! And I demand A SHRUBBERY! Bring me a shrubbery or I will say Ni to you again!',
						finish: 'We are very pleased with this shrubbery, come back when you are ready for another task!',
						status: 'nothing',
					},
					{
						name: 'Fetch a Shrubbery',
						type: 'gather',
						requires: 'shrubbery',
						amount: 1,
						reward: 'the holy hand grenade',
						xp: 250,
						slain: 0,
						details: 'Bring us another shrubbery, and place it right next to the first one so that there is a little path down the middle. Then you must chop down the greatest tree in the forest with a herring!',
						finish: 'I do not wish to speak with you anymore, give me the shrubbery and go!',
						status: 'nothing'
					}
				],
				current: 0
			},
			'P\'tatos!': {
				chain: [{
					name: 'P\'tatos!',
					type: 'gather',
					requires: 'potato',
					amount: 10,
					reward: 'fly swatter',
					xp: 150,
					slain: 0,
					details: 'Hey you! I am a stereotypical RPG farmer. Now go do all of my normal work for me and fetch ten potatos!',
					finish: 'Thanks, if it weren\'t for all you adventurers... I might actually have to work!',
					status: 'nothing',
				}],
				current: 0
			},
			'You don\'t want this mummy!': {
				chain: [{
					name: 'You don\'t want this mummy!',
					type: 'kill',
					requires: 'mummy',
					amount: 10,
					reward: 'steel greathelm',
					xp: 300,
					slain: 0,
					details: 'I was adventuring in the desert, looking for tombs when I was attacked by a group of mummies! Slay them so that I and others may explore the desert safely.',
					finish: 'Here\'s my hat boy. Now go find yourself a whip and an epic theme-song.',
					status: 'nothing',
				}],
				current: 0
			},
			'Easter egg': {
				chain: [{
					name: 'Easter Egg',
					type: 'gather',
					requires: 'easter egg',
					amount: 5,
					reward: 'cap of darkness',
					xp: 300,
					slain: 0,
					details: 'Bring me five easter eggs, and you will be greatly rewarded. I hope you have enjoyed my game!',
					finish: 'This cap of darkness can render you invisible to foes.',
					status: 'nothing',
				}],
				current: 0
			}
		};
		var interactings = {
			'gloomblade chest': {
				name: 'gloomblade chest',
				image: chest1,
				loot: 'gloomblade',
				uses: 1,
				amount: 1,
			},
			'potato plant': {
				name: 'potato plant',
				image: potatoPlant,
				loot: 'potato',
				amount: 1
			},
			'crystalline chest': {
				name: 'crystalline chest',
				image: crystallineChest,
				loot: 'crystalline leggings',
				uses: 1,
				amount: 1
			},
			'enchanted chest': {
				name: 'enchanted chest',
				image: crystallineChest,
				loot: 'sapphire ring',
				uses: 1,
				amount: 1
			}
		};

		// stores the values for the click timer
		var clickTimer = {
			value: 0,
			change: 0
		};
		var actionText = []; // stores the floating text
		var deaths = [];
		var abilityAnimations = [];
		var keys = []; // stores the keys being pressed
		var openCharacterGui = false; // stores whether the character is open
		var openSpellBook = false; // stores whether the spellbook is open
		var openQuestLog = false;

		var world = []; // stores the maps
		var coords = {
			x: 0,
			y: 0,
			z: 0
		}; // the x y z coordinates of the current map

		var Load = function() {
			for (var i = 0; i < maps.length; i++) {
				var m = maps[i];
				if (world[m.z] === undefined) {
					world[m.z] = [];
				}
				if (world[m.z][m.y] === undefined) {
					world[m.z][m.y] = [];
				}
				if (world[m.z][m.y][m.x] === undefined) {
					world[m.z][m.y][m.x] = {
						map: [],
						enemy: [],
						vendors: [],
						quests: [],
						interactings: []
					};
				}
				for (var y = 0; y < m.map.length; y++) {
					for (var x = 0; x < m.map[y].length; x++) {
						world[m.z][m.y][m.x].map.push({
							x: x * 32,
							y: y * 32,
							image: blocks[m.map[y][x]].image,
							name: blocks[m.map[y][x]].name,
							type: blocks[m.map[y][x]].type,
							large: blocks[m.map[y][x]].large,
						});
					}
				}
				if (m.enemy !== undefined) {
					for (var j = 0; j < m.enemy.length; j++) {
						world[m.z][m.y][m.x].enemy.push({
							x: m.enemy[j].x * 32,
							y: m.enemy[j].y * 32,
							name: enemies[m.enemy[j].name].name,
							image: enemies[m.enemy[j].name].image,
							aggression: enemies[m.enemy[j].name].aggression
						});
					}
				}
				if (m.vendors !== undefined) {
					for (var j = 0; j < m.vendors.length; j++) {
						world[m.z][m.y][m.x].vendors.push({
							x: m.vendors[j].x * 32,
							y: m.vendors[j].y * 32,
							name: vendors[m.vendors[j].name].name,
						});
					}
				}
				if (m.quests !== undefined) {
					for (var j = 0; j < m.quests.length; j++) {
						world[m.z][m.y][m.x].quests.push({
							x: m.quests[j].x * 32,
							y: m.quests[j].y * 32,
							name: questGivers[m.quests[j].name].name
						});
					}
				}
				if (m.interactings !== undefined) {
					for (var j = 0; j < m.interactings.length; j++) {
						world[m.z][m.y][m.x].interactings.push({
							x: m.interactings[j].x * 32,
							y: m.interactings[j].y * 32,
							name: interactings[m.interactings[j].name].name,
							uses: interactings[m.interactings[j].name].uses,
							amount: interactings[m.interactings[j].name].amount,
							looted: false
						});
					}
				}
			}
		}; // loads all of the maps to reduce lag so the program doesn't have to use nested for loops

		var Cursor = mouse; // stores the current cursor image
		var hover = {
			vendor: false,
			enemy: false,
			quest: false,
			interacting: false
		};

		var Collision = function(x1, y1, x2, y2, w1, h1, w2, h2) {
			if (x1 + w1 > x2 && x1 + w1 < x2 + w2 / 2 && y1 + h1 > y2 + h2 / 4 && y1 < y2 + h2 - h2 / 4) {
				return 'right';
			}
			if (x1 < x2 + w2 && x1 > x2 + w2 - w2 / 2 && y1 + h1 > y2 + h2 / 4 && y1 < y2 + h2 - h2 / 4) {
				return 'left';
			}
			if (x1 + w1 > x2 + w2 / 4 && x1 < x2 + w2 - w2 / 4 && y1 + h1 > y2 && y1 + h1 < y2 + h2 / 2) {
				return 'down';
			}
			if (x1 + w1 > x2 + w2 / 4 && x1 < x2 + w2 - w2 / 4 && y1 > y2 + h2 - h2 / 4 && y1 < y2 + h2) {
				return 'up';
			}
		}; // returns a direction when two objects overlap
		var Hover = function(x, y, width, height) {
			if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
				return true;
			} else {
				return false;
			}
		}; // detects if the mouse is occupying a certain spot

		var load = true; // tells the program not to load the world in order to increase code editing ease
		if (load) {
			Load();
		} // loads the world when the load variable is true

		var player = {
			name: 'type name here',
			loc: {
				x: 234,
				y: 298,
				xc: 0,
				yc: 0,
				spawnpoint: [0, 0, 0, 234, 298]
			},
			stats: {
				speed: 2,
				maxHealth: 100,
				health: 100,
				healthRegen: 0.1,
				maxEnergy: 100,
				energy: 100,
				energyRegen: 0.1,
				xp: 0,
				level: 1,
				maxXp: 100
			},
			animation: {
				cycle: downCycle,
				current: 0,
				value: 0,
				speed: 0.25,
				shirtCycle: yellowShirtAnimation.down,
				pantsCycle: blueJeansAnimation.down,
				glovesCycle: 'nothing',
				bootsCycle: greenCrocsAnimation.down,
				helmetCycle: 'nothing',
				hairCycle: items[selectedHair].animation.down
			},
			actions: {
				looting: false,
				fighting: false,
				trading: false,
				questing: false
			},
			facing: 'down',
			buffs: []
		}; // stores all of the player information

		var inventory = {
			bags: {
				1: 'brown pack',
				2: 'nothing',
				3: 'nothing',
				4: 'nothing',
				5: 'nothing'
			},
			character: {
				helmet: 'nothing',
				shirt: 'ugly yellow shirt',
				pants: 'blue jeans',
				boots: 'green crocs',
				gloves: 'nothing',
				necklace: 'nothing',
				ring: 'nothing',
				weapon: 'chipped cutlass',
				shield: 'nothing',
				hair: selectedHair
			},
			1: ['smoked ham', 'water bottle'],
			2: [],
			3: [],
			4: [],
			5: [],
			abilities: {
				1: 'slash',
				2: 'nothing',
				3: 'nothing',
				4: 'nothing',
				5: 'nothing'
			},
			spellbook: [
				['slash']
			],
			quests: [],
			coins: 0
		}; // stores all of the inventory information, including bags and abilities
		var ArmorPoints = function() {
			var char = inventory.character;
			var order = [char.helmet, char.pants, char.boots, char.gloves, char.shield];
			var total = 0;
			for (var i = 0; i < order.length; i++) {
				if (order[i] !== 'nothing') {
					var item = items[order[i]];
					total += item.armor;
				}
			}
			return total;
		};
		var abilityCooldowns = {
			1: {
				value: 180,
				change: 0,
				max: 180
			},
			2: {},
			3: {},
			4: {},
			5: {}
		}; // stores the cooldowns for the abilities on the hotbar
		var bags = {
			1: false,
			2: false,
			3: false,
			4: false,
			5: false
		}; // stores which bags are opened

		var combat = 'nothing'; // stores the enemy the player is fighting
		var currentVendor = 'nothing'; // stores the current vendor the player interacts with
		var currentQuest = 'nothing'; // stores the current quest giver the player interacts with
		var questShowing = 'nothing';

		// draws different bags
		var bag4Slots = function(y, bagImage) {
			image(guiMiddle, 394, y);
			image(bagImage, 394, y);
			image(guiSlot, 426, y);
			image(closeButton2, 458, y);
			image(guiSlot, 394, y + 32);
			image(guiSlot, 426, y + 32);
			image(guiSlot, 458, y + 32);
		}; // draws a four slot bag
		var bag6Slots = function(y, bagImage) {
			image(guiMiddle, 362, y);
			image(bagImage, 362, y);
			image(guiSlot, 394, y);
			image(guiSlot, 426, y);
			image(closeButton2, 458, y);
			image(guiSlot, 362, y + 32);
			image(guiSlot, 394, y + 32);
			image(guiSlot, 426, y + 32);
			image(guiSlot, 458, y + 32);
		}; // draws a six slot bag
		var bag8Slots = function(y, bagImage) {
			image(guiMiddle, 330, y);
			image(bagImage, 330, y);
			image(guiSlot, 362, y);
			image(guiSlot, 394, y);
			image(guiSlot, 426, y);
			image(closeButton2, 458, y);
			image(guiSlot, 330, y + 32);
			image(guiSlot, 362, y + 32);
			image(guiSlot, 394, y + 32);
			image(guiSlot, 426, y + 32);
			image(guiSlot, 458, y + 32);
		}; // draws an eight slot bag
		var bag10Slots = function(y, bagImage) {
			image(guiMiddle, 298, y);
			image(bagImage, 298, y);
			image(guiSlot, 330, y);
			image(guiSlot, 362, y);
			image(guiSlot, 394, y);
			image(guiSlot, 426, y);
			image(closeButton2, 458, y);
			image(guiSlot, 298, y + 32);
			image(guiSlot, 330, y + 32);
			image(guiSlot, 362, y + 32);
			image(guiSlot, 394, y + 32);
			image(guiSlot, 426, y + 32);
			image(guiSlot, 458, y + 32);
		}; // draws a ten slot bag
		var bag12Slots = function(y, bagImage) {
			image(guiMiddle, 266, y);
			image(bagImage, 266, y);
			image(guiSlot, 298, y);
			image(guiSlot, 330, y);
			image(guiSlot, 362, y);
			image(guiSlot, 394, y);
			image(guiSlot, 426, y);
			image(closeButton2, 458, y);
			image(guiSlot, 266, y + 32);
			image(guiSlot, 298, y + 32);
			image(guiSlot, 330, y + 32);
			image(guiSlot, 362, y + 32);
			image(guiSlot, 394, y + 32);
			image(guiSlot, 426, y + 32);
			image(guiSlot, 458, y + 32);
		}; // draws a twelve slot bag

		var Bag = function(y, bagImage, slots) {
			if (slots === 4) {
				bag4Slots(y, bagImage);
			} else if (slots === 6) {
				bag6Slots(y, bagImage);
			} else if (slots === 8) {
				bag8Slots(y, bagImage);
			} else if (slots === 10) {
				bag10Slots(y, bagImage);
			} else {
				bag12Slots(y, bagImage);
			}
		}; // draws each bag based upon size
		var Info = function(message) {
			// shows a small box in the bottom left which gives basic information for the player
			image(guiTopLeft, 10, 362);
			image(guiLeft, 10, 394);
			image(guiBottomLeft, 10, 426);
			image(guiTop, 42, 362);
			image(guiMiddle, 42, 394);
			image(guiBottom, 42, 426);
			image(guiTop, 74, 362);
			image(guiMiddle, 74, 394);
			image(guiBottom, 74, 426);
			image(guiTop, 106, 362);
			image(guiMiddle, 106, 394);
			image(guiBottom, 106, 426);
			image(guiTopRight, 138, 362);
			image(guiRight, 138, 394);
			image(guiBottomRight, 138, 426);
			textFont(Mono, 12);
			fill(255, 255, 255);
			text(message, 22, 382);
		}; // displays a small box with text
		var ItemInfo = function(item) {
			// generates ouput for the Info() function based upon item and type
			item = items[item];
			var message = '';
			message += item.name + '\n';
			if (item.type === 'helmet' || item.type === 'shirt' || item.type === 'pants' || item.type === 'gloves' || item.type === 'boots' || item.type === 'shield') {
				message += item.armor + ' armor\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to equip\n';
				}
				if (openCharacterGui && mouseX < 250) {
					message += 'click to dequip\n';
				}
			}
			if (item.type === 'bag') {
				message += item.slots + ' slot bag\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to equip\n';
				}
			}
			if (item.type === 'drink') {
				message += "fills " + item.energy + ' energy\nno combat use\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to drink\n';
				}
			}
			if (item.type === 'food') {
				message += "fills " + item.health + ' health\nno combat use\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to eat\n';
				}
			}
			if (item.type === 'necklace') {
				message += 'gives ' + item.health + ' health\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to equip\n';
				}
				if (openCharacterGui && mouseX < 250) {
					message += 'click to dequip\n';
				}
			}
			if (item.type === 'ring') {
				message += 'gives ' + item.energy + ' energy\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to equip\n';
				}
				if (openCharacterGui && mouseX < 250) {
					message += 'click to dequip\n';
				}
			}
			if (item.type === 'weapon') {
				message += item.damage.min + '-' + item.damage.max + ' damage\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to equip\n';
				}
				if (openCharacterGui && mouseX < 250) {
					message += 'click to dequip\n';
				}
			}
			if (item.type === 'spell') {
				message += 'teaches ' + item.teaches + '\n';
				if (!player.actions.trading && mouseX > 250) {
					message += 'click to learn\n';
				}
			}
			if (player.actions.trading) {
				message += 'sell: ' + item.sell + ' coins\n';
				message += 'buy: ' + item.buy + ' coins\n';
				if (mouseX > 250) {
					message += 'click to sell\n';
				} else {
					message += 'click to buy\n';
				}
			}
			return message;
		}; // generates the text for the Info function
		var ActionText = function(message, x, y) {
			// adds the action text to the array
			actionText.push({
				message: message,
				x: x,
				y: y,
				yc: -0.5,
				transp: 255
			});
		}; // generates the floating text
		var DeathAnimation = function(x, y) {
			deaths.push({
				x: x,
				y: y,
				animation: {
					change: 0.3,
					value: 0
				}
			});
		};
		var AbilityAnimation = function(animation, x, y) {
			abilityAnimations.push({
				x: x,
				y: y,
				animation: animation,
				value: 0,
				change: 0.3
			});
		};
		var TotalSlots = function() {
			// calculates the total potential slots in the characters bags
			var temp = 0;
			for (var i = 1; i < 6; i++) {
				if (inventory.bags[i] !== 'nothing') {
					temp += items[inventory.bags[i]].slots;
				}
			}
			return temp;
		}; // calculates the total slots possible
		var AvailableSlots = function() {
			// calculates the total empty slots in the players bags
			var temp = TotalSlots();
			for (var i = 1; i < 6; i++) {
				if (inventory.bags[i] !== 'nothing') {
					temp -= inventory[i].length;
				}
			}
			return temp;
		}; // calculates the total slots available
		var StoreItem = function(item) {
			if (items[item].amount === undefined || items[item].amount === 0) {
				items[item].amount = 1;
				// adds an item to the first available bag
				for (var i = 1; i < 6; i++) {
					if (inventory.bags[i] !== 'nothing') {
						if (inventory[i].length < items[inventory.bags[i]].slots) {
							inventory[i].push(item);
							break;
						}
					}
				}
			} else {
				items[item].amount++;
			}
		}; // adds an item to the players bags
		var RemoveItem = function(item) {
			// decrements the amount of the item in the bag
			items[item].amount--;
			// removes items from the bags if their amount is 0
			for (var i = 1; i < 6; i++) {
				for (var j = 0; j < inventory[i].length; j++) {
					if (item === inventory[i][j] && items[item].amount <= 0) {
						inventory[i].splice(j, 1);
					}
				}
			}
		};
		var UseItem = function(item) {
			if (!player.actions.trading) {
				// equips items based upon their type
				if (items[item].type === 'helmet') {
					if (inventory.character.helmet !== 'nothing') {
						StoreItem(inventory.character.helmet);
					}
					inventory.character.helmet = item;
					RemoveItem(item);
				}
				if (items[item].type === 'shirt') {
					if (inventory.character.shirt !== 'nothing') {
						StoreItem(inventory.character.shirt);
					}
					inventory.character.shirt = item;
					RemoveItem(item);
				}
				if (items[item].type === 'pants') {
					if (inventory.character.pants !== 'nothing') {
						StoreItem(inventory.character.pants);
					}
					inventory.character.pants = item;
					RemoveItem(item);
				}
				if (items[item].type === 'boots') {
					if (inventory.character.boots !== 'nothing') {
						StoreItem(inventory.character.boots);
					}
					inventory.character.boots = item;
					RemoveItem(item);
				}
				if (items[item].type === 'gloves') {
					if (inventory.character.gloves !== 'nothing') {
						StoreItem(inventory.character.gloves);
					}
					inventory.character.gloves = item;
					RemoveItem(item);
				}
				if (items[item].type === 'necklace') {
					if (inventory.character.necklace !== 'nothing') {
						StoreItem(inventory.character.necklace);
						player.stats.maxHealth -= items[inventory.character.necklace].health;
					}
					inventory.character.necklace = item;
					player.stats.maxHealth += items[item].health;
					RemoveItem(item);
				}
				if (items[item].type === 'ring') {
					if (inventory.character.ring !== 'nothing') {
						StoreItem(inventory.character.ring);
						player.stats.maxEnergy -= items[inventory.character.ring].energy;
					}
					inventory.character.ring = item;
					player.stats.maxEnergy += items[item].energy;
					RemoveItem(item);
				}
				if (items[item].type === 'weapon') {
					if (inventory.character.weapon !== 'nothing') {
						StoreItem(inventory.character.weapon);
					}
					inventory.character.weapon = item;
					RemoveItem(item);
				}
				if (items[item].type === 'shield') {
					if (inventory.character.shield !== 'nothing') {
						StoreItem(inventory.character.shield);
					}
					inventory.character.shield = item;
					RemoveItem(item);
				}
				if (items[item].type === 'bag') {
					// finds the first available bag slot
					for (var i = 1; i < 6; i++) {
						if (inventory.bags[i] === 'nothing') {
							inventory.bags[i] = item;
							RemoveItem(item);
							break;
						}
					}

				}
				if (items[item].type === 'spell') {
					var already = false;
					for (var i = 0; i < inventory.spellbook.length; i++) {
						for (var j = 0; j < inventory.spellbook[i].length; j++) {
							if (inventory.spellbook[i][j] === items[item].teaches) {
								already = true;
								break;
							}
						}
					}
					if (!already) {
						var page = inventory.spellbook.length - 1;
						if (inventory.spellbook[page].length < 6) {
							inventory.spellbook[page].push(items[item].teaches);
						} else {
							inventory.spellbook.push([items[item.teaches]]);
						}
						RemoveItem(item);
					}
				}
				if (items[item].type === 'food' && !player.actions.fighting) {
					player.stats.health += items[item].health;
					if (player.stats.health > player.stats.maxHealth) {
						player.stats.health = player.stats.maxHealth;
					}
					RemoveItem(item);
				}
				if (items[item].type === 'drink' && !player.actions.fighting) {
					player.stats.energy += items[item].energy;
					if (player.stats.energy > player.stats.maxEnergy) {
						player.stats.energy = player.stats.maxEnergy;
					}
					RemoveItem(item);
				}
				if (items[item].name === 'the holy hand grenade') {
					enemies['killer bunny'].loot[0].chance = 100;
				}
			} else {
				inventory.coins += items[item].sell;
				RemoveItem(item);
			}
		}; // determines what happens to an item when it is clicked
		var ClearBag = function(bag) {
			var temp = inventory[bag];
			// checks to see which bags have space and adds the items of the selected bag to them if possible
			for (var i = 1; i < 6; i++) {
				// makes sure the bags exist and are not the one being emptied
				if (inventory.bags[i] !== 'nothing' && i !== bag) {
					if (temp.length <= AvailableSlots() - (items[inventory.bags[bag]].slots - inventory[bag].length)) {
						// moves items to the new bag
						while (inventory[i].length < items[inventory.bags[i]].slots && temp.length > 0) {
							inventory[i].push(temp[0]);
							temp.splice(0, 1);
						}
						// clears the old bag
						inventory[bag] = [];
					}
				}
			}
		}; // removes all items from a bag
		var Loot = function() {
			if (player.actions.looting !== false) {
				image(guiTopLeft, 10, 42);
				image(guiTop, 42, 42);
				image(closeButton, 74, 42);
				image(guiLeft, 10, 74);
				image(guiSlot, 42, 74);
				image(guiRight, 74, 74);
				image(guiBottomLeft, 10, 106);
				image(guiBottom, 42, 106);
				image(guiBottomRight, 74, 106);
				image(items[player.actions.looting].image, 42, 74);
				// if the loot is clicked
				if (Hover(42, 74, 32, 32)) {
					Info(ItemInfo(items[player.actions.looting].name) + '\nclick to loot');
					if (mouseIsPressed && (AvailableSlots() > 0 || (items[player.actions.looting].amount !== undefined && items[player.actions.looting].amount > 0))) {
						if (items[player.actions.looting].name === 'easter egg') {
							enemies['killer bunny'].loot[0].chance = 0;
						}
						// moves the item to the player's inventory
						StoreItem(items[player.actions.looting].name);
						// closes the loot box
						player.actions.looting = false;
					} else if (mouseIsPressed) {
						ActionText('not enough bag space', player.loc.x, player.loc.y);
					}
				}
				// the close button
				if (Hover(74, 42, 32, 32) && mouseIsPressed) {
					player.actions.looting = false;
				}
			}
		}; // draws the loot box
		var Player = function() {
			// draws the players body
			image(player.animation.cycle[round(player.animation.current)], player.loc.x, player.loc.y - 12);
			// draws the players shirt
			if (inventory.character.shirt !== 'nothing') {
				image(player.animation.shirtCycle[round(player.animation.current)], player.loc.x, player.loc.y - 12);
			}
			// draws the players pants
			if (inventory.character.pants !== 'nothing') {
				image(player.animation.pantsCycle[round(player.animation.current)], player.loc.x, player.loc.y - 12);
			}
			// draws the players gloves
			if (inventory.character.gloves !== 'nothing') {
				image(player.animation.glovesCycle[round(player.animation.current)], player.loc.x, player.loc.y - 12);
			}
			// draws the players boots
			if (inventory.character.boots !== 'nothing') {
				image(player.animation.bootsCycle[round(player.animation.current)], player.loc.x, player.loc.y - 12);
			}
			// draws the players helmet
			if (inventory.character.helmet !== 'nothing') {
				image(player.animation.helmetCycle, player.loc.x, player.loc.y - 20);
			}
			// draws the players hair if there is no helmet
			if (inventory.character.helmet === 'nothing' && inventory.character.hair !== 'nothing') {
				image(player.animation.hairCycle, player.loc.x, player.loc.y - 20);
			}
		}; // draws the player and their equipmentx, y
		var ResetMap = function(z, y, x) {
			for (var i = 0; i < world[z][y][x].enemy.length; i++) {
				var e = world[z][y][x].enemy[i];
				e.dead = false;
			}
			for (var i = 0; i < world[z][y][x].interactings.length; i++) {
				var e = world[z][y][x].interactings[i];
				e.looted = false;
				e.amount = interactings[e.name].amount;
			}
			hover.enemy = false;
			hover.vendor = false;
			hover.quest = false;
			hover.interacting = false;
		};

		var Movement = function() {
			player.loc.x += player.loc.xc;
			player.loc.y += player.loc.yc;
			player.animation.current += player.animation.value;
			// changes the incrementing movement values and sets the animation arrays
			if (keys[38] || keys[87]) {
				player.loc.yc = -player.stats.speed;
				player.facing = 'up';
				player.animation.value = player.animation.speed;
				player.animation.cycle = upCycle;
				if (inventory.character.shirt !== 'nothing') {
					player.animation.shirtCycle = items[inventory.character.shirt].animation.up;
				}
				if (inventory.character.pants !== 'nothing') {
					player.animation.pantsCycle = items[inventory.character.pants].animation.up;
				}
				if (inventory.character.gloves !== 'nothing') {
					player.animation.glovesCycle = items[inventory.character.gloves].animation.up;
				}
				if (inventory.character.boots !== 'nothing') {
					player.animation.bootsCycle = items[inventory.character.boots].animation.up;
				}
				if (inventory.character.helmet !== 'nothing') {
					player.animation.helmetCycle = items[inventory.character.helmet].animation.up;
				}
				if (inventory.character.hair !== 'nothing') {
					player.animation.hairCycle = items[inventory.character.hair].animation.up;
				}
			} else if (keys[40] || keys[83]) {
				player.loc.yc = player.stats.speed;
				player.facing = 'down';
				player.animation.value = player.animation.speed;
				player.animation.cycle = downCycle;
				if (inventory.character.shirt !== 'nothing') {
					player.animation.shirtCycle = items[inventory.character.shirt].animation.down;
				}
				if (inventory.character.pants !== 'nothing') {
					player.animation.pantsCycle = items[inventory.character.pants].animation.down;
				}
				if (inventory.character.gloves !== 'nothing') {
					player.animation.glovesCycle = items[inventory.character.gloves].animation.down;
				}
				if (inventory.character.boots !== 'nothing') {
					player.animation.bootsCycle = items[inventory.character.boots].animation.down;
				}
				if (inventory.character.helmet !== 'nothing') {
					player.animation.helmetCycle = items[inventory.character.helmet].animation.down;
				}
				if (inventory.character.hair !== 'nothing') {
					player.animation.hairCycle = items[inventory.character.hair].animation.down;
				}
			} else {
				player.loc.yc = 0;
			}
			if (keys[37] || keys[65]) {
				player.loc.xc = -player.stats.speed;
				player.facing = 'left';
				player.animation.value = player.animation.speed;
				player.animation.cycle = leftCycle;
				if (inventory.character.shirt !== 'nothing') {
					player.animation.shirtCycle = items[inventory.character.shirt].animation.left;
				}
				if (inventory.character.pants !== 'nothing') {
					player.animation.pantsCycle = items[inventory.character.pants].animation.left;
				}
				if (inventory.character.gloves !== 'nothing') {
					player.animation.glovesCycle = items[inventory.character.gloves].animation.left;
				}
				if (inventory.character.boots !== 'nothing') {
					player.animation.bootsCycle = items[inventory.character.boots].animation.left;
				}
				if (inventory.character.helmet !== 'nothing') {
					player.animation.helmetCycle = items[inventory.character.helmet].animation.left;
				}
				if (inventory.character.hair !== 'nothing') {
					player.animation.hairCycle = items[inventory.character.hair].animation.left;
				}
			} else if (keys[39] || keys[68]) {
				player.loc.xc = player.stats.speed;
				player.facing = 'right';
				player.animation.value = player.animation.speed;
				player.animation.cycle = rightCycle;
				if (inventory.character.shirt !== 'nothing') {
					player.animation.shirtCycle = items[inventory.character.shirt].animation.right;
				}
				if (inventory.character.pants !== 'nothing') {
					player.animation.pantsCycle = items[inventory.character.pants].animation.right;
				}
				if (inventory.character.gloves !== 'nothing') {
					player.animation.glovesCycle = items[inventory.character.gloves].animation.right;
				}
				if (inventory.character.boots !== 'nothing') {
					player.animation.bootsCycle = items[inventory.character.boots].animation.right;
				}
				if (inventory.character.helmet !== 'nothing') {
					player.animation.helmetCycle = items[inventory.character.helmet].animation.right;
				}
				if (inventory.character.hair !== 'nothing') {
					player.animation.hairCycle = items[inventory.character.hair].animation.right;
				}
			} else {
				player.loc.xc = 0;
			}
			if (player.animation.current > player.animation.cycle.length - 1) {
				player.animation.current = 0;
			}
			if (!keyIsPressed) {
				player.animation.current = 0;
				player.animation.value = 0;
			}

		}; // determines key input and sets the animation values
		var DrawWorld = function() {
			var cw = world[coords.z][coords.y][coords.x];
			for (var i = 0; i < cw.map.length; i++) {
				var w = cw.map[i];
				if (w.large !== true) {
					image(w.image, w.x + 10, w.y + 10);
				} else {
					image(w.image, w.x + 10, w.y - 6);
				}
			}
			// loops through the enemies in the world
			if (cw.enemy !== undefined) {
				for (var i = 0; i < cw.enemy.length; i++) {
					var e = cw.enemy[i];
					// sets their level
					if (e.level === undefined) {
						e.level = round(random(enemies[e.name].level.min, enemies[e.name].level.max));
					}
					if (!e.dead) {

						// draws the enemy
						if (enemies[e.name].wide === undefined) {
							image(e.image, e.x + 10, e.y - 14);
						} else {
							image(e.image, e.x + 2, e.y + 10);
						}
						// displays info about the enemy
						if ((Hover(e.x + 10, e.y - 14, 32, 48) && enemies[e.name].wide !== undefined) || (Hover(e.x + 2, e.y + 10, 48, 32) && enemies[e.name].wide === undefined)) {
							Info(e.name + '\n' + 'level ' + e.level);
							// if the mouse is pressed and the player is close enough, enter combat mode
							if ((dist(e.x + 16, e.y + 32, player.loc.x + 16, player.loc.y + 32) <= 64 && mouseIsPressed && combat === 'nothing')) {
								// stores the enemy in the combat variable
								combat = Object.create(enemies[e.name]);
								combat.level = e.level;
								// sets the enemies ability cooldown values
								combat.cooldown = {
									value: combat.speed,
									change: -1
								};
								// sets the enemies health
								combat.health = combat.maxHealth;
								combat.energy = combat.maxEnergy;
								// stores the enemies x and y coordinates
								combat.x = e.x;
								combat.y = e.y;
							}

						}
						if (dist(e.x + 16, e.y + 32, player.loc.x + 16, player.loc.y + 32) <= 64 && combat === 'nothing' && e.aggression === 'aggressive' && !godMode && player.stats.level <= e.level + 3 && inventory.character.helmet !== 'cap of darkness') {
							// stores the enemy in the combat variable
							combat = Object.create(enemies[e.name]);
							combat.level = e.level;
							// sets the enemies ability cooldown values
							combat.cooldown = {
								value: -1,
								change: -1
							};
							// sets the enemies health
							combat.health = combat.maxHealth;
							combat.energy = combat.maxEnergy;
							// stores the enemies x and y coordinates
							combat.x = e.x;
							combat.y = e.y;
						}
						// checks to see if the player is finding the enemy
						if (combat.x === e.x && combat.y === e.y) {
							// kills the enemy if it has no health
							if (combat.health <= 0) {
								var gainedXp = e.level * 10;
								player.stats.xp += gainedXp;
								for (var i = 0; i < inventory.quests.length; i++) {
									var quest = quests[questGivers[inventory.quests[i]].gives].chain[quests[questGivers[inventory.quests[i]].gives].current];
									if (quest.type === 'kill' && quest.requires === combat.name) {
										quest.slain++;
									}
								}
								ActionText(gainedXp + ' Xp', player.loc.x, player.loc.y);
								e.dead = true;
								DeathAnimation(e.x, e.y);
								hover.enemy = false;
							}
							if (e.dead === true) {
								player.actions.fighting = false;
								// generates the loot
								if (!player.actions.looting) {
									var roll = round(random(0, 100));
									for (var j = 0; j < combat.loot.length; j++) {
										if (roll <= combat.loot[j].chance) {
											player.actions.looting = combat.loot[j].name;
											break;
										}
									}
								}
								combat = 'nothing';
							}
						}
					}
				}
				for (var i = 0; i < cw.enemy.length; i++) {
					var e = cw.enemy[i];
					if ((Hover(e.x + 10, e.y - 14, 32, 48) && enemies[e.name].wide !== undefined) || (Hover(e.x + 2, e.y + 10, 48, 32) && enemies[e.name].wide === undefined)) {
						if (!e.dead) {
							hover.enemy = true;
							break;
						}
					} else if (i === cw.enemy.length - 1) {
						hover.enemy = false;
					}
				}
			}
			// loops through the vendors in the world
			if (cw.vendors !== undefined) {
				for (var i = 0; i < cw.vendors.length; i++) {
					var e = cw.vendors[i];
					image(humanDown1, e.x + 10, e.y - 6);
					if (vendors[e.name].outfit['shirt'] !== 'nothing') {
						image(items[vendors[e.name].outfit['shirt']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (vendors[e.name].outfit['pants'] !== 'nothing') {
						image(items[vendors[e.name].outfit['pants']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (vendors[e.name].outfit['gloves'] !== 'nothing') {
						image(items[vendors[e.name].outfit['gloves']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (vendors[e.name].outfit['boots'] !== 'nothing') {
						image(items[vendors[e.name].outfit['boots']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (vendors[e.name].outfit['helmet'] !== 'nothing') {
						image(items[vendors[e.name].outfit['helmet']].animation.down, e.x + 10, e.y - 14);
					}
					if (Hover(e.x + 10, e.y - 6, 32, 48)) {
						Info(e.name + '\nclick to trade');
						if (dist(e.x + 16, e.y, player.loc.x + 16, player.loc.y + 32) > 64 && mouseIsPressed && clickTimer.value === 0) {
							clickTimer.change = 0.2;
							ActionText('I\'m too far away', player.loc.x, player.loc.y);
						}
						if (dist(e.x + 16, e.y, player.loc.x + 16, player.loc.y + 32) <= 64 && mouseIsPressed) {
							currentVendor = e.name;
							player.actions.trading = true;
						}
					}
				}
				for (var i = 0; i < cw.vendors.length; i++) {
					var e = cw.vendors[i];
					if (Hover(e.x + 10, e.y - 6, 32, 48)) {
						hover.vendor = true;
						break;
					} else if (i === cw.vendors.length - 1) {
						hover.vendor = false;
					}
				}
			}
			// loops through the quests in the world
			if (cw.quests !== undefined) {
				for (var i = 0; i < cw.quests.length; i++) {
					var e = cw.quests[i];
					image(humanDown1, e.x + 10, e.y - 6);
					if (questGivers[e.name].outfit['shirt'] !== 'nothing') {
						image(items[questGivers[e.name].outfit['shirt']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (questGivers[e.name].outfit['pants'] !== 'nothing') {
						image(items[questGivers[e.name].outfit['pants']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (questGivers[e.name].outfit['gloves'] !== 'nothing') {
						image(items[questGivers[e.name].outfit['gloves']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (questGivers[e.name].outfit['boots'] !== 'nothing') {
						image(items[questGivers[e.name].outfit['boots']].animation.down[0], e.x + 10, e.y - 6);
					}
					if (questGivers[e.name].outfit['helmet'] !== 'nothing') {
						image(items[questGivers[e.name].outfit['helmet']].animation.down, e.x + 10, e.y - 14);
					}
					if (Hover(e.x + 10, e.y - 6, 32, 48)) {
						Info(e.name + '\n' + 'click to talk');
						if (dist(e.x + 16, e.y, player.loc.x + 16, player.loc.y + 32) > 64 && mouseIsPressed && clickTimer.value === 0) {
							clickTimer.change = 0.2;
							ActionText('I\'m too far away', player.loc.x, player.loc.y);
						}
						if (dist(e.x + 16, e.y, player.loc.x + 16, player.loc.y + 32) <= 64 && mouseIsPressed) {
							currentQuest = e.name;
							player.actions.questing = true;
						}
					}
				}
				for (var i = 0; i < cw.quests.length; i++) {
					var e = cw.quests[i];
					if (Hover(e.x + 10, e.y - 6, 32, 48)) {
						hover.quest = true;
						break;
					} else if (i === cw.quests.length - 1) {
						hover.quest = false;
					}
				}
			}
			if (cw.interactings !== undefined) {
				for (var i = 0; i < cw.interactings.length; i++) {
					var e = cw.interactings[i];
					if (!e.looted) {
						image(interactings[e.name].image, e.x + 10, e.y + 10);
						if (Hover(e.x + 10, e.y + 10, 32, 48)) {
							Info(e.name + '\n' + 'click to interact');
							if (dist(e.x + 16, e.y, player.loc.x + 16, player.loc.y + 32) > 64 && mouseIsPressed && clickTimer.value === 0) {
								clickTimer.change = 0.2;
								ActionText('I\'m too far away', player.loc.x, player.loc.y);
							}
							if (dist(e.x + 16, e.y, player.loc.x + 16, player.loc.y + 32) <= 64 && mouseIsPressed) {
								if (!player.actions.looting) {
									e.amount--;
								}
								player.actions.looting = interactings[e.name].loot;
								if (e.amount <= 0) {
									e.looted = true;
								}
								if (e.uses !== undefined) {
									world[coords.z][coords.y][coords.x].interactings.splice(i, 1);
								}
							}
						}
					}
				}
				for (var i = 0; i < cw.interactings.length; i++) {
					var e = cw.interactings[i];
					if (Hover(e.x + 10, e.y + 10, 32, 48)) {
						if (!e.looted) {
							hover.interacting = true;
							break;
						}
					} else if (i === cw.interactings.length - 1) {
						hover.interacting = false;
					}
				}
			}
			for (var i = 0; i < cw.map.length; i++) {
				var w = cw.map[i];
				// checks collisions with each block based upon the players location
				var col = Collision(player.loc.x, player.loc.y + 4, w.x + 10, w.y + 10, 32, 32, 32, 32);
				if (col === 'up') {
					if (w.type === 'solid') {
						player.loc.y += player.stats.speed;
					}
					if (w.type === 'death') {
						player.stats.health = -10;
					}
					if (w.type === 'up') {
						if (clickTimer.value === 0) {
							coords.z++;
							ResetMap(coords.z - 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
							if (w.name === 'door up') {
								player.loc.y -= 48;
							}
						}
						player.loc.y += player.stats.speed;
					}
					if (w.type === 'down') {
						if (clickTimer.value === 0) {
							coords.z--;
							ResetMap(coords.z + 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
						}
						player.loc.y += player.stats.speed;
					}
				}
				if (col === 'down') {
					if (w.type === 'solid') {
						player.loc.y += -player.stats.speed;
					}
					if (w.type === 'death') {
						player.stats.health = -10;
					}
					if (w.type === 'up') {
						if (clickTimer.value === 0) {
							coords.z++;
							ResetMap(coords.z - 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
						}
						player.loc.y -= player.stats.speed;
					}
					if (w.type === 'down') {
						if (clickTimer.value === 0) {
							coords.z--;
							ResetMap(coords.z + 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
							if (w.name === 'door down') {
								player.loc.y += 48;
							}
						}
						player.loc.y -= player.stats.speed;
					}
				}
				if (col === 'left') {
					if (w.type === 'solid') {
						player.loc.x += player.stats.speed;
					}
					if (w.type === 'death') {
						player.stats.health = -10;
					}
					if (w.type === 'up') {
						if (clickTimer.value === 0) {
							coords.z++;
							ResetMap(coords.z - 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
						}
						player.loc.x += player.stats.speed;
					}
					if (w.type === 'down') {
						if (clickTimer.value === 0) {
							coords.z--;
							ResetMap(coords.z + 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
						}
						player.loc.x += player.stats.speed;
					}
				}
				if (col === 'right') {
					if (w.type === 'solid') {
						player.loc.x += -player.stats.speed;
					}
					if (w.type === 'death') {
						player.stats.health = -10;
					}
					if (w.type === 'up') {
						if (clickTimer.value === 0) {
							coords.z++;
							ResetMap(coords.z - 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
						}
						player.loc.x -= player.stats.speed;
					}
					if (w.type === 'down') {
						if (clickTimer.value === 0) {
							coords.z--;
							ResetMap(coords.z + 1, coords.y, coords.x);
							ResetMap(coords.z, coords.y, coords.x);
							clickTimer.change = 0.2;
						}
						player.loc.x -= player.stats.speed;
					}
				}
			}

			if (player.loc.x < -8) {
				player.loc.x = 474;
				coords.x--;
				ResetMap(coords.z, coords.y, coords.x);
			} // if the player moves off the left side
			if (player.loc.x > 474) {
				player.loc.x = -8;
				coords.x++;
				ResetMap(coords.z, coords.y, coords.x);
			} // if the player moves off the right side
			if (player.loc.y > 426) {
				player.loc.y = -22;
				coords.y++;
				ResetMap(coords.z, coords.y, coords.x);
			} // if the player moves off the bottom
			if (player.loc.y < -22) {
				player.loc.y = 426;
				coords.y--;
				ResetMap(coords.z, coords.y, coords.x);
			} // if the player moves off the top
		}; // draws the world and checks for collisions

		var typingName = false;
		var page = 0; // stores the current spellbook page

		var CharacterGUI = function() {
			image(emptyHelmet, 10, 10);
			image(emptyShirt, 10, 42);
			image(emptyPants, 10, 74);
			image(emptyBoots, 10, 106);
			image(guiTopLeft, 42, 10);
			image(guiLeft, 42, 42);
			image(guiLeft, 42, 74);
			image(guiBottomLeft, 42, 106);
			image(emptyWeapon, 42, 138);
			image(guiTopRight, 74, 10);
			image(guiRight, 74, 42);
			image(guiRight, 74, 74);
			image(guiBottomRight, 74, 106);
			image(emptyShield, 74, 138);
			image(closeButton2, 106, 10);
			image(emptyGloves, 106, 42);
			image(emptyNecklace, 106, 74);
			image(emptyRing, 106, 106);
			image(downCycle[0], 58, 50);

			// draws the items equipped by the character and detects if they are clicked
			if (inventory.character.shirt !== 'nothing') {
				image(items[inventory.character.shirt].animation.down[0], 58, 50);
				image(guiSlot, 10, 42);
				image(items[inventory.character.shirt].image, 10, 42);
				if (Hover(10, 42, 32, 32)) {
					Info(ItemInfo(inventory.character.shirt));
					if (mouseIsPressed && mouseButton === LEFT) {
						StoreItem(inventory.character.shirt);
						inventory.character.shirt = 'nothing';
					}
				}
			}
			if (inventory.character.pants !== 'nothing') {
				image(items[inventory.character.pants].animation.down[0], 58, 50);
				image(guiSlot, 10, 74);
				image(items[inventory.character.pants].image, 10, 74);
				if (Hover(10, 74, 32, 32)) {
					Info(ItemInfo(inventory.character.pants));
					if (mouseIsPressed && mouseButton === LEFT) {
						StoreItem(inventory.character.pants);
						inventory.character.pants = 'nothing';

					}
				}
			}
			if (inventory.character.helmet !== 'nothing') {
				image(items[inventory.character.helmet].animation.down, 58, 42);
				image(guiSlot, 10, 10);
				image(items[inventory.character.helmet].image, 10, 10);
				if (Hover(10, 10, 32, 32)) {
					Info(ItemInfo(inventory.character.helmet));
					if (mouseIsPressed && mouseButton === LEFT) {
						StoreItem(inventory.character.helmet);
						inventory.character.helmet = 'nothing';

					}
				}
			}
			if (inventory.character.boots !== 'nothing') {
				image(items[inventory.character.boots].animation.down[0], 58, 50);
				image(guiSlot, 10, 106);
				image(items[inventory.character.boots].image, 10, 106);
				if (Hover(10, 106, 32, 32)) {
					Info(ItemInfo(inventory.character.boots));
					if (mouseIsPressed && mouseButton === LEFT) {
						StoreItem(inventory.character.boots);
						inventory.character.boots = 'nothing';

					}
				}
			}
			if (inventory.character.gloves !== 'nothing') {
				image(items[inventory.character.gloves].animation.down[0], 58, 50);
				image(guiSlot, 106, 42);
				image(items[inventory.character.gloves].image, 106, 42);
				if (Hover(106, 42, 32, 32)) {
					Info(ItemInfo(inventory.character.gloves));
					if (mouseIsPressed && mouseButton === LEFT) {
						StoreItem(inventory.character.gloves);
						inventory.character.gloves = 'nothing';

					}
				}
			}
			if (inventory.character.ring !== 'nothing') {
				image(guiSlot, 106, 106);
				image(items[inventory.character.ring].image, 106, 106);
				if (Hover(106, 106, 32, 32)) {
					Info(ItemInfo(inventory.character.ring));
					if (mouseIsPressed && mouseButton === LEFT) {
						player.stats.maxEnergy -= items[inventory.character.ring].energy;
						StoreItem(inventory.character.ring);
						inventory.character.ring = 'nothing';
					}
				}
			}
			if (inventory.character.necklace !== 'nothing') {
				image(guiSlot, 106, 74);
				image(items[inventory.character.necklace].image, 106, 74);
				if (Hover(106, 74, 32, 32)) {
					Info(ItemInfo(inventory.character.necklace));
					if (mouseIsPressed && mouseButton === LEFT) {
						player.stats.maxHealth -= items[inventory.character.necklace].health;
						StoreItem(inventory.character.necklace);
						inventory.character.necklace = 'nothing';
					}
				}
			}
			if (inventory.character.weapon !== 'nothing') {
				image(guiSlot, 42, 138);
				image(items[inventory.character.weapon].image, 42, 138);
				if (Hover(42, 138, 32, 32)) {
					Info(ItemInfo(inventory.character.weapon));
					if (mouseIsPressed && mouseButton === LEFT) {
						if (inventory.character.weapon === 'the holy hand grenade') {
							enemies['killer bunny'].loot[0].chance = 0;
						}
						StoreItem(inventory.character.weapon);
						inventory.character.weapon = 'nothing';
					}
				}
			}
			if (inventory.character.shield !== 'nothing') {
				image(guiSlot, 74, 138);
				image(items[inventory.character.shield].image, 74, 138);
				if (Hover(74, 138, 32, 32)) {
					Info(ItemInfo(inventory.character.shield));
					if (mouseIsPressed && mouseButton === LEFT) {
						StoreItem(inventory.character.shield);
						inventory.character.shield = 'nothing';
					}
				}
			}
			if (inventory.character.helmet === 'nothing' && inventory.character.hair !== 'nothing') {
				image(items[inventory.character.hair].animation.down, 58, 42);
			}

			// adds funcitonality to the close button
			if (Hover(106, 10, 32, 32) && mouseIsPressed) {
				openCharacterGui = false;
			}
		}; // draws the character pane and all equipment
		var QuestLog = function() {
			image(guiTopLeft, 138, 170);
			image(guiTop, 170, 170);
			image(guiTop, 202, 170);
			image(closeButton, 234, 170);
			image(guiLeft, 138, 202);
			image(guiMiddle, 170, 202);
			image(guiMiddle, 202, 202);
			image(guiRight, 234, 202);
			image(guiLeft, 138, 234);
			image(guiMiddle, 170, 234);
			image(guiMiddle, 202, 234);
			image(guiRight, 234, 234);
			image(guiLeft, 138, 266);
			image(guiMiddle, 170, 266);
			image(guiMiddle, 202, 266);
			image(guiRight, 234, 266);
			image(guiLeft, 138, 298);
			image(guiMiddle, 170, 298);
			image(guiMiddle, 202, 298);
			image(guiRight, 234, 298);
			image(guiBottomLeft, 138, 330);
			image(guiBottom, 170, 330);
			image(guiBottom, 202, 330);
			image(guiBottomRight, 234, 330);
			if (questShowing === 'nothing') {
				fill(255, 255, 255);
				textSize(10);
				text('Quests - ' + inventory.quests.length + '/15', 150, 192);
				textSize(12);
				for (var i = 0; i < inventory.quests.length; i++) {
					fill(255, 255, 255);
					textSize(10);
					var quest = quests[questGivers[inventory.quests[i]].gives].chain[quests[questGivers[inventory.quests[i]].gives].current];
					text(quest.name, 150, 204 + 12 * i);
					if (Hover(150, 204 + 12 * (i - 1), 96, 12)) {
						if (quest.type === 'gather') {
							if (items[quest.requires].amount !== undefined) {
								Info(inventory.quests[i] + '\n' + quest.requires + '\n' + items[quest.requires].amount + '/' + (quest.amount) + '\nclick to view details');
							} else {
								Info(inventory.quests[i] + '\n' + quest.requires + '\n0/' + quest.amount + '\nclick to view details');
							}
						}
						if (quest.type === 'kill') {
							Info(inventory.quests[i] + '\n' + quest.requires + '\n' + quest.slain + '/' + quest.amount + '\nclick to view details');
						}
						if (mouseIsPressed) {
							questShowing = quest;
						}
					}
					textSize(12);
				}
			} else {
				textSize(9.2);
				fill(255, 255, 255);
				text(questShowing.name, 150, 192);
				text(questShowing.details, 148, 202, 112, 122);
				textSize(12);
			}
			if (Hover(234, 170, 32, 32) && mouseIsPressed) {
				openQuestLog = false;
				questShowing = 'nothing';
			}
		};
		var SpellBook = function() {
			if (openSpellBook) {
				image(guiTopLeft, 138, 10);
				image(guiTop, 170, 10);
				image(guiTop, 202, 10);
				image(closeButton, 234, 10);
				image(guiLeft, 138, 42);
				image(guiSlot, 170, 42);
				image(guiSlot, 202, 42);
				image(guiRight, 234, 42);
				image(guiLeft, 138, 74);
				image(guiSlot, 170, 74);
				image(guiSlot, 202, 74);
				image(guiRight, 234, 74);
				image(guiLeft, 138, 106);
				image(guiSlot, 170, 106);
				image(guiSlot, 202, 106);
				image(guiRight, 234, 106);
				image(backButton, 138, 138);
				image(guiBottom, 170, 138);
				image(guiBottom, 202, 138);
				image(nextButton, 234, 138);

				// draws the abilities in the spellbook
				for (var i = 0; i < inventory.spellbook[page].length; i++) {
					if (inventory.spellbook[page][i] !== undefined) {
						var spell = abilities[inventory.spellbook[page][i]];
						// sets the x and y coordinates of the abilities in the book
						var temp = {
							x: 0,
							y: 0
						};
						if (i % 2 === 0) {
							temp.x = 170;
						} else {
							temp.x = 202;
						}
						if (i <= 1) {
							temp.y = 42;
						} else if (i <= 3) {
							temp.y = 74;
						} else {
							temp.y = 106;
						}
						// draws the ability
						image(spell.image, temp.x, temp.y);

						// detects if the mouse is over the icon
						if (Hover(temp.x, temp.y, 32, 32)) {
							// displays info about the ability
							if (spell.type !== 'buff') {
								Info(spell.name + '\n' + spell.amount + ' ' + spell.type + '\ncosts ' + spell.energyCost + ' energy\nkeys 1-5 to assign');
							} else {
								var buff = buffs[spell.buffName];
								var message = spell.name + '\nlasts for ' + round(buff.duration / 60) + 's\ncosts ' + spell.energyCost + ' energy\n';
								if (buff.type === 'dot') {
									message += buff.amount + ' damage per second';
								}
								if (buff.type === 'health') {
									message += '+' + buff.amount + ' health';
								}
								if (buff.type === 'energy') {
									message += '+' + buff.amount + ' energy';
								}
								if (buff.type === 'healthRegen') {
									message += 'health regeneration\nis ' + (0.05 + buff.amount) / 0.05 + ' times faster';
								}
								if (buff.type === 'energyRegen') {
									message += 'energy regeneration\nis ' + (0.05 + buff.amount) / 0.05 + ' times faster';
								}
								Info(message);
							}
							// adds the ability to the bar if the right hotkey is pressed
							for (var j = 1; j < 6; j++) {
								if (keys[j + 48] && spell.name !== inventory.abilities[1] && spell.name !== inventory.abilities[2] && spell.name !== inventory.abilities[3] && spell.name !== inventory.abilities[4] && spell.name !== inventory.abilities[5]) {
									inventory.abilities[j] = spell.name;
									abilityCooldowns[j].max = spell.cooldown;
									abilityCooldowns[j].value = spell.cooldown;
									abilityCooldowns[j].change = 0;
									break;
								}
							}
						}
					}
				}
				// close button
				if (Hover(234, 10, 32, 32) && mouseIsPressed) {
					openSpellBook = false;
				}
				// next button
				if (Hover(234, 138, 32, 32) && mouseIsPressed && clickTimer.value === 0 && inventory.spellbook[page + 1] !== undefined) {
					page++;
					clickTimer.change = 1;
				}
				// back button
				if (Hover(138, 138, 32, 32) && mouseIsPressed && clickTimer.value === 0 && inventory.spellbook[page - 1] !== undefined) {
					page--;
					clickTimer.change = 1;
				}
			}
		}; // draws the spellbook
		var OpenBags = function() {
			// draws the open bags if their corresponding bags value = true
			for (var i = 1; i < 6; i++) {
				// makes sure the bag opened exists
				if (inventory.bags[i] !== 'nothing') {
					if (bags[i]) {
						for (var j = 0; j < inventory[i].length; j++) {
							if (items[inventory[i][j]].amount <= 0 || items[inventory[i][j]].amount === undefined) {

								inventory[i].splice(j, 1);
							} else {
								var tempX;
								var tempY;
								// sets the image coordinates of the first row
								if (j < items[inventory.bags[i]].slots / 2 - 1) {
									tempX = 458 - 32 * (items[inventory.bags[i]].slots / 2 - 1) + j * 32;
									tempY = 10 + (i - 1) * 64;
								} else {
									// sets the image coordinates of the second row
									tempX = 458 - 32 * (items[inventory.bags[i]].slots / 2 - 1) + (j - (items[inventory.bags[i]].slots / 2)) * 32;
									tempY = 42 + (i - 1) * 64;
								}
								// draws the item based upon the temporary coordinates stored
								image(items[inventory[i][j]].image, tempX, tempY);
								fill(255, 255, 255);
								text(items[inventory[i][j]].amount, tempX + 2, tempY + 10);
								// detects if the mouse is over an item
								if (Hover(tempX, tempY, 32, 32)) {
									// displays info about the item
									Info(ItemInfo(inventory[i][j]));
									// equips the item if it clicked
									if (mouseIsPressed && mouseButton === LEFT && clickTimer.value === 0) {
										UseItem(inventory[i][j], i, j);
										clickTimer.change = 1;
									}
								}
							}
						}
						// adds functionality to the icon in the top right corner of each bag
						if (Hover(490 - 32 * (items[inventory.bags[i]].slots / 2 + 1), 10 + 64 * (i - 1), 32, 32)) {
							// displays the action
							Info('\n\nLeft click to clear');
							// clears the bag
							if (mouseIsPressed) {
								ClearBag(i);
							}
						}
					}
				}
			}
		}; // draws the open bags
		var Bar = function() {
			// draws the ability slots
			for (var i = 0; i < 5; i++) {
				image(guiSlot, 10 + 32 * i, 458);
				textFont(Mono);
				fill(255, 255, 255);
				if (inventory.abilities[i + 1] !== 'nothing') {
					var spell = abilities[inventory.abilities[i + 1]];
					image(spell.image, 10 + 32 * i, 458);
					if (spell.energyCost > player.stats.energy) {
						fill(255, 0, 0, 100);
						rect(10 + 32 * i, 458, 32, 32);
					}
					rectMode(CORNERS);
					fill(0, 0, 0, 150);

					rect(10 + i * 32, 490, 10 + (i + 1) * 32, 458 + round((32 / abilityCooldowns[i + 1].max * abilityCooldowns[i + 1].value) / 2) * 2);
					rectMode(CORNER);
					if (Hover(10 + 32 * i, 458, 32, 32) && !instructions) {
						if (spell.type !== 'buff') {
							Info(spell.name + '\n' + spell.amount + ' ' + spell.type + '\ncosts ' + spell.energyCost + ' energy');
						} else {
							var buff = buffs[spell.buffName];
							var message = spell.name + '\nlasts for ' + round(buff.duration / 60) + 's\ncosts ' + spell.energyCost + ' energy\n';
							if (buff.type === 'dot') {
								message += buff.amount + ' damage per second';
							}
							if (buff.type === 'health') {
								message += '+' + buff.amount + ' health';
							}
							if (buff.type === 'energy') {
								message += '+' + buff.amount + ' energy';
							}
							if (buff.type === 'healthRegen') {
								message += 'health regeneration\nis ' + (0.05 + buff.amount) / 0.05 + ' times faster';
							}
							if (buff.type === 'energyRegen') {
								message += 'energy regeneration\nis ' + (0.05 + buff.amount) / 0.05 + ' times faster';
							}
							Info(message);
						}
					}
				}

				fill(255, 255, 255);
				text(i + 1, 12 + 32 * i, 470);
			}

			// draws the bag slots
			for (var i = 0; i < 5; i++) {
				// draws a bag in the slot if it is not empty
				if (inventory.bags[i + 1] !== 'nothing') {
					image(guiSlot, 330 + 32 * i, 458);
					image(items[inventory.bags[i + 1]].image, 330 + 32 * i, 458);
				} else {
					image(emptyBagSlot, 330 + 32 * i, 458);
				}
			}
			image(coinGui, 266, 458);
			fill(255, 255, 255);
			text(inventory.coins, 284, 471);
			text('level ' + player.stats.level, 270, 486);
			// the character pane icon
			image(characterIcon, 170, 458);
			// the spell book icon
			image(bookIcon, 202, 458);
			// the missions icon
			image(scrollIcon, 234, 458);

			// opens the character gui and closes it again
			if ((mouseIsPressed && Hover(170, 458, 32, 32) && clickTimer.value === 0 && !instructions) || (keys[67] && clickTimer.value === 0 && !instructions)) {
				if (!openCharacterGui) {
					openCharacterGui = true;
					clickTimer.change = 1;
				} else if (openCharacterGui) {
					openCharacterGui = false;
					clickTimer.change = 1;
				}
			}
			if (Hover(170, 458, 32, 32) && !instructions) {
				Info('open character panel (c)');
			}
			// opens the spell book and closes it again
			if ((mouseIsPressed && Hover(202, 458, 32, 32) && clickTimer.value === 0 && !instructions) || (keys[86] && clickTimer.value === 0 && !instructions)) {
				if (!openSpellBook) {
					openSpellBook = true;
					clickTimer.change = 1;
				} else if (openSpellBook) {
					openSpellBook = false;
					clickTimer.change = 1;
				}
			}
			if (Hover(202, 458, 32, 32) && !instructions) {
				Info('open spellbook (v)');
			}
			// open the quest log
			if ((mouseIsPressed && Hover(234, 458, 32, 32) && clickTimer.value === 0 && !instructions) || (keys[76] && clickTimer.value === 0 && !instructions)) {
				if (!openQuestLog) {
					openQuestLog = true;
					clickTimer.change = 1;
				} else if (openQuestLog) {
					openQuestLog = false;
					clickTimer.change = 1;
				}
			}
			if (Hover(234, 458, 32, 32) && !instructions) {
				Info('open the quest-log (l)');
			}
			if (openCharacterGui && !instructions) {
				CharacterGUI();
			}
			if (openQuestLog && !instructions) {
				QuestLog();
			}

			// draws the bags
			for (var i = 1; i < 6; i++) {
				// checks if the mouse is overlapping the bag button
				if (inventory.bags[i] !== 'nothing') {
					// closes the bag if the close button on the bag itself is clicked
					if (bags[i] && !instructions) {
						Bag(10 + 32 * 2 * (i - 1), items[inventory.bags[i]].image, items[inventory.bags[i]].slots);

						if (Hover(458, 10 + 32 * 2 * (i - 1), 32, 32) && mouseIsPressed) {
							bags[i] = false;
						}
					}

					// checks if the mouse is over the bag icon
					if (Hover(330 + 32 * (i - 1), 458, 32, 32) && !instructions) {
						// displays info about the bag
						Info(items[inventory.bags[i]].name + '\n' + items[inventory.bags[i]].slots + ' slot bag\nclick to open\nright-click to dequip');

						// opens and closes the bag
						if (mouseIsPressed && clickTimer.value === 0 && mouseButton === LEFT) {
							if (!bags[i]) {
								bags[i] = true;
								clickTimer.change = 1;
							} else if (bags[i]) {
								bags[i] = false;
								clickTimer.change = 1;
							}
						}
						// dequips a bag if it is empty
						if (mouseIsPressed && mouseButton === RIGHT && inventory[i].length === 0 && clickTimer.value === 0 && TotalSlots() > items[inventory.bags[i]].slots) {
							// temporarily stores the bag name
							var temp = inventory.bags[i];
							// changes the bag to nothing
							inventory.bags[i] = 'nothing';
							// moves the bag into the first available slot
							StoreItem(temp);
							clickTimer.change = 1;
						}
					}
				}
			}

			// closes the bags using the keyboard shortcut
			if (keys[66] && clickTimer.value === 0 && !instructions) {
				var total = {
					open: 0,
					closed: 0
				};

				for (var i = 1; i < 6; i++) {
					if (inventory.bags[i] !== 'nothing') {
						if (!bags[i]) {
							total.closed++;
						} else if (bags[i]) {
							total.open++;
						}
					}
				}
				if (total.open > total.closed) {
					for (var i = 1; i < 6; i++) {
						if (inventory.bags[i] !== 'nothing') {
							bags[i] = false;
							clickTimer.change = 1;
						}
					}
				}
				if (total.open < total.closed) {
					for (var i = 1; i < 6; i++) {
						if (inventory.bags[i] !== 'nothing') {
							bags[i] = true;
							clickTimer.change = 1;
						}
					}
				}
			}

		}; // draws the action bars at the bottom of the screen
		var VendorGui = function() {
			if (currentVendor !== 'nothing') {
				image(guiTopLeft, 10, 170);
				image(guiTop, 42, 170);
				image(guiTop, 74, 170);
				image(closeButton, 106, 170);
				fill(255, 255, 255);
				text(currentVendor, 22, 192);
				image(guiLeft, 10, 202);
				image(guiSlot, 42, 202);
				image(guiSlot, 74, 202);
				image(guiRight, 106, 202);
				image(guiLeft, 10, 234);
				image(guiSlot, 42, 234);
				image(guiSlot, 74, 234);
				image(guiRight, 106, 234);
				image(guiLeft, 10, 266);
				image(guiSlot, 42, 266);
				image(guiSlot, 74, 266);
				image(guiRight, 106, 266);
				image(guiBottomLeft, 10, 298);
				image(guiBottom, 42, 298);
				image(guiBottom, 74, 298);
				image(guiBottomRight, 106, 298);

				for (var i = 0; i < vendors[currentVendor].sells.length; i++) {
					var temp = {};
					if (i % 2 !== 0) {
						temp.x = 74;
					} else {
						temp.x = 42;
					}
					if (i < 2) {
						temp.y = 202;
					} else if (i < 4) {
						temp.y = 234;
					} else {
						temp.y = 266;
					}
					image(items[vendors[currentVendor].sells[i]].image, temp.x, temp.y);
					if (Hover(temp.x, temp.y, 32, 32)) {
						Info(ItemInfo(vendors[currentVendor].sells[i]));
						if (mouseIsPressed && clickTimer.value === 0 && inventory.coins >= items[vendors[currentVendor].sells[i]].buy && AvailableSlots() > 0) {
							inventory.coins -= items[vendors[currentVendor].sells[i]].buy;
							StoreItem(vendors[currentVendor].sells[i]);
							clickTimer.change = 1;
						}
					}
				}

				if (Hover(106, 170, 32, 32) && mouseIsPressed) {
					currentVendor = 'nothing';
					player.actions.trading = false;
				}
			}
		};
		var QuestGui = function() {
			if (currentQuest !== 'nothing') {
				var questObject = quests[questGivers[currentQuest].gives];
				if (questObject.chain[questObject.current] !== undefined) {
					player.actions.questing = true;
					var quest = questObject.chain[questObject.current];
					image(guiTopLeft, 138, 170);
					image(guiTop, 170, 170);
					image(guiTop, 202, 170);
					image(closeButton, 234, 170);
					fill(255, 255, 255);
					textSize(10);
					text(currentQuest, 150, 192);
					textSize(12);
					image(guiLeft, 138, 202);
					image(guiMiddle, 170, 202);
					image(guiMiddle, 202, 202);
					image(guiRight, 234, 202);
					image(guiLeft, 138, 234);
					image(guiMiddle, 170, 234);
					image(guiMiddle, 202, 234);
					image(guiRight, 234, 234);
					image(guiLeft, 138, 266);
					image(guiMiddle, 170, 266);
					image(guiMiddle, 202, 266);
					image(guiRight, 234, 266);
					image(guiLeft, 138, 298);
					image(guiMiddle, 170, 298);
					image(guiMiddle, 202, 298);
					image(guiRight, 234, 298);
					image(guiBottomLeft, 138, 330);
					image(guiBottom, 170, 330);
					image(guiBottom, 202, 330);

					if (Hover(234, 170, 32, 32) && mouseIsPressed) {
						player.actions.questing = false;
						currentQuest = 'nothing';
					}
					if (quest.status === 'nothing') {
						image(acceptButton, 234, 330);
						textSize(9.2);
						fill(255, 255, 255);
						text(quest.details, 148, 202, 112, 122);
						textSize(12);

						if (Hover(234, 330, 32, 32) && mouseIsPressed) {
							player.actions.questing = false;
							quest.status = 'accepted';
							inventory.quests.push(currentQuest);
							currentQuest = 'nothing';
						}
					} else if (quest.status === 'accepted') {
						if ((quest.type === 'gather' && items[quest.requires].amount >= quest.amount) || (quest.slain >= quest.amount && quest.type === 'kill')) {
							image(acceptButton, 234, 330);
							textSize(9.2);
							fill(255, 255, 255);
							text(quest.finish, 148, 202, 112, 122);
							textSize(12);

							if (Hover(234, 330, 32, 32) && mouseIsPressed) {
								player.actions.questing = false;
								quest.status = 'finished';
								questObject.current++;
								if (quest.type === 'gather') {
									for (var i = 0; i < quest.amount; i++) {
										RemoveItem(quest.requires);
									}
								}
								for (var i = 0; i < inventory.quests.length; i++) {
									if (currentQuest === inventory.quests[i]) {
										inventory.quests.splice(i, 1);
									}
								}
								StoreItem(quest.reward);
								player.stats.xp += quest.xp;
								currentQuest = 'nothing';
							}
						} else {
							image(guiBottomRight, 234, 330);
							textSize(9.2);
							fill(255, 255, 255);
							if (quest.type === 'gather') {
								if (quest.amount > 1) {
									text(player.name + ', come back once you have the ' + quest.requires + 's.', 148, 202, 112, 112);
								} else {
									text(player.name + ', come back once you have the ' + quest.requires + '.', 148, 202, 112, 112);
								}
							} else {
								if (quest.amount > 1) {
									text(player.name + ', return once you have slain the ' + quest.requires + 's.', 148, 202, 112, 112);
								} else {
									text(player.name + ', return once you have slain the ' + quest.requires + '.', 148, 202, 112, 112);
								}
							}
							textSize(12);
						}
					}
				} else {
					currentQuest = 'nothing';
					player.actions.questing = false;
				}

			}
		};

		var HealthBar = function(maxHealth, health, maxEnergy, energy, x, y) {
			image(healthBarLeft, x, y);
			image(healthBarMiddle, x + 32, y);
			image(healthBarMiddle, x + 64, y);
			image(healthBarRight, x + 96, y);
			// makes sure the health is proportional to the size of the bar and draws it
			for (var i = 0; i < health * (50 / maxHealth) && i < maxHealth * (50 / maxHealth); i++) {
				noStroke();
				fill(colors['e']);
				rect(x + 14 + i * 2, y + 12, 2, 4);
				fill(colors['f']);
				rect(x + 14 + i * 2, y + 10, 2, 2);
			}
			// makes sure the energy is proportional to the size of the bar and draws it
			for (var i = 0; i < energy * (50 / maxEnergy) && i < maxEnergy * (50 / maxEnergy); i++) {
				noStroke();
				fill(colors['A']);
				rect(x + 14 + i * 2, y + 18, 2, 4);
				fill(colors['D']);
				rect(x + 14 + i * 2, y + 16, 2, 2);
			}
			if (health > maxHealth) {
				health = maxHealth;
			}
			if (energy > maxEnergy) {
				energy = maxEnergy;
			}
		}; // draws the health an energy bar
		var XpBar = function() {
			fill(colors['b']);
			rect(10, 450, 478, 4);
			for (var i = 0; i < player.stats.xp * (238 / player.stats.maxXp) && i < player.stats.maxXp * (238 / player.stats.maxXp); i++) {
				fill(colors['J']);
				rect(12 + i * 2, 450, 2, 2);
				fill(colors['I']);
				rect(12 + i * 2, 452, 2, 2);
			}
			for (var i = 0; i < 15; i++) {
				image(xpBar, 10 + i * 32, 426);
			}
			if (player.stats.xp === player.stats.maxXp) {
				player.stats.level++;
				player.stats.xp = 0;
				player.stats.maxXp += 200;
			} else if (player.stats.xp > player.stats.maxXp) {
				var temp = player.stats.xp - player.stats.maxXp;
				player.stats.level++;
				ActionText('Level ' + player.stats.level, player.loc.x, player.loc.y);
				AbilityAnimation(levelUp, player.loc.x, player.loc.y - 32);
				player.stats.xp = temp;
				player.stats.maxXp += 200;
			}
		}; // draws the experience bar
		var Cooldowns = function() {
			// increments each ability cooldown
			for (var i = 1; i < 6; i++) {
				if (abilityCooldowns[i].value !== undefined) {
					abilityCooldowns[i].value += abilityCooldowns[i].change;
					// resets each ability cooldown
					if (abilityCooldowns[i].value < 0) {
						abilityCooldowns[i].change = 0;
						abilityCooldowns[i].value = abilityCooldowns[i].max;
					}
				}
			}
			for (var i = player.buffs.length - 1; i > -1; i--) {
				var buff = player.buffs[i];
				buff.duration--;
				if (buff.type === 'dot') {
					if (buff.duration % 60 === 0) {
						player.stats.health -= buff.amount;
						ActionText(buff.amount, player.loc.x, player.loc.y);
					}
				}
				if (player.stats.health <= 0) {
					buff.duration = 0;
				}
				if (buff.duration < 0) {
					if (buff.type === 'health') {
						player.stats.maxHealth -= buff.amount;
					}
					if (buff.type === 'healthRegen') {
						player.stats.healthRegen -= buff.amount;
					}
					if (buff.type === 'energy') {
						player.stats.maxEnergy -= buff.amount;
					}
					if (buff.type === 'energyRegen') {
						player.stats.energyRegen -= buff.amount;
					}
					player.buffs.splice(i, 1);
				}
			}
		}; // sets the global and player ability cooldowns
		var GiveBuff = function(name) {
			var buff = buffs[name];
			for (var i = 0; i < player.buffs.length; i++) {
				var pbuff = player.buffs[i];
				if (pbuff.name === buff.name) {
					return false;
				} else if (pbuff.name !== buff.name && i === player.buffs.length - 1) {
					player.buffs.push(Object.create(buff));
					return true;
				}
			}
			if (player.buffs.length === 0) {
				player.buffs.push(Object.create(buff));
				if (buff.type === 'health') {
					player.stats.maxHealth += buff.amount;
				}
				if (buff.type === 'healthRegen') {
					player.stats.healthRegen += buff.amount;
				}
				if (buff.type === 'energy') {
					player.stats.maxEnergy += buff.amount;
				}
				if (buff.type === 'energyRegen') {
					player.stats.energyRegen += buff.amount;
				}
				return true;
			}
		};
		var Buff = function() {
			for (var i = 1; i < 6; i++) {
				if (!openSpellBook && inventory.abilities[i] !== 'nothing') {
					// if the key is pressed or the mouse is clicked on the button
					if ((keys[i + 48] || (Hover(10 + (i - 1) * 32, 458, 32, 32) && mouseIsPressed)) && player.stats.energy >= abilities[inventory.abilities[i]].energyCost && abilityCooldowns[i].value === abilityCooldowns[i].max) {
						if (abilities[inventory.abilities[i]].type === 'buff') {
							var give = GiveBuff(abilities[inventory.abilities[i]].buffName);
							if (give === true) {
								player.stats.energy -= abilities[inventory.abilities[i]].energyCost;
								abilityCooldowns[i].change = -1;
								AbilityAnimation(abilities[inventory.abilities[i]].animation, player.loc.x, player.loc.y - 32);
							}
						}
					}
				}
			}
		};
		var BuffBar = function() {
			for (var i = 0; i < player.buffs.length; i++) {
				var buff = player.buffs[i];
				image(emptyBuff, 10 + i * 32, 42);
				image(buff.image, 10 + i * 32, 42);
				if (Hover(10 + i * 32, 42, 32, 32)) {
					var message = buff.name + '\n' + round(buff.duration / 60) + 's\n';
					if (buff.type === 'dot') {
						message += buff.amount + ' damage per second';
					}
					if (buff.type === 'health') {
						message += '+' + buff.amount + ' health';
					}
					if (buff.type === 'energy') {
						message += '+' + buff.amount + ' energy';
					}
					if (buff.type === 'healthRegen') {
						message += 'health regeneration\nis ' + (0.05 + buff.amount) / 0.05 + ' times faster';
					}
					if (buff.type === 'energyRegen') {
						message += 'energy regeneration\nis ' + (0.05 + buff.amount) / 0.05 + ' times faster';
					}
					Info(message);
				}
			}
		};
		var Combat = function() {
			if (combat !== 'nothing') {
				player.actions.fighting = true;
				// draws the enemies health bar
				HealthBar(combat.maxHealth, combat.health, combat.maxEnergy, combat.energy, 362, 10);
				// increments the enemies cooldown
				combat.cooldown.value += combat.cooldown.change;
				if (combat.cooldown.value < 0) {
					// generates a random number to decide whether to attack or use a special ability
					var attack = round(random(1, 2));
					// if the enemy has no special ability default is attack
					if (combat.debuff === undefined) {
						attack = 1;
					}
					if (attack === 1 && combat.energy >= 10) {
						// generates the hit based upon the monster and players level
						var hit = round(random(combat.damage.max, combat.damage.min)) + 12 * ((combat.level + 1) - player.stats.level);
						// generates the armor points of the player
						var armor = round(random(0, ArmorPoints()) / 2);
						// subtracts the armor points from the hit
						hit -= armor;
						// makes sure the hit isn't a negative number
						if (hit < 0) {
							hit = 0;
						}
						// takes the hit away from the player
						player.stats.health -= hit;

						// displays the amount of damage the player took
						if (hit !== 0) {
							ActionText(hit, player.loc.x, player.loc.y);
						} else {
							// displays a block if the damage is 0
							ActionText("Block", player.loc.x, player.loc.y);
						}
						// resets the enemies cooldown and takes away energy
						combat.energy -= 10;
						combat.cooldown.value = combat.speed;
					} else if (attack === 2 && combat.energy >= 20) {
						// does a special ability
						GiveBuff(combat.debuff);
						combat.energy -= 10;
						combat.cooldown.value = combat.speed;
						ActionText(combat.debuff);
					}
				}
				// detects which one of the players abilities is being used
				for (var i = 1; i < 6; i++) {
					if (!openSpellBook && inventory.abilities[i] !== 'nothing') {
						// if the key is pressed or the mouse is clicked on the button
						if ((keys[i + 48] || (Hover(10 + (i - 1) * 32, 458, 32, 32) && mouseIsPressed)) && player.stats.energy >= abilities[inventory.abilities[i]].energyCost && abilityCooldowns[i].value === abilityCooldowns[i].max) {
							// uses a damage ability
							if (abilities[inventory.abilities[i]].type === 'damage') {
								var hit = abilities[inventory.abilities[i]].amount;
								abilityCooldowns[i].change = -1;
								AbilityAnimation(abilities[inventory.abilities[i]].animation, combat.x, combat.y - 20);
								// adds the players weapon to the damage done
								if (inventory.character.weapon !== 'nothing') {
									hit += round(random(items[inventory.character.weapon].damage.min, items[inventory.character.weapon].damage.max));
								}
								// subtracts the damage from the enemies health
								combat.health -= hit;
								ActionText(hit, combat.x, combat.y);

								// subtracts energy from the player
								player.stats.energy -= abilities[inventory.abilities[i]].energyCost;
								abilityCooldowns[i].change = -1;
							}
						}
					}
				}
			}
		};
		var Regeneration = function() {
			if (player.actions.fighting) {
				if (combat.energy !== undefined) {
					combat.energy += 0.025;
				}
			}
			// increments the health of the player
			if (player.stats.health < player.stats.maxHealth) {
				player.stats.health += player.stats.healthRegen;
			}
			// increments the energy if the player is not fighting
			if (player.stats.energy < player.stats.maxEnergy) {
				player.stats.energy += player.stats.energyRegen;
			}
			if (player.stats.health > player.stats.maxHealth) {
				player.stats.health = player.stats.maxHealth;
			}
			if (player.stats.energy > player.stats.maxEnergy) {
				player.stats.energy = player.stats.maxEnergy;
			}
		}; // sets the monster's and player's energy and health regeneration
		var DisplayActionText = function() {
			for (var i = 0; i < actionText.length; i++) {
				var action = actionText[i];
				textSize(16);
				textAlign(CENTER, CENTER);
				fill(255, 255, 255, action.transp);
				text(action.message, action.x, round(action.y / 2) * 2);
				textSize(12);
				textAlign(LEFT, BASELINE);
				// moves the text up
				action.y += action.yc;
				// fades the text
				action.transp -= 2;
				// removes the text if it is completely faded
				if (action.transp < 0) {
					actionText.splice(i, 1);
				}
			}
		}; // draws all of the floating text
		var DisplayDeathAnimation = function() {
			for (var i = 0; i < deaths.length; i++) {
				var anim = deaths[i];
				if (deathCycle[round(anim.animation.value)] !== undefined) {
					image(deathCycle[round(anim.animation.value)], anim.x, anim.y);
				}
				anim.animation.value += anim.animation.change;
				if (anim.animation.value > deathCycle.length) {
					deaths.splice(i, 1);
				}
			}
		};
		var DisplayAbilityAnimations = function() {
			for (var i = 0; i < abilityAnimations.length; i++) {
				var a = abilityAnimations[i];
				if (a.animation[round(a.value)] !== undefined) {
					image(a.animation[round(a.value)], a.x, a.y);
				}
				a.value += a.change;
				if (a.value > a.animation.length - 1) {
					abilityAnimations.splice(i, 1);
				}
			}
		};
		var timer = {
			value: 0,
			change: 1
		};
		var gameOver = {
			red: 0,
			change: 0.5
		};
		if (godMode) {
			player.stats.maxHealth = 1000000;
			player.stats.maxEnergy = 1000000;
			player.stats.energy = 1000000;
			player.stats.health = 1000000;
		}
		draw = function() {
			clickTimer.value += clickTimer.change;
			if (clickTimer.value > 10) {
				clickTimer.change = 0;
				clickTimer.value = 0;
			}
			background(0, 0, 0);
			if (creator) {
				fill(colors['b']);
				rect(10, 10, 480, 480);

				textAlign(CENTER, CENTER);
				fill(colors['d']);
				textSize(26);
				text('Hair Style', 250, 250);
				text('Hair Color', 250, 314);
				textSize(14);
				text('Use WASD or ARROWS to move\nmove to update character appearance', 250, 100);
				Player();
				if (!typingName) {
					Movement();
				}

				image(backButton2, 74, 234);
				if (Hover(74, 234, 32, 32) && mouseIsPressed && clickTimer.value === 0) {
					if (hairLength > 0) {
						clickTimer.change = 1;
						hairLength--;
						inventory.character.hair = hair[hairLength][hairColor];
					} else {
						clickTimer.change = 1;
						hairLength = hair.length - 1;
						inventory.character.hair = hair[hairLength][hairColor];
					}
				}
				image(nextButton2, 394, 234);
				if (Hover(394, 234, 32, 32) && mouseIsPressed && clickTimer.value === 0) {
					if (hairLength < hair.length - 1) {
						clickTimer.change = 1;
						hairLength++;
						inventory.character.hair = hair[hairLength][hairColor];
					} else {
						clickTimer.change = 1;
						hairLength = 0;
						inventory.character.hair = hair[hairLength][hairColor];
					}
				}

				image(backButton2, 74, 298);
				if (Hover(74, 298, 32, 32) && mouseIsPressed && clickTimer.value === 0) {
					if (hairColor > 0) {
						clickTimer.change = 1;
						hairColor--;
						inventory.character.hair = hair[hairLength][hairColor];
					} else {
						clickTimer.change = 1;
						hairColor = hair[hairLength].length - 1;
						inventory.character.hair = hair[hairLength][hairColor];
					}
				}
				image(nextButton2, 394, 298);
				if (Hover(394, 298, 32, 32) && mouseIsPressed && clickTimer.value === 0) {
					if (hairColor < hair[hairLength].length - 1) {
						clickTimer.change = 1;
						hairColor++;
						inventory.character.hair = hair[hairLength][hairColor];
					} else {
						clickTimer.change = 1;
						hairColor = 0;
						inventory.character.hair = hair[hairLength][hairColor];
					}
				}
				image(healthBarLeft, 170, 394);
				image(healthBarMiddle, 202, 394);
				image(healthBarMiddle, 234, 394);
				image(healthBarMiddle, 266, 394);
				image(healthBarRight, 298, 394);

				textSize(14);
				fill(colors['1']);
				text(player.name, 250, 410);

				if (Hover(170, 394, 160, 32) && mouseIsPressed) {
					typingName = true;
					if (player.name === 'type name here') {
						player.name = '';
					}
				}
				if (!Hover(170, 394, 160, 32) && mouseIsPressed) {
					typingName = false;
				}

				image(acceptButton2, 234, 426);
				if (Hover(234, 426, 32, 32) && mouseIsPressed && player.name !== 'type name here' && player.name !== '') {
					clickTimer.change = 1;
					creator = false;
					instructions = true;
					player.loc.x = player.loc.spawnpoint[3];
					player.loc.y = player.loc.spawnpoint[4];
				}
				textAlign(LEFT, BASELINE);
			} else if (instructions) {
				background(colors['a']);

				Player();
				XpBar();
				HealthBar(player.stats.maxHealth, player.stats.health, player.stats.maxEnergy, player.stats.energy, 10, 10);
				Bar();
				
				fill(colors['d']);
				textSize(10);
				textAlign(LEFT, BASELINE);

				// labels the ability bar
				text('These are your ability slots. Click on them or press the corresponding number key to use.', 10, 308, 125, 100);
				stroke(colors['d']);
				strokeWeight(1);
				line(26, 380, 26, 474);
				line(36, 380, 58, 474);
				line(46, 380, 90, 474);
				line(56, 380, 122, 474);
				line(66, 380, 154, 474);
				noStroke();

				// labels the health bar
				text('This bar displays health (red) and energy (blue) make sure to watch them before and during combat.', 10, 52, 125, 100);

				// labels the bag bar
				text('These are your bag slots, click on them to view your inventory', 365, 308, 125, 100);
				stroke(colors['d']);
				strokeWeight(1);
				line(381, 360, 346, 474);
				line(391, 360, 378, 474);
				line(401, 360, 410, 474);
				line(411, 360, 442, 474);
				line(421, 360, 474, 474);
				noStroke();

				// labels the character pane
				text('click to view and dequip your characters armor', 10, 200, 125, 100);
				stroke(colors['d']);
				strokeWeight(1);
				line(100, 230, 186, 474);
				noStroke();

				// labels the spellbook
				text('click to view the abilities and spells you know', 125, 145, 125, 100);
				stroke(colors['d']);
				strokeWeight(1);
				line(175, 190, 218, 474);
				noStroke();

				// labels the quest log
				text('click to view and keep track of accepted quests', 365, 200, 125, 100);
				stroke(colors['d']);
				strokeWeight(1);
				line(400, 240, 250, 474);
				noStroke();

				// labels the enemies health bar
				text('Enemies\' health and energy will appear here.', 375, 10, 125, 100);

				// labels the experience bar
				text('experience bar', 260, 438);

				// controls
				textAlign(CENTER, CENTER);
				text('WASD or Arrows to move\nPress enter to Play the game', 250, 100);
				
				if(keys[10]) {
					instructions = false;
				}
				textAlign(LEFT, BASELINE);
			} else if (player.stats.health > 0 && load && !creator && !instructions) {
				DrawWorld();
				if (!player.actions.fighting && !player.actions.trading && !player.actions.questing) {
					Movement();
				}
				Player();
				XpBar();
				HealthBar(player.stats.maxHealth, player.stats.health, player.stats.maxEnergy, player.stats.energy, 10, 10);
				Bar();
				OpenBags();
				Combat();
				Loot();
				SpellBook();
				Cooldowns();
				Buff();
				Regeneration();
				VendorGui();
				QuestGui();
				DisplayActionText();
				DisplayAbilityAnimations();
				if (!openCharacterGui) {
					BuffBar();
				}
			} else {
				timer.value += timer.change;
				if (timer.value < 50 && timer.value > -1) {
					Player();
				} else if (timer.value >= 50) {
					DeathAnimation(player.loc.x, player.loc.y);
					timer.value = -1;
					timer.change = 0;
				}
				if (timer.value === -1) {

					gameOver.red += gameOver.change;
					if (gameOver.red >= 255) {
						gameOver.change = 0;
					}
					image(guiTopLeft, 186, 300);
					image(guiTop, 218, 300);
					image(guiTop, 250, 300);
					image(guiTopRight, 282, 300);
					image(guiBottomLeft, 186, 332);
					image(guiBottom, 218, 332);
					image(guiBottom, 250, 332);
					image(guiBottomRight, 282, 332);
					textAlign(CENTER, CENTER);

					textSize(50);
					fill(gameOver.red, 0, 0);
					text('GAME OVER', 250, 250);
					fill(255, 255, 255);
					textSize(26);
					text('RESPAWN', 250, 332);
					textAlign(LEFT, BASELINE);
					textSize(12);

					if (Hover(186, 300, 128, 64) && mouseIsPressed) {
						gameOver.change = 0.5;
						timer.value = 0;
						timer.change = 1;
						Cooldowns();
						player.stats.health = player.stats.maxHealth / 2;
						player.stats.energy = player.stats.maxEnergy;
						ResetMap(coords.z, coords.y, coords.x);
						ResetMap(player.loc.spawnpoint[2], player.loc.spawnpoint[1], player.loc.spawnpoint[0]);
						actionText = [];
						coords.x = player.loc.spawnpoint[0];
						coords.y = player.loc.spawnpoint[1];
						coords.z = player.loc.spawnpoint[2];
						player.loc.x = player.loc.spawnpoint[3];
						player.loc.y = player.loc.spawnpoint[4];
						combat = 'nothing';
						player.actions.looting = false;
						player.actions.trading = false;
						player.actions.questing = false;
						player.actions.fighting = false;
					}

				}
			}
			DisplayDeathAnimation();
			cursor('none');
			image(Cursor, round(mouseX / 2) * 2, round(mouseY / 2) * 2);
			if (hover.enemy) {
				if (mouseIsPressed) {
					Cursor = guiSword2;
				} else {
					Cursor = guiSword;
				}
			} else if (hover.vendor) {
				Cursor = guiVendor;
			} else if (hover.quest) {
				Cursor = guiQuest;
			} else if (hover.interacting) {
				if (mouseIsPressed) {
					Cursor = hand2;
				} else {
					Cursor = hand1;
				}
			} else {
				if (mouseIsPressed) {
					Cursor = mouseClick;
				} else {
					Cursor = mouse;
				}
			}
		};

		keyPressed = function() {
			keys[keyCode] = true;
			if (typingName === true) {
				if (keyCode !== 16 && keyCode !== 8 && player.name.length < 18) {
					player.name += String(key);
				} else if (keyCode === 8) {
					player.name = player.name.slice(0, player.name.length - 1);
				}
			}
			keyIsPressed = true;
			if (keys[81] && keys[69]) {
				godMode = true;
			}
			if (keys[90] && keys[67]) {
				godMode = false;
				player.stats.maxHealth = 100;
				player.stats.maxEnergy = 100;
			}
		};
		keyReleased = function() {
			keys[keyCode] = false;
			keyIsPressed = false;
		};
		mousePressed = function() {
			mouseIsPressed = true;
		};
		mouseReleased = function() {
			mouseIsPressed = false;
		};
		// code ends
	}
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("mycanvas");

// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);
