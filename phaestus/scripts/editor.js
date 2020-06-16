var p = document.getElementById('p');
var l = document.getElementById('load');
var loadButton = document.getElementById('loadButton');
var canvas = document.getElementById("mycanvas");
var programCode = function (processingInstance) {
	with (processingInstance) {
		size(900, 700);
		frameRate(30);
		var mouseIsPressed = false;
		// GUI tilemaps
		colorMode(HSB);
		var pal = {
			'!': color(0xFF0F000E), // 360 8 8
			'#': color(0xFF25031E),
			'$': color(0xFF380728),
			'%': color(0xFF4B0A2D),
			'&': color(0xFF611232),
			'(': color(0xFF751D34),
			')': color(0xFF882835),
			'*': color(0xFF9E3737),
			'+': color(0xFFB15547),
			',': color(0xFFBF7357),
			'-': color(0xFFCA926C),
			'.': color(0xFFD6B186),
			'/': color(0xFFDEC99F),
			'0': color(0xFFEADFB7),
			'1': color(0xFFF7F5D7),
			'2': color(0xFFFDFDF2),
			'3': color(0xFF0F0700), // 25 8 20
			'4': color(0xFF2B1203),
			'5': color(0xFF441506),
			'6': color(0xFF5E1005),
			'7': color(0xFF7A0C0B),
			'8': color(0xFF932613),
			'9': color(0xFFAD431A),
			':': color(0xFFC96924),
			';': color(0xFFE2922F), // 25 8 20
			'<': color(0xFFEAB544),
			'=': color(0xFFEFD45D),
			'>': color(0xFFF4EE7C),
			'?': color(0xFFEFF799),
			'@': color(0xFFECFCB3),
			'A': color(0xFFEEFFD1),
			'B': color(0xFFF6FFED),
			'C': color(0xFF182603), // 127 7 11
			'D': color(0xFF1F3B07),
			'E': color(0xFF225009),
			'F': color(0xFF256810),
			'G': color(0xFF267C1B),
			'H': color(0xFF259125),
			'I': color(0xFF33A941),
			'J': color(0xFF43BE60),
			'K': color(0xFF000B0F), // 279 12 4
			'L': color(0xFF031523),
			'M': color(0xFF081734),
			'N': color(0xFF0A1345),
			'O': color(0xFF171359),
			'P': color(0xFF321F6B),
			'Q': color(0xFF4F2A7C),
			'R': color(0xFF723A90),
			'S': color(0xFF944BA1),
			'T': color(0xFFB15BAD),
			'U': color(0xFFBE6FAA),
			'V': color(0xFFCC88AD),
			'W': color(0xFFD6A0B3),
			'X': color(0xFFE3B7BE),
			'Y': color(0xFFF3D8D7),
			'Z': color(0xFFFBF4F2),
			'[': color(0xFF0E0817), // 266 0 -26
			']': color(0xFF130D1C),
			'^': color(0xFF17121E),
			'_': color(0xFF1B1620),
			'`': color(0xFF211E25),
			'a': color(0xFF262527),
			'b': color(0xFF434146),
			'c': color(0xFF5F5D62),
			'd': color(0xFF7D7B7F),
			'e': color(0xFF989799),
			'f': color(0xFFB4B3B6),
			'g': color(0xFFD5D5D5),
			'h': color(0xFFECECEC),
			'i': color(),
			'j': color(0xFF000000),
			'k': color(),
			'l': color(0xFF000B0F), // 224 4 16
			'm': color(0xFF031C29),
			'n': color(0xFF062940),
			'o': color(0xFF073258),
			'p': color(0xFF0D3C72),
			'q': color(0xFF174589),
			'r': color(0xFF1F4AA1),
			's': color(0xFF2C52BB),
			't': color(0xFF3958D2),
			'u': color(0xFF4C5FDC),
			'v': color(0xFF636CE3),
			'w': color(0xFF8181EA),
			'x': color(0xFFA19BEF),
			'y': color(0xFFBDB4F6),
			'z': color(0xFFDDD5FF),
			'{': color(0xFFF3EFFF),
			'|': color(0xFF1D2603), // 99 4 10
			'}': color(0xFF344F09),
			'~': color(0xFF497A1C),
			'': color(0xFF5CA535),
			'€': color(0xFF6EC655),
			'': color(0xFF8CDB85),
			'‚': color(0xFFB6EDB9),
			'ƒ': color(0xFFF2FFF4),
			'„': color(0xFF0F0200), // 39 7 -6
			'…': color(0xFF1E0503),
			'†': color(0xFF2A0A08),
			'‡': color(0xFF36130B),
			'ˆ': color(0xFF452314),
			'‰': color(0xFF51341F),
			'Š': color(0xFF5D462B),
			'‹': color(0xFF6C5B3B),
			'Œ': color(0xFF786E4B),
			'Ž': color(0xFF8D885C),
			'': color(0xFFA0A070),
			'‘': color(0xFFADB289),
			'’': color(0xFFBAC2A0),
			'“': color(0xFFCAD4B8),
			'”': color(0xFFE1E9D7),
			'•': color(0xFFF4F6F2),
			'–': color(), // 280
			'—': color(),
			'˜': color(),
			'™': color(),
			'š': color(),
			'›': color(),
			'œ': color(),
			'ž': color(),
			'Ÿ': color(), // 300
			'¡': color(),
			'¢': color(),
			'£': color(),
			'¤': color(),
			'¥': color(),
			'¦': color(),
			'§': color(),
			'¨': color(), // 320
			'©': color(),
			'ª': color(),
			'«': color(),
			'¬': color(),
			'®': color(),
			'¯': color(),
			'°': color(),
			'±': color(), // 340
			'²': color(),
			'³': color(),
			'´': color(),
			'µ': color(),
			'¶': color(),
			'·': color(),
			'¸': color(),
			'¹': color(), // 360
			'º': color(),
			'»': color(),
			'¼': color(),
			'½': color(),
			'¾': color(),
			'¿': color(),
			'À': color(),
			' ': color(0x0000ff00),
		};
		var chars = '!#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefgh jklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿À ';
		var editor = {
			selected: ' ',
			load: [],
			loadColor: ' ',
			image: [],
			width: 16,
			height: 16,
			name: '',
			animation: false,
			frames: [],
			pixelSize: 2,
			mouse: {
				x: 0,
				y: 0
			},
			currentFrame: 0,
			displayFrame: 0,
			meta: false,
		};
		loadButton.onclick = function () {
			editor.load = eval(l.value);
			console.log(editor.load);
			console.log(editor.load[0].constructor);
			if (!editor.meta) {
				if (editor.load[0].constructor === String) {
					editor.height = editor.load.length;
					editor.width = editor.load[0].length;
					for (var y = 0; y < editor.load.length; y++) {
						for (var x = 0; x < editor.load[y].length; x++) {
							if (editor.load[y][x] !== undefined) {
								editor.image[y][x] = editor.load[y][x];
							}
						}
					}
				} else {
					editor.animation = true;
					editor.height = editor.load[0].length;
					editor.width = editor.load[0][0].length;
					for (var i = 0; i < editor.load.length; i++) {
						editor.frames[i] = [];
						for (var y = 0; y < editor.load[i].length; y++) {
							editor.frames[i][y] = [];
							for (var x = 0; x < editor.load[i][y].length; x++) {
								editor.frames[i][y][x] = editor.load[i][y][x];
							}
						}
					}
					editor.image = editor.frames[editor.currentFrame];
				}
			} else {
				var layout = [
					[editor.load[0], editor.load[1]],
					[editor.load[2], editor.load[3]]
				];
				for (var i = 0; i < layout.length; i++) {
					for (var j = 0; j < layout[i].length; j++) {
						var tempImage = layout[i][j];
						for (var y = 0; y < tempImage.length; y++) {
							for (var x = 0; x < tempImage[y].length; x++) {
								editor.image[y + i * 8][x + j * 8] = tempImage[y][x];
							}
						}
					}
				}
			}
		};
		var Hover = function (x, y, width, height) {
			if (mouseX > x && mouseY > y && mouseX < x + width && mouseY < y + height) {
				return true;
			}
		};
		var updateArray = function () {
			p.innerHTML = '';
			if (!editor.animation) {
				if (!editor.meta) {
					p.innerHTML += 'new Image([';
					for (var y = 0; y < editor.height; y++) {
						var row = '<br>&nbsp;\'';
						for (var x = 0; x < editor.width; x++) {
							row += String(editor.image[y][x]);
						}
						if (y !== editor.height - 1) {
							row += '\',';
						} else {
							row += '\'], pal, ' + editor.pixelSize + ', ' + '\'' + editor.name + '\');';
						}
						row = row.replace(/ /g, '&nbsp;');
						p.innerHTML += row;
					}
				} else {
					for (var i = 0; i < 2; i++) {
						for (var j = 0; j < 2; j++) {
							p.innerHTML += '['
							for (var y = 0; y < 8; y++) {
								var row = '<br>&nbsp;\''
								for (var x = 0; x < 8; x++) {
									row += String(editor.image[y + 8 * i][x + 8 * j]);
								}
								row += '\'';
								if (y !== 7) {
									row += ',';
								}
								row = row.replace(/ /g, '&nbsp;');
								p.innerHTML += row;
							}
							p.innerHTML += ']<br>'
						}
					}
				}
			} else {
				p.innerHTML += 'new Animation([';
				for (var i = 0; i < editor.frames.length; i++) {
					var frame = '<br>&nbsp;[';
					for (var y = 0; y < editor.height; y++) {
						var row = '<br>&nbsp;&nbsp\'';
						for (var x = 0; x < editor.width; x++) {
							row += String(editor.frames[i][y][x]);
						}
						if (y !== editor.height - 1) {
							row += '\',';
						} else {
							row += '\']'
							if (i !== editor.frames.length - 1) {
								row += ',';
							} else {
								row += '], pal, 2, ' + '\'' + editor.name + '\');';
							}
						}
						row = row.replace(/ /g, '&nbsp;');
						frame += row;
					}
					p.innerHTML += frame;
				}
			}
		};
		var intialLoad = function () {
			for (var y = 0; y < editor.height; y++) {
				editor.image[y] = [];
				for (var x = 0; x < editor.width; x++) {
					editor.image[y].push(editor.loadColor);
				}
			}
		}
		var ShiftRight = function () {
			var temp = [];
			for (var y = 0; y < editor.height; y++) {
				temp[y] = [];
				temp[y].push(editor.image[y][editor.width - 1]);
				for (var x = 0; x < editor.width - 1; x++) {
					temp[y].push(editor.image[y][x]);
				}
			}
			editor.image = temp;
		};
		var ShiftLeft = function () {
			var temp = [];
			for (var y = 0; y < editor.height; y++) {
				temp[y] = [];
				for (var x = 1; x < editor.width; x++) {
					temp[y].push(editor.image[y][x]);
				}
				temp[y].push(editor.image[y][0]);
			}
			editor.image = temp;
		};
		var ShiftUp = function () {
			var temp = [];
			for (var y = 1; y < editor.image.length; y++) {
				temp.push(editor.image[y]);
			}
			temp.push(editor.image[0]);
			editor.image = temp;
		};
		var ShiftDown = function () {
			var temp = [];
			temp.push(editor.image[editor.height - 1]);
			for (var y = 0; y < editor.height - 1; y++) {
				temp.push(editor.image[y]);
			}
			editor.image = temp;
		};
		var FlipHorizontal = function () {
			var temp = [];
			for (var y = 0; y < editor.height; y++) {
				temp[y] = [];
				for (var x = editor.width - 1; x > -1; x--) {
					temp[y].push(editor.image[y][x]);
				}
			}
			editor.image = temp;
		};
		var FlipVertical = function () {
			var temp = [];
			for (var y = editor.height - 1; y > -1; y--) {
				temp.push(editor.image[y]);

			}
			editor.image = temp;
		};
		var Rotate = function () {
			var temp = [];
			for (var y = 0; y < editor.height; y++) {
				temp.push([]);
				for (var x = 0; x < editor.width; x++) {
					temp[y][x] = editor.image[x][y];
				}
			}
			editor.image = temp;
		};
		intialLoad();
		editor.frames.push(editor.image.map(function (arr) { return arr.slice(); }));
		draw = function () {
			editor.frames[editor.currentFrame] = editor.image;
			if (document.activeElement.id === 'mycanvas') {
				updateArray();
			} // updates the text as long as the canvas is focused
			if (editor.frames.length === 1) {
				editor.animation = false;
			} else {
				editor.animation = true;
			}

			editor.mouse.x = floor((mouseX - 200) / 20); // sets the mouse x position of the editor
			editor.mouse.y = floor((mouseY - 20) / 20); // sets the mous ey position of the editor
			background(0xFF000000);

			for (var i = 0; i < chars.length; i += 8) {
				for (var j = 0; j < 8; j++) {
					noStroke();
					if (editor.selected === chars[i + j]) {
						strokeWeight(4);
						stroke(0xFFFFFFFF);
					} // draws a box around the selected color
					fill(pal[chars[i + j]]); // sets the color fill
					rect(j * 20, i / 8 * 20, 20, 20); // draws the color
					if (mouseIsPressed && mouseX > j * 20 && mouseX < j * 20 + 20 && mouseY > i / 8 * 20 && mouseY < i / 8 * 20 + 20) {
						editor.selected = chars[i + j]; // sets the selected color
					} // detects when a color is clicked
				} // loops through each row of 8 colors
			} // draws the color selection tool

			for (var y = 0; y < editor.height; y++) {
				for (var x = 0; x < editor.width; x++) {
					if (x % 2 === 0 && y % 2 !== 0 || x % 2 !== 0 && y % 2 === 0) {
						fill(0xFFD3D3D3);
					} else {
						fill(0xFFFFFFFF);
					} // decides which color to use for the grid pattern
					rect(x * 20 + 200, y * 20 + 20, 20, 20); // draws the grid pattern

					fill(pal[editor.image[y][x]]); // sets the pixel fill
					rect(x * 20 + 200, y * 20 + 20, 20, 20); // draws the pixel
				}
			} // loops through the pixels of the image

			if (!editor.animation) { // draws the preview if it isn't an animation
				var i = get(200, 20, editor.width * 20, editor.height * 20);
				for (var y = 0; y < 3; y++) {
					for (var x = 0; x < 3; x++) {
						image(i, 20 + x * editor.width * 2, 500 + y * editor.height * 2, editor.width * 2, editor.height * 2);
					}
				}
			} else {
				editor.displayFrame += .5;
				if (editor.displayFrame >= editor.frames.length) {
					editor.displayFrame = 0;
				}
				for (var y = 0; y < editor.frames[floor(editor.displayFrame)].length; y++) {
					for (var x = 0; x < editor.frames[floor(editor.displayFrame)][y].length; x++) {
						var p = editor.frames[floor(editor.displayFrame)][y][x];
						fill(pal[p]);
						rect(20 + x * 2, 500 + y * 2, 2, 2);
					}
				}
			}
		};

		mousePressed = function () {
			mouseIsPressed = true;
		};
		mouseReleased = function () {
			mouseIsPressed = false;
		};
		mouseClicked = function () {
			var overCanvas = Hover(200, 20, editor.width * 20, editor.height * 20);
			if (overCanvas && mouseButton === LEFT) {
				editor.image[editor.mouse.y][editor.mouse.x] = editor.selected; // draws the pixel based on the selected color
			} else if (overCanvas && mouseButton === RIGHT) {
				editor.image[editor.mouse.y][editor.mouse.x] = ' '; // deletes a pixel when right clicked
			} else if (overCanvas && mouseButton === CENTER) {
				editor.selected = editor.image[editor.mouse.y][editor.mouse.x]; // sets the selected color when the pixel is middle clicked
			}
		};
		mouseDragged = function () {
			var overCanvas = Hover(200, 20, editor.width * 20, editor.height * 20);
			if (overCanvas && mouseButton === LEFT) {
				editor.image[editor.mouse.y][editor.mouse.x] = editor.selected; // draws the pixel based on the selected color
			} else if (overCanvas && mouseButton === RIGHT) {
				editor.image[editor.mouse.y][editor.mouse.x] = ' '; // deletes a pixel when right clicked
			} else if (overCanvas && mouseButton === CENTER) {
				editor.selected = editor.image[editor.mouse.y][editor.mouse.x]; // sets the selected color when the pixel is middle clicked
			}
		};
		keyPressed = function () {
			if (keyCode === 127) {
				editor.name = editor.name.substr(0, editor.name.length - 1);
			} else if (keyCode === RIGHT) {
				ShiftRight();
			} else if (keyCode === LEFT) {
				ShiftLeft();
			} else if (keyCode === UP) {
				ShiftUp();
			} else if (keyCode === DOWN) {
				ShiftDown();
			} else if (keyCode === 189) {
				if (editor.frames.length > 1) {
					editor.frames.splice(editor.currentFrame, 1);
				}
				editor.currentFrame = editor.frames.length - 1;
			} else if (keyCode === 187) {
				editor.frames[editor.currentFrame] = editor.image.map(function (arr) { return arr.slice(); });
				editor.frames.push(editor.frames[editor.frames.length - 1].map(function (arr) { return arr.slice(); }));
				editor.currentFrame = editor.frames.length - 1;
			} else if (keyCode === 109 && editor.currentFrame >= 1) {
				editor.currentFrame--;
				editor.image = editor.frames[editor.currentFrame];
			} else if (keyCode === 107 && editor.currentFrame < editor.frames.length - 1) {
				editor.currentFrame++;
				editor.image = editor.frames[editor.currentFrame];
			} else if (keyCode === 16) {
				FlipHorizontal();
			} else if (keyCode === 17) {
				FlipVertical();
			} else if (keyCode === 18) {
				Rotate();
			} else if (keyCode === 192) {
				editor.meta = !editor.meta;
				console.log(editor.meta);
			} else {
				editor.name += String(key);
			}
			console.log(editor.currentFrame);
			console.log(editor.frames);
			console.log(keyCode);
		};

	}
};
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);
