var programCode = function(processingInstance) {
with (processingInstance) {
size(768, 544);



/*jshint sub:true*/
var FRAME_RATE = 60;
var PIXEL_SIZE = 2;
var TILE_SIZE = 16;
var CONTROLS = {
	up: 87,
	down: 83,
	left: 65,
	right: 68
}; // stores the key controls 

var keys = [];
var mouseIsPressed = false;
var Hover = function (x, y, sizeX, sizeY) {
	if(mouseX > x && mouseX < sizeX + x && mouseY > y && mouseY < sizeY + y) {
		return true;
	} else {
		return false;
	}
};

frameRate(FRAME_RATE);
colorMode(RGB, 255, 255, 255);

var pal = {
	"a": color(16, 16, 16),
	"b": color(64, 64, 64),
	"c": color(112, 112, 112),
	"d": color(160, 160, 160),
	" ": color(255, 255, 255, 0)
}; // the current pallette

var Player = {
	loc: {
		scene: {
			x: 0,
			y: 0,
			z: 0
		},
		facing: 'down',
		x: 0,
		y: 0,
	},
	moveable: true,
	inventory: {
		bagSlots: [],
		bags: {
			bag1: [],
			bag2: [],
			bag3: [],
			bag4: [],
			bag5: []
		},
		equipment: {},
		abilities: [],
		abilityBar: [],
		buffs: [],
		quests: []
	},
	stats: {
		speed: 2, // movement speed
		endurance: 0, // energy
		fortitude: 0, // health
		vitality: 0, // health regeneration
		vigor: 0, // energy regeneration
		luck: 0, // critical hit chance
		strength: 0, // attack power
		armor: 0, // armor points
	},
	actions: {
		moving: {
			up: false,
			down: false,
			left: false,
			right: false
		}
	},
	size: {
		x: 16,
		y: 24,
		colX: 0,
		colY: 8,
		colXSize: 16,
		colYSize: 16
	},
	animation: {}
}; // stores information about the player
Player.load = function () {
	Player.colBox = {
		x: (Player.loc.x + Player.size.colX * PIXEL_SIZE),
		y: (Player.loc.y + Player.size.colY * PIXEL_SIZE),
		xSize: Player.size.colXSize * PIXEL_SIZE,
		ySize: Player.size.colYSize * PIXEL_SIZE,
	}; // calculates the players collision box
};
Player.movement = function () {
	if(Player.moveable) {
		if(keys[CONTROLS.left]) {
			Player.loc.facing = 'left';
			Player.actions.moving.left = true;
			Player.loc.x -= Player.stats.speed;
		} else {
			Player.actions.moving.left = false;
		}
		if(keys[CONTROLS.right]) {
			Player.loc.facing = 'right';
			Player.actions.moving.right = true;
			Player.loc.x += Player.stats.speed;
		} else {
			Player.actions.moving.right = false;
		}
		if(keys[CONTROLS.up]) {
			Player.loc.facing = 'up';
			Player.actions.moving.up = true;
			Player.loc.y -= Player.stats.speed;
		} else {
			Player.actions.moving.up = false
		}
		if(keys[CONTROLS.down]) {
			Player.loc.facing = 'down';
			Player.actions.moving.down = true;
			Player.loc.y += Player.stats.speed;
		} else {
			Player.actions.moving.down = false;
		}
	}
	if(Player.loc.facing === 'left') {
		if(Player.actions.moving.left) {
			Player.animation.left.draw();
		} else if(!Player.actions.moving.left) {
			Player.animation.left.reset();
			Player.animation.left.static(0);
		}
	}
	if(Player.loc.facing === 'right') {
		if(Player.actions.moving.right) {
			Player.animation.right.draw();
		} else if(!Player.actions.moving.right) {
			Player.animation.right.reset();
			Player.animation.right.static(0);
		}
	}
	if(Player.loc.facing === 'up') {
		if(Player.actions.moving.up) {
			Player.animation.up.draw();
		} else if(!Player.actions.moving.up) {
			Player.animation.up.reset();
			Player.animation.up.static(0);
		}
	}
	if(Player.loc.facing === 'down') {
		if(Player.actions.moving.down) {
			Player.animation.down.draw();
		} else if(!Player.actions.moving.down) {
			Player.animation.down.reset();
			Player.animation.down.static(0);
		}
	}

	if(Player.loc.y + (Player.size.y * PIXEL_SIZE / 2) < 0) {
		Player.loc.scene.y--;
		Player.loc.y = height - (Player.size.y * PIXEL_SIZE / 2);
	}
	if(Player.loc.x + (Player.size.x * PIXEL_SIZE / 2) < 0) {
		Player.loc.scene.x--;
		Player.loc.x = width - (Player.size.x * PIXEL_SIZE / 2);
	}
	if(Player.loc.x + (Player.size.x * PIXEL_SIZE / 2) > width) {
		Player.loc.scene.x++;
		Player.loc.x = 0 - (Player.size.x * PIXEL_SIZE / 2);
	}
};
Player.load();
var images = []; // the array that stores all of the images before they are loaded
var Image = function (pixmap, colors, size) {
	this.pixmap = pixmap;
	this.colors = colors;
	this.size = size;
	this.combined = false;
	images.push(this);
}; // the image constructor function
Image.prototype.load = function () {
	// checks to make sure the image is not a combination of two already loaded images
	if(!this.combined) {
		this.width = this.pixmap[0].length * this.size; // sets the width of the image
		this.height = this.pixmap.length * this.size; // sets the height of the image
		this.p = createGraphics(this.width, this.height, JAVA2D); // creates the graphics
		this.p.background(0, 0, 0, 0);
		this.p.noStroke();
		// loops through the tilemap
		for(var y = 0; y < this.pixmap.length; y++) {
			for(var x = 0; x < this.pixmap[y].length; x++) {
				this.p.fill(pal[this.pixmap[y][x]]); // sets the color
				this.p.rect(x * this.size, y * this.size, this.size, this.size); // draws the pixels
			}
		}
		this.p = this.p.get(); // gets the canvas and exports it as an image
	}
};
Image.prototype.draw = function (x, y) {
	if(this.p) {
		this.offset = {
			x: (this.width - (TILE_SIZE * PIXEL_SIZE))/2, // sets the x-offset to align images
			y: this.height - (TILE_SIZE * PIXEL_SIZE) // sets the y-offset to align images
		};
		image(this.p, x - this.offset.x, y - this.offset.y); // draws the image
	} else {
		this.load();
	}
};
// block images
{
	var grass = new Image([
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbdbbbbbbbb',
        'dbbbbbbcdbbbbbbb',
        'cdbbbbbbcbbbbbbb',
        'bcbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbdbbbb',
        'bbbbbbbbbbdcbbbb',
        'bbbdbbbbbbcbbbbb',
        'bbbcdbbbbbbbbbbb',
        'bbbbcbbbbbbbbbbb',
        'bbbbbbbbbdbbbbbb',
        'bbbbbbbbdcbbbbbb',
        'bbbdbbbbcbbbdbbb',
        'bbdcbbbbbbbbcdbb',
        'bbcbbbbbbbbbbcbb'], pal, PIXEL_SIZE);
	var rock = new Image([
        '                ',
        '                ',
        '                ',
        '      aaa       ',
        '     adddaa     ',
        '    abcdddda    ',
        '    acccdddda   ',
        '   abbcbcddda   ',
        '   abbbcbcddda  ',
        '   ababccbcdda  ',
        '   aababcbcdda  ',
        '   aaaaabcbcda  ',
        '    aaaaabcaa   ',
        '      aaaaa     ',
        '                ',
        '                '], pal, PIXEL_SIZE);

    // loops through the images array and loads them
    for(var i = 0; i < images.length; i++) {
		images[i].load();
		images.splice(1, i); // removes the loaded image data from the array
	}
}
// gui images
{
	var topLeft = new Image([
        ' aaaaaaaaaaaaaaa',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var topRight = new Image([
        'aaaaaaaaaaaaaaa ',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba'], pal, PIXEL_SIZE);
	var bottomLeft = new Image([
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        ' aaaaaaaaaaaaaaa'], pal, PIXEL_SIZE);
	var bottomRight = new Image([
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'aaaaaaaaaaaaaaa '], pal, PIXEL_SIZE);
	var top = new Image([
        'aaaaaaaaaaaaaaaa',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var bottom = new Image([
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'aaaaaaaaaaaaaaaa'], pal, PIXEL_SIZE);
	var left = new Image([
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb',
        'abbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var right = new Image([
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba'], pal, PIXEL_SIZE);
	var middle = new Image([
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var closeButton = new Image([
        'aaaaaaaaaaaaaaa ',
        'bbacccccccccccca',
        'bbacbbbccccbbbca',
        'bbacbddbccbddbca',
        'bbacbcddbbddcbca',
        'bbaccbcddddcbcca',
        'bbacccbcddcbccca',
        'bbacccbcddcbccca',
        'bbaccbddccddbcca',
        'bbacbddcbbcddbca',
        'bbacbdcbccbcdbca',
        'bbacbbbccccbbcca',
        'bbacccccccccccca',
        'bbbaaaaaaaaaaaaa',
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba'], pal, PIXEL_SIZE);
	var acceptButton = new Image([
        'bbbbbbbbbbbbbbba',
        'bbbbbbbbbbbbbbba',
        'bbbaaaaaaaaaaaaa',
        'bbabbbbbbbbbbbba',
        'bbabbbbbbbbbddba',
        'bbabbbbbbbbdddba',
        'bbabbbbbbbbddcba',
        'bbabbbbbbbddcbba',
        'bbabddbbbbddbbba',
        'bbabcddbbddcbbba',
        'bbabbcddbddbbbba',
        'bbabbbcdddcbbbba',
        'bbabbbbcdcbbbbba',
        'bbabbbbbcbbbbbba',
        'bbabbbbbbbbbbbba',
        'aaaaaaaaaaaaaaa '], pal, PIXEL_SIZE);
	var slot = new Image([
        'bbbbbbbbbbbbbbbb',
        'bbaaaaaaaaaaaabb',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'bbaaaaaaaaaaaabb',
        'bbbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var slotTop = new Image([
        'aaaaaaaaaaaaaaaa',
        'bbaaaaaaaaaaaabb',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'bbaaaaaaaaaaaabb',
        'bbbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var slotBottom = new Image([
        'bbbbbbbbbbbbbbbb',
        'bbaaaaaaaaaaaabb',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'baccccccccccccab',
        'bbaaaaaaaaaaaabb',
        'aaaaaaaaaaaaaaaa'], pal, PIXEL_SIZE);
	var slotLeft = new Image([
        'abbbbbbbbbbbbbbb',
        'abaaaaaaaaaaaabb',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'abaaaaaaaaaaaabb',
        'abbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var slotRight = new Image([
        'bbbbbbbbbbbbbbba',
        'bbaaaaaaaaaaaaba',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'bbaaaaaaaaaaaaba',
        'bbbbbbbbbbbbbbba'], pal, PIXEL_SIZE);
	var slotTopLeft = new Image([
        ' aaaaaaaaaaaaaaa',
        'abaaaaaaaaaaaabb',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'abaaaaaaaaaaaabb',
        'abbbbbbbbbbbbbbb'], pal, PIXEL_SIZE);
	var slotTopRight = new Image([
        'aaaaaaaaaaaaaaa ',
        'bbaaaaaaaaaaaaba',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'bbaaaaaaaaaaaaba',
        'bbbbbbbbbbbbbbba'], pal, PIXEL_SIZE);
	var slotBottomLeft = new Image([
        'abbbbbbbbbbbbbbb',
        'abaaaaaaaaaaaabb',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'aaccccccccccccab',
        'abaaaaaaaaaaaabb',
        ' aaaaaaaaaaaaaaa'], pal, PIXEL_SIZE);
	var slotBottomRight = new Image([
        'bbbbbbbbbbbbbbba',
        'bbaaaaaaaaaaaaba',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'baccccccccccccaa',
        'bbaaaaaaaaaaaaba',
        'aaaaaaaaaaaaaaa '], pal, PIXEL_SIZE);
}
var animations = [];
var Animation = function (frames, colors, size, speed) {
	this.frames = frames;
	this.colors = colors;
	this.size = size;
	this.speed = speed;
	animations.push(this);
}; // the animation constructor function
Animation.prototype.load = function () {
	this.a = []; // stores all the final image frames
	this.frame = 0; // the current frame
	this.width = this.frames[0][0].length * this.size; // sets the image width
	this.height = this.frames[0].length * this.size; // sets the image height
	this.offset = {
		x: (this.width - (TILE_SIZE * PIXEL_SIZE))/2, // sets the tile x-offset
		y: this.height - (TILE_SIZE * PIXEL_SIZE) // sets the tile y-offset
	};
	// loops through the frames
	for(var i = 0; i < this.frames.length; i++) {
		this.p = createGraphics(this.width, this.height, JAVA2D); // creates the graphics
		this.p.background(0, 0, 0, 0); // sets the background to transparent
		this.p.noStroke();
		// loops through the pixmaps
		for(var y = 0; y < this.frames[i].length; y++) {
			for(var x = 0; x < this.frames[i][y].length; x++) {
				this.p.fill(pal[this.frames[i][y][x]]); // sets the pixel color
				this.p.rect(x * this.size, y * this.size, this.size, this.size); // draws the pixels
			}
		}
		this.p = this.p.get(); // return the image
		this.a.push(this.p); // pushes the image to the array
	}
}; // loads the animation
Animation.prototype.draw = function (x, y) {
	if(x === undefined) {
		x = Player.loc.x;
	}
	if(y === undefined) {
		y = Player.loc.y;
	}
	if(this.a === undefined) {
		this.load();
	}
	this.frame += 1/ (this.speed * FRAME_RATE / this.a.length); // sets the animation speed
	// resets the animation once the program has looped through the frames
	if(this.frame > this.a.length - 1) {
		this.frame = 0;
	}
	image(this.a[round(this.frame)], x - this.offset.x, y - this.offset.y); // draws the image of the current frame
}; // draws an animation
Animation.prototype.reset = function () {
	this.frame = 0;
}; // resets the animation
Animation.prototype.static = function (frame, x, y) {
	if(x === undefined) {
		x = Player.loc.x;
	}
	if(y === undefined) {
		y = Player.loc.y;
	}
	if(this.a === undefined) {
		this.load();
	}
	image(this.a[frame], x - this.offset.x, y - this.offset.y);
};
{
	Player.animation.up = new Animation([
		[
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbbbbbbbba ',
        'abbbbbbbbbbbbbba',
        'aaaaabbbbbbaaaaa',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbbbbbbbba ',
        'abbbbbbbbbbbbbba',
        'aaaaabbbbbbaaaaa',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbbbbbbbba ',
        'abbbbbbbbbbbbbba',
        'aaaaabbbbbbaaaaa',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbbbbbbbba ',
        'abbbbbbbbbbbbbba',
        'aaaaabbbbbbaaaaa',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbbbbbbbba ',
        'abbbbbbbbbbbbbba',
        'aaaaabbbbbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbbbbbbbba ',
        'abbbbbbbbbbbbbba',
        'aaaaabbccbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbbbbbbbba ',
        'abbbbbbccbbbbbba',
        'aaaaabbccbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbbbbbbba  ',
        ' abbbbbccbbbbba ',
        'abbbbbbccbbbbbba',
        'aaaaabbccbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbbbbbba   ',
        '  abbbbccbbbba  ',
        ' abbbbbccbbbbba ',
        'abbbbbbccbbbbbba',
        'aaaaabbccbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbbbbba    ',
        '   abbbccbbba   ',
        '  abbbbccbbbba  ',
        ' abbbbbccbbbbba ',
        'abbbbbbccbbbbbba',
        'aaaaabbccbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abbbba     ',
        '    abbccbba    ',
        '   abbbccbbba   ',
        '  abbbbccbbbba  ',
        ' abbbbbccbbbbba ',
        'abbbbbbccbbbbbba',
        'aaaaabbccbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      abba      ',
        '     abccba     ',
        '    abbccbba    ',
        '   abbbccbbba   ',
        '  abbbbccbbbba  ',
        ' abbbbbccbbbbba ',
        'abbbbbbccbbbbbba',
        'aaaaabbccbbaaaaa',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    aaaaaaaa    '],
    ], pal, PIXEL_SIZE, 0.60);
	Player.animation.down = new Animation([
	[
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        'aaaaabbbbbbaaaaa',
        'abbbbbbbbbbbbbba',
        ' abbbbbbbbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        'aaaaabbbbbbaaaaa',
        'abbbbbbbbbbbbbba',
        ' abbbbbbbbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        '    abbbbbba    ',
        'aaaaabbbbbbaaaaa',
        'abbbbbbbbbbbbbba',
        ' abbbbbbbbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbbbbba    ',
        'aaaaabbbbbbaaaaa',
        'abbbbbbbbbbbbbba',
        ' abbbbbbbbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbbbbbaaaaa',
        'abbbbbbbbbbbbbba',
        ' abbbbbbbbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbccbbaaaaa',
        'abbbbbbbbbbbbbba',
        ' abbbbbbbbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbccbbaaaaa',
        'abbbbbbccbbbbbba',
        ' abbbbbbbbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbccbbaaaaa',
        'abbbbbbccbbbbbba',
        ' abbbbbccbbbbba ',
        '  abbbbbbbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbccbbaaaaa',
        'abbbbbbccbbbbbba',
        ' abbbbbccbbbbba ',
        '  abbbbccbbbba  ',
        '   abbbbbbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbccbbaaaaa',
        'abbbbbbccbbbbbba',
        ' abbbbbccbbbbba ',
        '  abbbbccbbbba  ',
        '   abbbccbbba   ',
        '    abbbbbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbccbbaaaaa',
        'abbbbbbccbbbbbba',
        ' abbbbbccbbbbba ',
        '  abbbbccbbbba  ',
        '   abbbccbbba   ',
        '    abbccbba    ',
        '     abbbba     ',
        '      abba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '    aaaaaaaa    ',
        '    abbbbbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        '    abbccbba    ',
        'aaaaabbccbbaaaaa',
        'abbbbbbccbbbbbba',
        ' abbbbbccbbbbba ',
        '  abbbbccbbbba  ',
        '   abbbccbbba   ',
        '    abbccbba    ',
        '     abccba     ',
        '      abba      ',
        '       aa       '],
    ], pal, PIXEL_SIZE, 0.60);
	Player.animation.left = new Animation([
		[
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbbbbbbbbcba',
        'abbbbbbbbbbbbcba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbbbbbbbccba',
        'abbbbbbbbbbbccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbbbbbbcccba',
        'abbbbbbbbbbcccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbbbbbccccba',
        'abbbbbbbbbccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbbbbcccccba',
        'abbbbbbbbcccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbbbccccccba',
        'abbbbbbbccccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbbcccccccba',
        'abbbbbbcccccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbbccccccccba',
        'abbbbbccccccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbbcccccccccba',
        'abbbbcccccccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbbccccccccccba',
        'abbbccccccccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abbcccccccccccba',
        'abbcccccccccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '      aba       ',
        '     abba       ',
        '    abbba       ',
        '   abbbbaaaaaaaa',
        '  abbbbbbbbbbbba',
        ' abbbbbbbbbbbbba',
        'abccccccccccccba',
        'abccccccccccccba',
        ' abbbbbbbbbbbbba',
        '  abbbbbbbbbbbba',
        '   abbbbaaaaaaaa',
        '    abbba       ',
        '     abba       ',
        '      aba       ',
        '       aa       '],
    ], pal, PIXEL_SIZE, 0.60);
	Player.animation.right = new Animation([
		[
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abcbbbbbbbbbbbba',
        'abcbbbbbbbbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abccbbbbbbbbbbba',
        'abccbbbbbbbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abcccbbbbbbbbbba',
        'abcccbbbbbbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abccccbbbbbbbbba',
        'abccccbbbbbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abcccccbbbbbbbba',
        'abcccccbbbbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abccccccbbbbbbba',
        'abccccccbbbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abcccccccbbbbbba',
        'abcccccccbbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abccccccccbbbbba',
        'abccccccccbbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abcccccccccbbbba',
        'abcccccccccbbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abccccccccccbbba',
        'abccccccccccbbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
        [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abcccccccccccbba',
        'abcccccccccccbba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
       [
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '                ',
        '       aa       ',
        '       aba      ',
        '       abba     ',
        '       abbba    ',
        'aaaaaaaabbbba   ',
        'abbbbbbbbbbbba  ',
        'abbbbbbbbbbbbba ',
        'abccccccccccccba',
        'abccccccccccccba',
        'abbbbbbbbbbbbba ',
        'abbbbbbbbbbbba  ',
        'aaaaaaaabbbba   ',
        '       abbba    ',
        '       abba     ',
        '       aba      ',
        '       aa       '],
    ], pal, PIXEL_SIZE, 0.60);
	for(var i = 0; i < animations.length; i++) {
		animations[i].load();
		animations.splice(1, i);
	}
} // stores all of the animation

var Tile = function (image, type) {
	this.image = image;
	this.size = size;
	this.type = type;
	// detects if the tile is a composition of different images
	if(this.image.constructor === Array) {
		this.width = image[0].width; // sets the width to that of the first image
		this.height = image[0].height; // sets the height to that of the first image
	} else {
		this.width = image.width; // sets the width
		this.height = image.height; // sets the height
	}
}; // the tile constructor function
Tile.prototype.draw = function (x, y) {
	// detects if the tile is a composition of different images
	if(this.image.constructor === Array) {
		// draws all the images if it is a composite
		for(var i = 0; i < this.image.length; i++) {
			this.image[i].draw(x, y);
		}
	} else {
		// draws the image
		this.image.draw(x, y);
	}
}; // draws the tile
Tile.prototype.collide = function (x1, y1, x2, y2, w, h) {
	if(x2 + w > x1 && x2 + w < x1 + this.width / 8 && y2 + h > y1 && y2 < y1 + this.height) {
		// detects if something overlaps with the tile to the left
		return 'left';
	} else if(x2 < x1 + this.width && x2 > x1 + this.width - this.width / 8 && y2 + h > y1 && y2 < y1 + this.height) {
		// detects if something overlaps with the tile to the right
		return 'right';
	} else if(x2 + w > x1 && x2 < x1 + this.width && y2 + h > y1 && y2 + h < y1 + this.height / 8) {
		// detects if something overlaps with the top of the tile
		return 'up';
	} else if(x2 + w > x1 && x2 < x1 + this.width && y2 < y1 + this.height && y2 > y1 + this.height - this.height / 8) {
		// detects if something overlaps with the bottom of the tile
		return 'down';
	} else {
		// if there are no collisions
		return 'none';
	}
}; // detects if the tile is colliding
var tiles = {
	"a": new Tile(grass, 'walkable'),
	"b": new Tile([grass, rock], 'solid')
}; // stores all of the tiles and their keys
var gui = {
	"a": top,
	"b": bottom,
	"c": left,
	"d": right,
	"e": topLeft,
	"f": topRight,
	"g": bottomLeft,
	"h": bottomRight,
	"j": middle,
	"k": slot,
	"l": slotTop,
	"m": slotBottom,
	"n": slotLeft,
	"o": slotRight,
	"p": slotTopLeft,
	"q": slotTopRight,
	"r": slotBottomLeft,
	"s": slotBottomRight,
	"*": acceptButton,
	"x": closeButton 
}; // stores all of the gui tiles
var slots = {
	"k": true, 
	"l": true,
	"m": true,
	"n": true,
	"o": true,
	"p": true,
	"q": true,
	"r": true,
	"s": true
};
var Gui = function (tilemap) {
	this.tilemap = tilemap;
	this.open = true;
};
Gui.prototype.draw = function (x, y) {
	if(this.open) {
		for(var i = 0; i < this.tilemap.length; i++) {
			for(var j = 0; j < this.tilemap[i].length; j++) {
				var p = this.tilemap[i][j];
				var tempX = x + gui[p].width * j;
				var tempY = y + gui[p].height * i;
				gui[p].draw(x + gui[p].width * j, y + gui[p].height * i);
				if(p === 'x' && Hover(tempX, tempY, gui[p].width, gui[p].height) && mouseIsPressed) {
					this.open = false;
				}
			}
		}
	}
};
var Bag = function (tilemap) {
	Gui.call(this, tilemap, open);
	this.slots = [];
};
Bag.prototype.load = function () {
	for(var i = 0; i < this.tilemap.length; i++) {
		for(var j = 0; j < this.tilemap[i].length; j++) {
			var p = this.tilemap[i][j];
			if(slots[p]) {
				console.log('slot found');
				this.slots.push({x: j, y: i});
			}
		}
	}
};
{
	var questAccept = new Gui([
		'eaaax',
		'cjjjd',
		'cjjjd',
		'cjjjd',
		'cjjjd',
		'cjjjd',
		'gbbb*']);
	var bag12 = new Bag([
		'eallx',
		'nkkko',
		'rmmms'
		]);
	bag12.load();
	for(var i = 0; i < bag12.slots.length; i++) {
		console.log(bag12.slots[i].x + ', ' + bag12.slots[i].y);
	}
} // stores the guis

var Enemy = function (image, name, maxLevel, minLevel, maxHit, minHit, loot) {
	
};

var World = {};
var Screen = function (x, y, z, map, entities) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.map = map;
	if(entities === undefined) {
		entities = [];
	}
	this.entities = entities;
}; // the map constructor function
Screen.prototype.load = function () {
	World.maps = [];
	// creates a new x array if it is not defined
	if(World.maps[this.x] === undefined) {
		World.maps[this.x] = [];
	}
	// creates a new y array if it is not defined
	if(World.maps[this.x][this.y] === undefined) {
		World.maps[this.x][this.y] = [];
	}
	// creates a new z array if it is not defined
	if(World.maps[this.x][this.y][this.z] === undefined) {
		World.maps[this.x][this.y][this.z] = [];
	}
	// loops through the map array
	for(var y = 0; y < this.map.length; y++) {
		for(var x = 0; x < this.map[y].length; x++) {
			// pushes tiles to the World array
			World.maps[this.x][this.y][this.z].push({
				key: this.map[y][x],
				x: PIXEL_SIZE * TILE_SIZE * x,
				y: PIXEL_SIZE * TILE_SIZE * y,
			});
		}
	}
};
var screens = [
	new Screen(0, 0, 0, [
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',
	'aaaaaaaaaaaaaaaaaaaaaaaa',]),
];
World.draw = function (x, y, z) {
	for(var i = 0; i < World.maps[x][y][z].length; i++) {
		var w = World.maps[x][y][z][i];
		var tile = tiles[w.key];
		var calc = tile.collide(w.x, w.y, Player.colBox.x, Player.colBox.y, Player.colBox.xSize, Player.colBox.ySize);
		tile.draw(w.x, w.y);
		if(calc === 'up') {
			if(tile.type === 'solid') {
				Player.loc.y += -Player.stats.speed;
			}
		} // collision up
		if(calc === 'down') {
			if(tile.type === 'solid') {
				Player.loc.y += Player.stats.speed;
			}
		} // collision down
		if(calc === 'left') {
			if(tile.type === 'solid') {
				Player.loc.x += -Player.stats.speed;
			}
		} // collision left
		if(calc === 'right') {
			if(tile.type === 'solid') {
				Player.loc.x += Player.stats.speed;
			}
		} // collision right
	}
};
screens[0].load();

var Item = function (name, image, buy, sell) {
	this.name = name;
	this.image = image;
	this.buy = buy;
	this.sell = sell;
};
Item.prototype.draw = function (x, y) {
	this.image.draw(x, y);
};
var Food = function (name, image, buy, sell, health) {
	Item.call(this, name, image, buy, sell);
	this.health = health;
};
Food.prototype = Object.create(Item.prototype);

draw = function () {
	background(120, 120, 120);
	World.draw(0, 0, 0);
	Player.movement();
	noStroke();
};
keyPressed = function () {
	keys[keyCode] = true;
};
keyReleased = function () {
	keys[keyCode] = false;
};
mousePressed = function () {
	mouseIsPressed = true;
};
mouseReleased = function () {
	mouseIsPressed = false;
};

}
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("canvas");

// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);
