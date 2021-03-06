var programCode = function (processingInstance) {
	with (processingInstance) {
		size(768, 544);

		/*jshint sub:true*/


		var saveFile = [[0,0,0,79.5,224,288,233.5,'overworld',false],[0,49,['brown bag','nothing','nothing','nothing','nothing'],[{'dead leaf': 2,'drop of sap': 1,'flask of energy': 1,},{},{},{},{}],['nothing','nothing','nothing','ragged leather jerkin','nothing','thick leather gloves','nothing','canvas pants','frayed clothesline','worn boots','bread knife','nothing','short brown hair','nothing'],['slash'],['slash','nothing','nothing','nothing','nothing'],{'Sticky Situation': 6}],[76.0999999999948,100,180,2,200],[['The Lost Axe','Pesky Rats','Sugary Concoction',],[[-1,1,0,6,10,'overworld']]],[['overworld',0,0,0,79.5,224,288,233.5,false]]];
		var FRAME_RATE = 60; // frame rate
		var PIXEL_SIZE = 2; // pixel size
		var TILE_SIZE = 16; // normal tile size
		var REAL_SIZE = TILE_SIZE * PIXEL_SIZE; // the actual size of a tile (in pixels)
		var GUI_TEXT_COLOR = 'd'; // the default gui color
		var CONTROLS = {
			up: 87,
			down: 83,
			left: 65,
			right: 68
		}; // stores the key controls 

		var loaded = false; // whether or not the assets are loaded
		var collisionBoxes = false; // shows tile collision boxes if true
		var keys = []; // stores the keys being pressed
		var mouseIsPressed = false; // if mouse is being pressed
		var keyIsPressed = true; // if a key is being pressed
		var newClick = true; // if the player is clicking again or just holding down
		var newKey = true; // if the player is typing again or just holding down

		var items = {}; // stores all items
		var entities = {
			'enemy': {},
			'vendor': {},
			'interacting': {},
			'quest': {},
			'portal': {}
		}; // stores all entities (vendor, enemy, interacting, quest)
		var abilities = {}; // stores all of the abilities
		var quests = {}; // stores all of the quests
		var alerts = {}; // stores alerts which need to be drawn
		var popups = {}; // displays floating text which needs to be drawn
		var images = {}; // stores all of the images
		var animations = {}; // stores all of the animations
		var buffs = {}; // stores the buffs
		var tiles = {}; // stores the tiles
		var dimensions = {};
		var World = { maps: {}, interiors: [], animations: [], transition: { value: 0, change: 0 } }; // stores the maps

		// load arrays
		var load = {
			images: [],
			texts: [],
			animations: [],
			screens: [],
			interiors: [],
			tiles: [],
			guis: [],
			quests: [],
			npcs: []
		}; // stores the unloaded assets
		var count = {}; // counts how many items need to be loaded

		var slots = {
			'k': true,
			'l': true,
			'm': true,
			'n': true,
			'o': true,
			'p': true,
			'q': true,
			'r': true,
			's': true
		}; // stores which gui keys are slots
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
			//'i': color(),
			'j': color(0xFF000000),
			//'k': color(),
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
			/*'–': color(), // 280
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
			'À': color(),*/
			' ': color(0x00FFFFFF)
		}; // the current pallette
		var colors = {
			'xp': 'R',
			'fortitude': '*',
			'endurance': 't'
		}; // stores the colors for text

		var Hover = function (x, y, sizeX, sizeY) {
			if (mouseX > x && mouseX < sizeX + x && mouseY > y && mouseY < sizeY + y) {
				return true;
			} else {
				return false;
			}
		}; // a function that returns true when the mouse is over a certain area
		var arrayMax = function (array) {
			var cur = array[0];
			for (var i = 0; i < array.length; i++) {
				if (cur < array[i]) {
					cur = array[i];
				}
			}
			return (cur);
		}; // returns the greatest number value in an array
		var calcDamage = function (luck, strength, enemyArmor, level, enemyLevel, min, max, weapon) {
			if (weapon === undefined) {
				weapon = 0;
			}
			var damage = 0;
			damage += ((level - enemyLevel) * 2); // add or subtract damage based on the level difference
			damage += strength * 2;
			damage += random(0, luck * 4); // add a random crit bonus based on player's luck stat
			damage -= enemyArmor; // subtract the players armor points from the damage
			damage += weapon; // adds weapon damage
			damage += random(min, max);
			damage = round(damage); // round the damage to an integer value
			if (damage < 0) {
				damage = 0;
			}
			return damage;
		} // calculates the damage based on 5 stats
		frameRate(FRAME_RATE);

		var testKeys = function () {
			if (keys[49]) {
				return 49;
			} else if (keys[50]) {
				return 50;
			} else if (keys[51]) {
				return 51;
			} else if (keys[52]) {
				return 52;
			} else if (keys[53]) {
				return 53;
			} else {
				return false;
			}
		} // returns which of the number keys (1-5) is being pressed

		var Player = {
			'name': 'Daedalus',
			'loc': {
				'scene': {
					'x': 0, // the x-coordinate of the scene the player is in
					'y': 0, // the y-coordinate of the scene the player is in
					'z': 0 // the z-coordinate of the scene the player is in
				},
				'facing': 'down', // which direction the player is facing
				'shifting': false, // whether the player is shifting to another screen
				'transition': {
					'x': 0,
					'y': 0
				}, // the offset for the screen-slide transition
				'fade': false,
				'x': 0, // the player's x-coordinate
				'y': 0, // the player's y-coordinate
				'wx': 0, // the player's x-coordinate in the world
				'wy': 0,  // the player's y-coordinate in the world
				'sub': false, // whether the player is in a building
				'dimension': {}, // stores the players coordinates in each dimension
				'current dimension': 'overworld' // the players current dimension
			},
			'moveable': true, // if the player is able to move
			'inventory': {
				'gold': 0,
				'silver': 0,
				'bagSlots': { // the players bag slots
					'bag1': 'nothing',
					'bag2': 'nothing',
					'bag3': 'nothing',
					'bag4': 'nothing',
					'bag5': 'nothing'
				},
				'bags': { // the players bags
					'bag1': {},
					'bag2': {},
					'bag3': {},
					'bag4': {},
					'bag5': {}
				},
				'equipment': { // the items the player is wearings
					'head': 'nothing',
					'neck': 'nothing',
					'shoulders': 'nothing',
					'chest': 'nothing',
					'wrists': 'nothing',
					'hands': 'nothing',
					'finger': 'nothing',
					'legs': 'nothing',
					'waist': 'nothing',
					'feet': 'nothing',
					'mainhand': 'nothing',
					'offhand': 'nothing',
					'hair': 'nothing',
					'face': 'nothing'
				},
				'abilities': {}, // the abilities currently available in the spellbook
				'abilityBar': { // the abilities on the bar assigned a button value of 1-5
					'1': 'nothing',
					'2': 'nothing',
					'3': 'nothing',
					'4': 'nothing',
					'5': 'nothing'
				}, // the abilities the player has placed on their bar
				'buffs': {}, // the buff or debuff effects currently on the player
				'quests': {} // the quests the player has within their inventory
			},
			'stats': {
				'speed': 2, // movement speed
				'curEndurance': 100, // energy
				'endurance': 100,
				'curFortitude': 100, // health
				'fortitude': 100,
				'vitality': 0, // health regeneration
				'vigor': 0, // energy regeneration
				'luck': 0, // critical hit chance
				'strength': 0, // attack power
				'armor': 0, // armor points
				'weapon damage': 0,
				'level': 1,
				'xp': 0,
				'nextLevel': 100
			},
			'actions': { // the different actions the player is performing
				'moving': {
					'up': false,
					'down': false,
					'left': false,
					'right': false
				},
				'guis': { // the guis that are open (true) or closed (false)
					'bag1': false,
					'bag2': false,
					'bag3': false,
					'bag4': false,
					'bag5': false,
					'characterPane': false,
					'spellBook': false,
					'questLog': false,
					'questDetails': false,
					'vendor': false,
					'quest': false,
					'looting': false,
				},
				'cooldown': {
					'1': { 'max': 0, 'cur': 0, 'change': 0 },
					'2': { 'max': 0, 'cur': 0, 'change': 0 },
					'3': { 'max': 0, 'cur': 0, 'change': 0 },
					'4': { 'max': 0, 'cur': 0, 'change': 0 },
					'5': { 'max': 0, 'cur': 0, 'change': 0 }
				}, // the cooldowns for each of the player's abilities
				'fighting': false, // whether the player is fighting
				'completedQuests': [], // stores which quests the player has completed
				'used': [], // stores the non-renewable interactings that have been used
				'hover': {
					'enemy': false,
					'quest': false,
					'interacting': false,
					'vendor': false
				}, // changes the mouse based on what the player is hovering over
				'cursor': 'default', // sets the cursor
				'removeInteracting': false // set to true to remove an interacting when the lootbox is closed
			},
			'buffs': {}, // stores the player's buffs
			'size': {
				'x': 16, // the width of the player
				'y': 24, // the height
				'colX': 0, // the x location of the players hitbox
				'colY': 0, // the y location of the players hitbox
				'colXSize': 16, // the width of the players hitbox
				'colYSize': 16 // the height of the players hitbox
			},
			'animation': {
				'sprite': 'nothing',
				'armor': {
					'head': 'nothing',
					'shoulders': 'nothing',
					'chest': 'nothing',
					'wrists': 'nothing',
					'hands': 'nothing',
					'legs': 'nothing',
					'waist': 'nothing',
					'feet': 'nothing',
					'hair': 'nothing',
					'face': 'nothing'
				}
			},
			'colBox': {
				'x': 0,
				'y': 0,
				'xSize': 0,
				'ySize': 0
			}
		}; // stores information about the player
		Player.update = function () {
			Player['colBox'] = {
				'x': (round(Player['loc']['x'] / PIXEL_SIZE) * PIXEL_SIZE + Player['size']['colX'] * PIXEL_SIZE),
				'y': (round(Player['loc']['y'] / PIXEL_SIZE) * PIXEL_SIZE + Player['size']['colY'] * PIXEL_SIZE),
				'xSize': Player['size']['colXSize'] * PIXEL_SIZE,
				'ySize': Player['size']['colYSize'] * PIXEL_SIZE,
			}; // calculates the players collision box so that it is consistent with x and y location

			// the player's health regeneration
			if (Player['stats']['curFortitude'] < Player['stats']['fortitude']) {
				Player['stats']['curFortitude'] += ((Player['stats']['vitality'] + 50) / 1000);
			} else if (Player['stats']['curFortitude'] > Player['stats']['fortitude']) {
				Player['stats']['curFortitude'] = Player['stats']['fortitude'];
			}
			// the player's energy regeneration
			if (Player['stats']['curEndurance'] < Player['stats']['endurance']) {
				Player['stats']['curEndurance'] += ((Player['stats']['vigor'] + 50) / 1000);
			} else if (Player['stats']['curEndurance'] > Player['stats']['endurance']) {
				Player['stats']['curEndurance'] = Player['stats']['endurance'];
			}

			var bagTemp = {
				x: width,
				y: 0
			}; // determines the bag's position on the screen
			for (var i = 1; i < 6; i++) {

				if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') { // draws the open bags
					var cBag = items[Player['inventory']['bagSlots']['bag' + i]];
					cBag.bag.draw(bagTemp.x - cBag.bag.width, bagTemp.y, Player['inventory']['bags']['bag' + i], 'bag' + i);
					if (Player['actions']['guis']['bag' + i]) {
						bagTemp.y += cBag.bag.height;
					} // increases the y coordinate of the next bag
				}
			}

			var tempGuis = Object.keys(Player['actions']['guis']);

			// detects if the player is in combat
			if (Player['actions']['fighting'] !== false) {
				Player['moveable'] = false; // makes the player imovable in combat
				Player['actions']['fighting'].entity.fight(Player['actions']['fighting']); // starts entity combat
			} else if (Player['loc']['shifting'] !== false) {
				Player['moveable'] = false; // makes the player imovable while shifting screens
			} else if (Player['actions']['guis']['quest'] !== false) {
				Player['moveable'] = false; // makes the player imovable while talking to a quest giver
				Player['questGui'].draw(REAL_SIZE, REAL_SIZE, Player['actions']['guis']['quest']); // opens the quest gui
			} else if (Player['actions']['guis']['vendor'] !== false) {
				Player['moveable'] = false; // makes the player imovable while talking to a vendor
				Player['vendorGui'].draw(REAL_SIZE, REAL_SIZE, Player['actions']['guis']['vendor']); // opens the vendor gui
			} else if (Player['loc']['fade']) {
				Player['moveable'] = false; // makes the player imovable during an interior or vertical transition
			} else {
				Player['moveable'] = true; // makes the player moveable again
			}

			if (Player['actions']['guis']['questLog']) {
				Player['questLogGui'].draw(REAL_SIZE * 3, REAL_SIZE * 4);
			} // draws the quest log
			if (Player['actions']['guis']['characterPane']) {
				Player['characterPane'].draw(REAL_SIZE * 3, REAL_SIZE * 4);
			} // draws the character pane
			if (Player['actions']['guis']['questDetails'] !== false) {
				Player['questDetailsGui'].draw(REAL_SIZE, REAL_SIZE, Player['actions']['guis']['questDetails']);
			} // draws the quest gui
			if (Player['actions']['guis']['spellBook']) {
				Player['spellBookGui'].draw(REAL_SIZE, REAL_SIZE);
			}
			Player.closeGuis = function () {
				newKey = false;
				for (var i = 0; i < tempGuis.length; i++) {
					Player['actions']['guis'][tempGuis[i]] = false;
				}
			}; // closes all of the guis

			if (keys[81] && newKey) {
				Player.closeGuis();
			} // closes all guis when "q" is pressed

			// detects if the player is looting something
			if (Player['actions']['guis']['looting'] !== false) {
				if (Player['actions']['guis']['looting'].length === 0) {
					Player['actions']['guis']['looting'] = false;
				} else {
					Player['lootbox'].draw(320, 224, Player['actions']['guis']['looting']); // opens the loot pane
				}
			}

			// increments all of the cooldowns
			for (var i = 1; i <= 5; i++) {
				var cooldown = Player['actions']['cooldown'][i];
				cooldown.cur -= cooldown.change;
				if (cooldown.cur <= 0) {
					cooldown.change = 0;
					cooldown.cur = cooldown.max;
				}
			}

			Player.openBags = function () {
				var tempBags = {
					open: 0,
					close: 0
				};
				for (var i = 1; i < 6; i++) {
					if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
						if (Player['actions']['guis']['bag' + i]) {
							tempBags.open++;
						} else {
							tempBags.close++;
						}
					}
				} // figures out if more bags are open or closed
				if (tempBags.open >= tempBags.close) { // if more bags are open close them
					for (var i = 1; i < 6; i++) {
						if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
							Player['actions']['guis']['bag' + i] = false;
						}
					}
				} else { // if fewer bags are open, open the rest
					for (var i = 1; i < 6; i++) {
						if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
							Player['actions']['guis']['bag' + i] = true;
						}
					}
				}
			};
			if (keys[66] && newKey) {
				newKey = false;
				Player.openBags();
			} // opens all of the bags when "b" is pressed
			if (keys[67] && newKey) {
				if (!Player['actions']['guis']['characterPane']) {
					Player.closeGuis();
				}
				newKey = false;
				Player['actions']['guis']['characterPane'] = !Player['actions']['guis']['characterPane'];
			} // opens the character pane when "c" is pressed
			if (keys[86] && newKey) {
				if (!Player['actions']['guis']['spellBook']) {
					Player.closeGuis();
				}
				newKey = false;
				Player['actions']['guis']['spellBook'] = !Player['actions']['guis']['spellBook'];
			} // opens the spellbook when "v" is pressed
			if (keys[88] && newKey) {
				if (!Player['actions']['guis']['questLog']) {
					Player.closeGuis();
				}
				newKey = false;
				Player['actions']['guis']['questLog'] = !Player['actions']['guis']['questLog'];
			} // opens the spellbook when "x" is pressed
			if (keys[80] && newKey) {
				newKey = false;
				println(Player.generateSave());
			} // generates the save file when "p" is pressed
			if (keys[79] && newKey) {
				newKey = false;
				collisionBoxes = !collisionBoxes;
			} // shows collision boxes when "o" is pressed

			if (Player['inventory']['silver'] >= 100) {
				Player['inventory']['gold'] += 1;
				Player['inventory']['silver'] -= 100;
			} // increments the gold by 1 when the silver is over 100

			if (Player['inventory']['silver'] < 0) {
				Player['inventory']['gold'] -= 1;
				Player['inventory']['silver'] += 100;
			} // if the player's silver is less than 0, convert 1 gold into 100 silver

			if (Player['stats']['xp'] >= Player['stats']['nextLevel']) {
				Player['stats']['xp'] -= Player['stats']['nextLevel'];
				Player['stats']['level']++;
				Player['stats']['nextLevel'] += 50 * Player['stats']['level'];
			} // increases the players level when the player gain enough experience

			var tempBuffs = Object.keys(Player['buffs']);
			for (var i = 0; i < tempBuffs.length; i++) {
				var buff = buffs[tempBuffs[i]];
				buff.draw(REAL_SIZE * i, REAL_SIZE, Player['buffs'][tempBuffs[i]]); // draws the buff icon by the player's bar
				Player['buffs'][tempBuffs[i]]--; // decrements the buff's tiemr
				if (Player['buffs'][tempBuffs[i]] <= 0) {
					buff.remove();
				} // if the buff's cooldown is less than 0, remove the buff
			} // loops through the buffs on a player

			var actionKeys = testKeys(); // detects which key (1-5) is being pressed, if any
			if (actionKeys !== false && !Player['actions']['guis']['spellBook']) {
				if (Player['inventory']['abilityBar'][actionKeys - 48] !== 'nothing') {
					var a = abilities[Player['inventory']['abilityBar'][actionKeys - 48]]; // stores which ability is being used
					var cooldown = Player['actions']['cooldown'][actionKeys - 48]; // stores the corresponding cooldown
					if (cooldown['cur'] === cooldown['max'] && Player['stats']['curEndurance'] >= a.cost) {
						if (a.type === 'buff' || a.type === 'heal') {
							if (a.type === 'buff') {
								buffs[a.min].give();
							} // gives a buff if the ability type is a buff
							cooldown['change'] = 1; // start the cooldown
							a.animation.reset(); // resets the animation before drawing it
							World['animations'].push({
								animation: a.animation,
								x: Player['loc']['x'],
								y: Player['loc']['y'] - a.animation.height
							}); // adds an animation to the world animation list
							Player['stats']['curEndurance'] -= a.cost; // decreases the player's energy
						}
					} // if the cooldown is full and the player has enough energy
				} // if there is an ability in the slot
			}
			var popupKeys = Object.keys(popups);
			for (var i = 0; i < popupKeys.length; i++) {
				var p = popupKeys[i];
				popups[p].draw();
			} // draws all of the information popups

			if (Player['actions']['hover']['enemy']) {
				Player['actions']['cursor'] = 'enemyCursor';
			} else if (Player['actions']['hover']['quest']) {
				Player['actions']['cursor'] = 'questCursor';
			} else if (Player['actions']['hover']['vendor']) {
				Player['actions']['cursor'] = 'vendorCursor';
			} else if (Player['actions']['hover']['interacting']) {
				Player['actions']['cursor'] = 'interactingCursor';
			} else {
				Player['actions']['cursor'] = 'defaultCursor';
			} // changes the cursor based on what is being hovered over

			images[Player['actions']['cursor']].draw(round(mouseX / PIXEL_SIZE) * PIXEL_SIZE, round(mouseY / PIXEL_SIZE) * PIXEL_SIZE); // draws the cursor
		};
		Player.movement = function () {
			if (Player['moveable']) {
				// moves the player left
				if (keys[CONTROLS.left]) {
					Player['loc']['facing'] = 'left';
					Player['actions']['moving']['left'] = true;
					Player['loc']['x'] -= Player['stats']['speed'];
				} else {
					Player['actions']['moving']['left'] = false;
				}
				// moves the player right
				if (keys[CONTROLS.right]) {
					Player['loc']['facing'] = 'right';
					Player['actions']['moving']['right'] = true;
					Player['loc']['x'] += Player['stats']['speed'];
				} else {
					Player['actions']['moving']['right'] = false;
				}
				// moves the player up
				if (keys[CONTROLS.up]) {
					Player['loc']['facing'] = 'up';
					Player['actions']['moving']['up'] = true;
					Player['loc']['y'] -= Player['stats']['speed'];
				} else {
					Player['actions']['moving']['up'] = false;
				}
				// moves the player down
				if (keys[CONTROLS.down]) {
					Player['loc']['facing'] = 'down';
					Player['actions']['moving']['down'] = true;
					Player['loc']['y'] += Player['stats']['speed'];
				} else {
					Player['actions']['moving']['down'] = false;
				}
			} else {
				Player['actions']['moving']['left'] = false;
				Player['actions']['moving']['right'] = false;
				Player['actions']['moving']['up'] = false;
				Player['actions']['moving']['down'] = false;
			}
			var tempKeys = Object.keys(Player['animation']['sprite']); // gets the four directions of animation
			for (var i = 0; i < tempKeys.length; i++) {
				var dir = tempKeys[i];
				var armorSlots = Object.keys(Player['animation']['armor']); // gets the names of all of the armor slots
				if (Player['loc']['facing'] === dir) {
					if (Player['actions']['moving'][dir]) { // determines if the player is moving
						images[Player['animation']['sprite'][dir]].draw(); // draws the correct sprite based upon the direction
						for (var j = 0; j < armorSlots.length; j++) { // loops through the armor slots
							var gearAnim = Player['animation']['armor'][armorSlots[j]]; // gets the value of the players armor
							if (gearAnim !== 'nothing') {
								gearAnim = images[gearAnim];
								images[gearAnim[dir]].draw(); // draws the armor animation if the slot is not empty
							}
						}
					} else if (!Player['actions']['moving'][dir]) { // determines if the player is not moving
						images[Player['animation']['sprite'][dir]].reset(); // resets the players sprite animation to the base frame
						images[Player['animation']['sprite'][dir]].static(0); // draws the base frame as a static image
						for (var j = 0; j < armorSlots.length; j++) { // loops through the armor
							var gearAnim = Player['animation']['armor'][armorSlots[j]]; // gets the value of the players armor
							if (gearAnim !== 'nothing') {
								gearAnim = images[gearAnim];
								images[gearAnim[dir]].reset(); // resets the armor animation to the base frame
								images[gearAnim[dir]].static(0); // draws the base frame as a static image
							}
						}
					}
				}
			}
			var loc = Player['loc']['scene']
			if (Player['colBox']['y'] + REAL_SIZE / 2 < 0 && Player['actions']['moving']['up']) {
				World.maps[Player['loc']['current dimension']][loc['x']][loc['y'] - 1][loc['z']].reset();
				Player['loc']['shifting'] = 'up';
			} // detects when the player goes off of the top of the screen
			if (Player['colBox']['y'] + REAL_SIZE / 2 > height - REAL_SIZE && Player['actions']['moving']['down']) {
				Player['loc']['shifting'] = 'down';
				World.maps[Player['loc']['current dimension']][loc['x']][loc['y'] + 1][loc['z']].reset();
			} // detects when the player goes off of the bottom of the screen
			if (Player['colBox']['x'] + REAL_SIZE / 2 < 0 && Player['actions']['moving']['left']) {
				Player['loc']['shifting'] = 'left';
				World.maps[Player['loc']['current dimension']][loc['x'] - 1][loc['y']][loc['z']].reset();
			} // detects when the player goes off the left of the screen
			if (Player['colBox']['x'] + REAL_SIZE / 2 > width && Player['actions']['moving']['right']) {
				Player['loc']['shifting'] = 'right';
				World.maps[Player['loc']['current dimension']][loc['x'] + 1][loc['y']][loc['z']].reset();
			} // detects when the player goes off the right of the screen
			var temp = {
				x: Player['loc']['scene']['x'],
				y: Player['loc']['scene']['y'],
				z: Player['loc']['scene']['z'],
			}; // gets the coordinates of the players current scene
			if (Player['loc']['shifting'] === 'left') {
				Player['loc']['x'] += 8;
				Player['loc']['transition']['x'] += 8;
				if (Player['loc']['transition']['x'] > width) {
					Player['loc']['scene']['x']--;
					Player['loc']['transition']['x'] = 0;
					Player['loc']['shifting'] = false;
				}
			} // draws the moving left transition animation
			if (Player['loc']['shifting'] === 'right') {
				Player['loc']['x'] -= 8;
				Player['loc']['transition']['x'] -= 8;
				if (Player['loc']['transition']['x'] < -width) {
					Player['loc']['scene']['x']++;
					Player['loc']['transition']['x'] = 0;
					Player['loc']['shifting'] = false;
				}
			} // draws the moving right transition animation
			if (Player['loc']['shifting'] === 'up') {
				Player['loc']['y'] += 8;
				Player['loc']['transition']['y'] += 8;
				if (Player['loc']['transition']['y'] > height - REAL_SIZE) {
					Player['loc']['scene']['y']--;
					Player['loc']['transition']['y'] = 0;
					Player['loc']['shifting'] = false;
				}
			} // draws the moving up transition animation
			if (Player['loc']['shifting'] === 'down') {
				Player['loc']['y'] -= 8;
				Player['loc']['transition']['y'] -= 8;
				if (Player['loc']['transition']['y'] < -height + REAL_SIZE) {
					Player['loc']['scene']['y']++;
					Player['loc']['transition']['y'] = 0;
					Player['loc']['shifting'] = false;
				}
			} // draws the moving down transition animation
		};
		Player.calcBagSpace = function () {
			var tempSpace = 0;
			for (var i = 1; i < 6; i++) {
				if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
					tempSpace += (items[Player['inventory']['bagSlots']['bag' + i]].slots - Object.keys(Player['inventory']['bags']['bag' + i]).length);
				}
			}
			return tempSpace;
		}; // calculates how many available slots are in the player's inventory
		Player.generateSave = function () {
			var tempSave = '[';

			var sub;
			if (!Player['loc']['sub']) {
				sub = false;
			} else {
				sub = '[' + [
					Player['loc']['sub'].ix,
					Player['loc']['sub'].iy
				] + ']';
			} // sets whether the player is inside of a building for th esave file
			var coordinates = '[' + [
				Player['loc']['scene']['x'],
				Player['loc']['scene']['y'],
				Player['loc']['scene']['z'],
				Player['loc']['x'],
				Player['loc']['y'],
				Player['loc']['wx'],
				Player['loc']['wy'],
				'\'' + Player['loc']['current dimension'] + '\'',
				sub
			] + '],'; // sets the player's coordinates for the save file
			var bagItems = [
				'{',
				'{',
				'{',
				'{',
				'{'
			];
			for (var i = 1; i < 6; i++) {
				if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
					var tempItems = Object.keys(Player['inventory']['bags']['bag' + i]); // gets the names of all of the player's items
					for (var j = 0; j < tempItems.length; j++) {
						var name = tempItems[j];
						var num = Player['inventory']['bags']['bag' + i][tempItems[j]] // the number of that item the player owns
						bagItems[i - 1] += '\'' + name + '\'' + ': ' + num + ','; // converts into a string
					} // loops through all of the items
				}
				bagItems[i - 1] += '}';
			} // loops through the player's inventory

			var playerAbilities = [];
			var tempAbilities = Object.keys(Player['inventory']['abilities']);
			for (var i = 0; i < tempAbilities.length; i++) {
				var a = tempAbilities[i];
				if (Player['inventory']['abilities'][a]) {
					playerAbilities.push('\'' + a + '\'');
				}
			} // loops through the player's learned abilities and adds them to the save file

			var playerQuests = [];
			var tempQuests = Object.keys(Player['inventory']['quests']);
			for (var i = 0; i < tempQuests.length; i++) {
				var q = tempQuests[i];
				if (Player['inventory']['abilities'][a]) {
					playerQuests.push('\'' + q + '\': ' + Player['inventory']['quests'][q]); // adds the quest name and progress
				}
			} // loops through the player's quests and adds them to the save file


			var completedQuests = '';
			for (var i = 0; i < Player['actions']['completedQuests'].length; i++) {
				completedQuests += '\'' + Player['actions']['completedQuests'][i] + '\',';
			} // adds the completed quests to the save file

			var used = [];
			for (var i = 0; i < Player['actions']['used'].length; i++) {
				var temp = '';
				for(var j = 0; j < Player['actions']['used'][i].length; j++) {
					if(typeof Player['actions']['used'][i][j] === "string") {
						temp += '\'' + Player['actions']['used'][i][j] + '\'';
					} else {
						temp += Player['actions']['used'][i][j] + ',';
					}
				}
				used.push('[' + temp + ']');
			} // adds the used interactings to the save file

			var inventory = '[' + [
				Player['inventory']['gold'],
				Player['inventory']['silver'],
				'[' + [
					'\'' + Player['inventory']['bagSlots']['bag1'] + '\'',
					'\'' + Player['inventory']['bagSlots']['bag2'] + '\'',
					'\'' + Player['inventory']['bagSlots']['bag3'] + '\'',
					'\'' + Player['inventory']['bagSlots']['bag4'] + '\'',
					'\'' + Player['inventory']['bagSlots']['bag5'] + '\'',
				] + ']',
				'[' + bagItems + ']',
				'[' + [
					'\'' + Player['inventory']['equipment']['head'] + '\'',
					'\'' + Player['inventory']['equipment']['neck'] + '\'',
					'\'' + Player['inventory']['equipment']['shoulders'] + '\'',
					'\'' + Player['inventory']['equipment']['chest'] + '\'',
					'\'' + Player['inventory']['equipment']['wrists'] + '\'',
					'\'' + Player['inventory']['equipment']['hands'] + '\'',
					'\'' + Player['inventory']['equipment']['finger'] + '\'',
					'\'' + Player['inventory']['equipment']['legs'] + '\'',
					'\'' + Player['inventory']['equipment']['waist'] + '\'',
					'\'' + Player['inventory']['equipment']['feet'] + '\'',
					'\'' + Player['inventory']['equipment']['mainhand'] + '\'',
					'\'' + Player['inventory']['equipment']['offhand'] + '\'',
					'\'' + Player['inventory']['equipment']['hair'] + '\'',
					'\'' + Player['inventory']['equipment']['face'] + '\''
				] + ']',
				'[' + playerAbilities + ']',
				'[' + [
					'\'' + Player['inventory']['abilityBar']['1'] + '\'',
					'\'' + Player['inventory']['abilityBar']['2'] + '\'',
					'\'' + Player['inventory']['abilityBar']['3'] + '\'',
					'\'' + Player['inventory']['abilityBar']['4'] + '\'',
					'\'' + Player['inventory']['abilityBar']['5'] + '\'',
				] + ']',
				'{' + playerQuests + '}',
			] + '],'; // adds bags, equipment, abilities, and quests to the save file

			var stats = '[' + [
				Player['stats']['curEndurance'],
				Player['stats']['curFortitude'],
				Player['stats']['xp'],
				Player['stats']['level'],
				Player['stats']['nextLevel']
			] + '],'; // adds the player's non-gear dependent stats to the save file

			var actions = '[' + [
				'[' + completedQuests + ']',
				'[' + used + ']'
			] + '],'; // adds the completed quests and used interactings to the actions array of the save file

			var savedDimensions = [];
			var dimensionKeys = Object.keys(Player['loc']['dimension']);
			for (var i = 0; i < dimensionKeys.length; i++) {
				if (Player['loc']['current dimension'] !== dimensionKeys[i]) { // updates the dimension that the player is currently in
					var d = Player['loc']['dimension'][dimensionKeys[i]];
					var tempSub;
					if (!d.sub) {
						tempSub = d.sub;
					} else {
						tempSub = '[' + [
							d.sub.ix,
							d.sub.iy
						] + ']';
					} // sets whether the player is in an interior
					savedDimensions.push('[' + [
						'\'' + dimensionKeys[i] + '\'',
						d.sx,
						d.sy,
						d.sz,
						d.x,
						d.y,
						d.wx,
						d.wy,
						tempSub
					] + ']'); // sets spawnpoint, current coordinates, and world coordinates of the dimension
				} else { // updates the other dimensions to the save file
					savedDimensions.push('[' + [
						'\'' + Player['loc']['current dimension'] + '\'',
						Player['loc']['scene']['x'],
						Player['loc']['scene']['y'],
						Player['loc']['scene']['z'],
						Player['loc']['x'],
						Player['loc']['y'],
						Player['loc']['wx'],
						Player['loc']['wy'],
						sub
					] + ']');
				}
			} // loops through the dimensions

			savedDimensions = '[' + savedDimensions + ']'; // adds the dimensions to the save file
			tempSave += coordinates;
			tempSave += inventory;
			tempSave += stats;
			tempSave += actions;
			tempSave += savedDimensions;
			tempSave += '];'
			return tempSave; // return the completed save file as a string
		};
		Player.loadSave = function () {
			Player['loc']['scene']['x'] = saveFile[0][0]; // loads the player's x-coordinate for the screen
			Player['loc']['scene']['y'] = saveFile[0][1]; // loads the player's y-coordinate for the screen
			Player['loc']['scene']['z'] = saveFile[0][2]; // loads the player's z-coordinate for the screen
			Player['loc']['x'] = saveFile[0][3]; // loads the player's x-coordinate
			Player['loc']['y'] = saveFile[0][4]; // loads the player's y-coordinate
			Player['loc']['wx'] = saveFile[0][5]; // loads the player's world x-coordinate
			Player['loc']['wy'] = saveFile[0][6]; // loads the player's world y-coordinate
			Player['loc']['current dimension'] = saveFile[0][7]; // loads the player's current dimension
			if (!saveFile[0][8]) { // if the player is not in an interior
				Player['loc']['sub'] = saveFile[0][8];
			} else { // if the player is in an interior
				var w = World.maps[Player['loc']['current dimension']][saveFile[0][0]][saveFile[0][1]][saveFile[0][2]]; // locates which screen the interior is located in
				for (var i = 0; i < w.tiles.length; i++) { // locates which tile contains the interior
					if (saveFile[0][8][0] === w.tiles[i].interior.ix && saveFile[0][8][1] === w.tiles[i].interior.iy) {
						Player['loc']['sub'] = w.tiles[i].interior; // sets the player's interior to the saved interior
					}
				}
			}

			Player['inventory']['gold'] = saveFile[1][0]; // loads the player's gold
			Player['inventory']['silver'] = saveFile[1][1]; // loads the player's silver

			for (var i = 1; i < 6; i++) { // loops through the bags and ability bar
				Player['inventory']['bagSlots']['bag' + i] = saveFile[1][2][i - 1]; // loads the players equipped bags
				Player['inventory']['bags']['bag' + i] = saveFile[1][3][i - 1]; // loads all of the players items into their corresponsding bags
				if (saveFile[1][6][i - 1] !== 'nothing') {
					abilities[saveFile[1][6][i - 1]].equip(i);
				} // equips the abilities
				Player['inventory']['abilityBar'][i] = saveFile[1][6][i - 1];
			}
			var tempKeys = Object.keys(Player['inventory']['equipment']);
			for (var i = 0; i < tempKeys.length; i++) {
				if (saveFile[1][4][i] !== 'nothing') {
					items[saveFile[1][4][i]].use();
				}
				Player['inventory']['equipment'][tempKeys[i]] = saveFile[1][4][i];
			}
			for (var i = 0; i < saveFile[1][5].length; i++) {
				Player['inventory']['abilities'][saveFile[1][5][i]] = true;
			}
			Player['inventory']['quests'] = saveFile[1][7];
			var tempKeys = Object.keys(saveFile[1][7]);
			for (var i = 0; i < tempKeys.length; i++) {
				var q = quests[tempKeys[i]];
				if (q.amount <= saveFile[1][7][tempKeys[i]] || q.type === 'speak') {
					q.status = 'complete';
				} else {
					q.status = 'accepted';
				}
			}

			Player['stats']['curEndurance'] = saveFile[2][0];
			Player['stats']['curFortitude'] = saveFile[2][1];
			Player['stats']['xp'] = saveFile[2][2];
			Player['stats']['level'] = saveFile[2][3];
			Player['stats']['nextLevel'] = saveFile[2][4];

			Player['actions']['completedQuests'] = saveFile[3][0];
			for (var i = 0; i < saveFile[3][0].length; i++) {
				quests[saveFile[3][0][i]].status = 'complete';
			}
			Player['actions']['used'] = saveFile[3][1];
			for (var i = 0; i < saveFile[3][1].length; i++) {
				var d = saveFile[3][1][i][saveFile[3][1][i].length - 1];
				console.log(d);
				var w = World.maps[d][saveFile[3][1][i][0]][saveFile[3][1][i][1]][saveFile[3][1][i][2]];
				var ent = saveFile[3][1][i];
				if (ent.length > 6) {
					for (var j = 0; j < w.tiles.length; j++) {
						if (ent[3] === w.tiles[j].x / REAL_SIZE && ent[4] === w.tiles[j].y / REAL_SIZE) {
							var t = w.tiles[j].interior;
							for (var k = 0; k < t.storedEntities.length; k++) {
								if (ent[5] === t.storedEntities[k].x / REAL_SIZE && ent[6] === t.storedEntities[k].y / REAL_SIZE) {
									t.storedEntities[k].alive = false;
								}
							}
						}
					}
				} else {
					for (var j = 0; j < w.storedEntities.length; j++) {
						if (ent[3] === w.storedEntities[j].x / REAL_SIZE && ent[4] === w.storedEntities[j].y / REAL_SIZE) {
							w.storedEntities[j].alive = false;
						}
					}
				}
			}
			for (var i = 0; i < saveFile[4].length; i++) {
				var d = Player['loc']['dimension'][saveFile[4][i][0]];
				d.sx = saveFile[4][i][1];
				d.sy = saveFile[4][i][2];
				d.sz = saveFile[4][i][3];
				d.x = saveFile[4][i][4];
				d.y = saveFile[4][i][5];
				d.wx = saveFile[4][i][6];
				d.wy = saveFile[4][i][7];
				if (!saveFile[4][i][8]) {
					d.y = saveFile[4][i][8];
				} else {
					var w = World.maps[saveFile[4][i][0]][saveFile[4][i][1]][saveFile[4][i][2]][saveFile[4][i][3]];
					for (var j = 0; j < w.tiles.length; j++) {
						if (saveFile[4][i][8][0] === w.tiles[j].interior.ix && saveFile[4][i][8][1] === w.tiles[j].interior.iy) {
							d.sub = w.tiles[j].interior;
						}
					}
				}
			}
		};
		{
			var Image = function (pixmap, colors, size, name, allColors) {
				// sets the pixel size if not specified
				if (size === undefined) {
					this.size = PIXEL_SIZE;
				} else {
					this.size = size;
				}
				// detects if the image is to be loaded with all possible colors
				if (allColors === undefined) {
					this.allColors = false;
				} else {
					this.allColors = true;
				}
				this.pixmap = pixmap;
				this.colors = colors;
				this.name = name;
				this.combined = false;
				this.animation = false;
				load.images.push(this);
				images[this.name] = this;
			}; // the image constructor function
			Image.prototype.load = function () {
				// checks to make sure the image is not a combination of two already loaded images
				if (!this.combined) {
					this.width = this.pixmap[0].length * this.size; // sets the width of the image
					this.height = this.pixmap.length * this.size; // sets the height of the image
					this.offset = {
						x: (this.width - (TILE_SIZE * this.size)) / 2, // sets the x-offset to align images
						y: this.height - (TILE_SIZE * this.size) // sets the y-offset to align images
					};
					if (!this.allColors) {
						this.p = createGraphics(this.width, this.height, JAVA2D); // creates the graphics
						this.p.background(pal[' ']);
						this.p.noStroke();
						// loops through the tilemap
						for (var y = 0; y < this.pixmap.length; y++) {
							for (var x = 0; x < this.pixmap[y].length; x++) {
								this.p.fill(pal[this.pixmap[y][x]]); // sets the color
								this.p.rect(x * this.size, y * this.size, this.size, this.size); // draws the pixels
							}
						}
						this.p = this.p.get(); // gets the canvas and exports it as an image
						if (this.pixmap.length > TILE_SIZE) {
							this.top = createGraphics(this.width, this.height - REAL_SIZE, JAVA2D);
							this.top.background(pal[' ']);
							this.top.noStroke();
							for (var y = 0; y < this.pixmap.length - TILE_SIZE; y++) {
								for (var x = 0; x < this.pixmap[y].length; x++) {
									this.top.fill(pal[this.pixmap[y][x]]); // sets the color
									this.top.rect(x * this.size, y * this.size, this.size, this.size); // draws the pixels
								}
							}
							this.top = this.top.get();
						}
						if (this.pixmap[0].length > TILE_SIZE) {
							this.side = createGraphics(this.width, this.height, JAVA2D);
							this.side.background(pal[' ']);
							this.side.noStroke();
							for (var y = 0; y < this.pixmap.length; y++) {
								for (var x = 0; x < this.pixmap[y].length; x++) {
									this.side.fill(pal[this.pixmap[y][x]]); // sets the color
									var edge = [
										(this.pixmap[0].length - TILE_SIZE) / 2,
										this.pixmap[0].length - (this.pixmap[0].length - TILE_SIZE) / 2 - 1,
									];
									if (x > edge[1] || x < edge[0]) {
										this.side.rect(x * this.size, y * this.size, this.size, this.size); // draws the pixels
									}
								}
							}
							this.side = this.side.get();
						}
					} else {
						this.colorKeys = Object.keys(this.colors); // creates an array with all of the color keys
						this.p = [];
						// loops through all of the colors, and creates an image with each color
						for (var i = 0; i < this.colorKeys.length; i++) {
							this.p[i] = createGraphics(this.width, this.height, JAVA2D); // creates the graphics
							this.p[i].background(pal[' ']);
							this.p[i].noStroke();
							// loops through the tilemap
							for (var y = 0; y < this.pixmap.length; y++) {
								for (var x = 0; x < this.pixmap[y].length; x++) {
									if (this.pixmap[y][x] !== ' ') {
										this.p[i].fill(this.colors[this.colorKeys[i]]); // sets the color
										this.p[i].rect(x * this.size, y * this.size, this.size, this.size); // draws the pixels
									}
								}
							}
							this.p[i] = this.p[i].get(); // gets the canvas and exports it as an image
						}
					}
				}
			};
			Image.prototype.draw = function (x, y, textColor) {
				if (textColor === undefined) {
					textColor = 0;
				}
				if (this.p) {
					if (!this.allColors) {
						image(this.p, x - this.offset.x, y - this.offset.y); // draws the image
					} else {
						image(this.p[0], x - this.offset.x, y - this.offset.y);
					}
				} else {
					this.load();
					println('image drawn before loaded: forced load');
				}
			};
			var MetaImage = function (a, b, c, d, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.layout = [
					[this.a, this.b],
					[this.c, this.d]
				];
				this.name = name;
				load.images.push(this);
				images[this.name] = this;
			};
			MetaImage.prototype.load = function () {
				this.width = REAL_SIZE;
				this.height = REAL_SIZE;
				this.offset = {
					x: 0,
					y: 0
				};
				this.p = createGraphics(this.width, this.height, JAVA2D);
				this.p.background(pal[' ']);
				this.p.noStroke();
				for (var i = 0; i < this.layout.length; i++) {
					for (var j = 0; j < this.layout[i].length; j++) {
						var tempImage = images[this.layout[i][j]];
						for (var y = 0; y < tempImage.pixmap.length; y++) {
							for (var x = 0; x < tempImage.pixmap[y].length; x++) {
								this.p.fill(pal[tempImage.pixmap[y][x]]); // sets the color
								this.p.rect(x * tempImage.size + j * this.width / 2, y * tempImage.size + i * this.height / 2, tempImage.size, tempImage.size); // draws the pixels
							}
						}
					}
				}
				this.p = this.p.get();
			};
			MetaImage.prototype.draw = function (x, y, textColor) {
				if (this.p) {
					image(this.p, x - this.offset.x, y - this.offset.y); // draws the image
				} else {
					this.load();
					println('image drawn before loaded: forced load');
				}
			};
		} // image constructors
		{
			var Animation = function (frames, colors, speed, name) {
				this.frames = frames;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				this.on = 0;
				images[name] = this;
				animations[name] = this;
				load.animations.push(this);
				if (count.animations !== undefined) {
					count.animations++;
				}
			}; // the animation constructor function
			Animation.prototype.load = function () {
				this.a = []; // stores all the final image frames
				this.frame = 0; // the current frame
				this.width = this.frames[0][0].length * PIXEL_SIZE; // sets the image width
				this.height = this.frames[0].length * PIXEL_SIZE; // sets the image height
				this.offset = {
					x: (this.width - (REAL_SIZE)) / 2, // sets the tile x-offset
					y: this.height - (REAL_SIZE) // sets the tile y-offset
				};
				// loops through the frames
				for (var i = 0; i < this.frames.length; i++) {
					this.p = createGraphics(this.width, this.height, JAVA2D); // creates the graphics
					this.p.background(pal[' ']); // sets the background to transparent
					this.p.noStroke();
					// loops through the pixmaps
					for (var y = 0; y < this.frames[i].length; y++) {
						for (var x = 0; x < this.frames[i][y].length; x++) {
							this.p.fill(pal[this.frames[i][y][x]]); // sets the pixel color
							this.p.rect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE); // draws the pixels
						}
					}
					this.p = this.p.get(); // return the image
					this.a.push(this.p); // pushes the image to the array
				}
			}; // loads the animation
			Animation.prototype.draw = function (x, y) {
				if (x === undefined) {
					x = Player['loc']['x'];
				}
				if (y === undefined) {
					y = Player['loc']['y'];
				}
				if (this.a === undefined) {
					this.load();
					println('animation drawn without loading: forced load');
				}
				// resets the animation once the program has looped through the frames
				if (this.frame > this.a.length - 1) {
					this.frame = 0;
				}
				image(this.a[round(this.frame)], x - this.offset.x, y - this.offset.y); // draws the image of the current frame
			}; // draws an animation
			Animation.prototype.reset = function () {
				this.frame = 0;
			}; // resets the animation
			Animation.prototype.static = function (frame, x, y) {
				if (x === undefined) {
					x = Player['loc']['x'];
				}
				if (y === undefined) {
					y = Player['loc']['y'];
				}
				if (this.a === undefined) {
					this.load();
					println('static animation drawn without loading: forced load');
				}
				image(this.a[frame], x - this.offset.x, y - this.offset.y);
			};
			var AnimationSet = function (up, down, left, right, name) {
				this.up = up;
				this.down = down;
				this.left = left;
				this.right = right;
				this.name = name;
				images[this.name] = this;
			};
			var ShirtAnimation = function (front, back, colors, speed, name) {
				this.front = front;
				this.back = back;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			ShirtAnimation.prototype.load = function () {
				var def = {
					'up': [
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
							'    „…    ][    ',
							'   †‡ˆlmno`_^   ',
							'   ‰Špqrstuba   ',
							'  ‹ŒŽvwxyz{edc  ',
							'  ‘’YXWVUThgf  ',
							'  “  SRQPON  $  ',
							'                ',
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
							'    „…    ][    ',
							'   †‡ˆlmno`_^   ',
							'   ‰Špqrstbea   ',
							'   ‹Œvwxyz{dc   ',
							'   ‘YXWVUT     ',
							'   “ SRQPON     ',
							'                ',
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
							'     …    ]     ',
							'    „‡lmno`[    ',
							'   †Špqrst_b^   ',
							'   ‰Œvwxyzeda   ',
							'    ‹YXWVUTgc   ',
							'    SRQPON     ',
							'                ',
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
							'     …    ]     ',
							'    „lmno`[     ',
							'    †pqrsb^     ',
							'    ‰vwxyeda    ',
							'    ‹YXWVUgc    ',
							'     SRQPON     ',
							'                ',
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
							'     …    ]     ',
							'    „‡lmno`[    ',
							'   †Špqrst_b^   ',
							'   ‰Œvwxyzeda   ',
							'    ‹YXWVUTgc   ',
							'    SRQPON     ',
							'                ',
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
							'    „…    ][    ',
							'   †‡ˆlmno`_^   ',
							'   ‰Špqrstbea   ',
							'   ‹Œvwxyz{dc   ',
							'   ‘YXWVUT     ',
							'   “ SRQPON     ',
							'                ',
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
							'    „…    ][    ',
							'   †‡ˆlmno`_^   ',
							'   ‰Špqrstuba   ',
							'  ‹ŒŽvwxyz{edc  ',
							'  ‘’YXWVUThgf  ',
							'  “  SRQPON  $  ',
							'                ',
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
							'    „…    ][    ',
							'   †‡ˆlmno`_^   ',
							'   ‰ŽŠqrstuba   ',
							'   ‹Œvwxyz{dc   ',
							'     YXWVUTgf   ',
							'     SRQPON $   ',
							'                ',
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
							'     …    ]     ',
							'    „ˆlmno_[    ',
							'   †Š‡qrstub^   ',
							'   ‰ŒŽwxyz{da   ',
							'   ‹‘YXWVUTc    ',
							'     SRQPONf    ',
							'                ',
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
							'     …    ]     ',
							'     „ˆlmno]    ',
							'     †Šrstu^    ',
							'    ‰ŒŽxyz{a    ',
							'    ‹‘XWVUTc    ',
							'     SRQPON     ',
							'                ',
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
							'     …    ]     ',
							'    „ˆlmno_[    ',
							'   †Š‡qrstub^   ',
							'   ‰ŒŽwxyz{da   ',
							'   ‹‘YXWVUTc    ',
							'     SRQPONf    ',
							'                ',
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
							'    „…    ][    ',
							'   †‡ˆlmno`_^   ',
							'   ‰ŽŠqrstuba   ',
							'   ‹Œvwxyz{dc   ',
							'     YXWVUTgf   ',
							'     SRQPON $   ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'down': [
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
							'    CD    %&    ',
							'   EFGlmno()*   ',
							'   HIpqrstu+,   ',
							'  J|}vwxyz{789  ',
							'  ~€YXWVUT:;<  ',
							'    SRQPON  =  ',
							'                ',
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
							'    CD    %&    ',
							'    EFlmno(*    ',
							'   HIpqrst)+,   ',
							'   J|vwxyz{89   ',
							'   ~YXWV  :<   ',
							'    SRQP   =   ',
							'                ',
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
							'     C    %     ',
							'    EFlmno(&    ',
							'    Hpqrst+)*   ',
							'    Jvwxyz78,   ',
							'     YXW  :;9   ',
							'     SRQ  =<    ',
							'                ',
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
							'     C    %     ',
							'    EFlmno(&    ',
							'    Hpqrst)*    ',
							'    Jvwxyz8,    ',
							'    ~YXW  :9    ',
							'     SRQ  =<    ',
							'                ',
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
							'     C    %     ',
							'    EFlmno(&    ',
							'    Hpqrst+)*   ',
							'    Jvwxyz78,   ',
							'     YXW  :;9   ',
							'     SRQ  =<    ',
							'                ',
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
							'    CD    %&    ',
							'    EFlmno(*    ',
							'   HIpqrst)+,   ',
							'   J|vwxyz{89   ',
							'   ~YXWV  :<   ',
							'    SRQP   =   ',
							'                ',
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
							'    CD    %&    ',
							'   EFGlmno()*   ',
							'   HIpqrstu+,   ',
							'  J|}vwxyz{789  ',
							'  ~€YXWVUT:;<  ',
							'    SRQPON  =  ',
							'                ',
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
							'    CD    %&    ',
							'    EGlmno)*    ',
							'   HIFqrstu+,   ',
							'   J|vwxyz{89   ',
							'   ~€  WVUT;<   ',
							'      QPON=    ',
							'                ',
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
							'     D    &     ',
							'    CGlmno)*    ',
							'   EFIqrstu,    ',
							'   H|}wxyz{9    ',
							'   J€  VUT     ',
							'    ~  PON     ',
							'                ',
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
							'     D    &     ',
							'    CGlmno)*    ',
							'    EFqrstu,    ',
							'    H|wxyz{9    ',
							'    J€  VUT<    ',
							'    ~  PON     ',
							'                ',
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
							'     D    &     ',
							'    CGlmno)*    ',
							'   EFIqrstu,    ',
							'   H|}wxyz{9    ',
							'   J€  VUT     ',
							'    ~  PON     ',
							'                ',
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
							'    CD    %&    ',
							'    EGlmno)*    ',
							'   HIFqrstu+,   ',
							'   J|vwxyz{89   ',
							'   ~€  WVUT;<   ',
							'      QPON=    ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'left': [
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
							'          „     ',
							'      mno)*†    ',
							'     Hrstu,‰    ',
							'     |xyz{89‹   ',
							'     WVUT;<   ',
							'      QPN  <“   ',
							'           ;    ',
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
							'          „     ',
							'      mno)*†    ',
							'     Hrstu:,‰   ',
							'     |xyz{{89‹  ',
							'    €WVUTT:=  ',
							'      QPONN;<“  ',
							'      Q     =   ',
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
							'          „     ',
							'      mno)*†‰   ',
							'     Hrstu:,9‹  ',
							'    |xyz{8;<  ',
							'     €WVUTT  “  ',
							'     ~QPONN     ',
							'               ',
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
							'          „†    ',
							'      mno()*‰‹  ',
							'    Hrstu+:,9 ',
							'     |xyz{{8;<“ ',
							'     €WVUTTT  “ ',
							'    ~QPONT     ',
							'                ',
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
							'          „     ',
							'      mno)*†‰   ',
							'     Hrstu:,9‹  ',
							'    |xyz{8;<  ',
							'     €WVUTT  “  ',
							'     ~QPONN     ',
							'               ',
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
							'          „     ',
							'      mno)*†    ',
							'     Hrstu:,‰   ',
							'     |xyz{{89‹  ',
							'    €WVUTT:=  ',
							'      QPONN;<“  ',
							'      Q     =   ',
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
							'          „     ',
							'      mno)*†    ',
							'     Hrstu,‰    ',
							'     |xyz{89‹   ',
							'     WVUT;<   ',
							'      QPN  <“   ',
							'           =    ',
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
							'          „     ',
							'      mno)†     ',
							'     Hrst,*‰    ',
							'     |xyz89‹    ',
							'     WVU;<    ',
							'     QPN  <“    ',
							'          =     ',
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
							'      mno)„     ',
							'     Hrst,*†    ',
							'     |xy8:9‰    ',
							'     WV;<‹     ',
							'        =<     ',
							'         “      ',
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
							'      mno)„     ',
							'      rst*†     ',
							'      xy8,9‰    ',
							'       ;;<<‹    ',
							'       <<“     ',
							'      ==        ',
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
							'      mno)„     ',
							'     Hrst,*†    ',
							'     |xy8:9‰    ',
							'     WV;<‹     ',
							'        =<     ',
							'         “      ',
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
							'          „     ',
							'      mno)†     ',
							'     Hrst,*‰    ',
							'     |xyz89‹    ',
							'     WVU;<    ',
							'     QPN  <“    ',
							'          =     ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'right': [
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
							'     „          ',
							'    †*)onm      ',
							'    ‰,utsrH     ',
							'   ‹98{zyx|     ',
							'   <;TUVW     ',
							'   “<  NPQ      ',
							'    ;           ',
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
							'     „          ',
							'    †*)onm      ',
							'   ‰,:utsrH     ',
							'  ‹98{{zyx|     ',
							'  =:TTUVW€    ',
							'  “<;NNOPQ      ',
							'   =     Q      ',
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
							'     „          ',
							'   ‰†*)onm      ',
							'  ‹9,:utsrH     ',
							'  <;8{zyx|    ',
							'  “  TTUVW€     ',
							'     NNOPQ~     ',
							'               ',
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
							'    †„          ',
							'  ‹‰*)(onm      ',
							' 9,:+utsrH    ',
							' “<;8{{zyx|     ',
							' “  TTTUVW€     ',
							'     TNOPQ~    ',
							'                ',
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
							'     „          ',
							'   ‰†*)onm      ',
							'  ‹9,:utsrH     ',
							'  <;8{zyx|    ',
							'  “  TTUVW€     ',
							'     NNOPQ~     ',
							'               ',
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
							'     „          ',
							'    †*)onm      ',
							'   ‰,:utsrH     ',
							'  ‹98{{zyx|     ',
							'  =:TTUVW€    ',
							'  “<;NNOPQ      ',
							'   =     Q      ',
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
							'     „          ',
							'    †*)onm      ',
							'    ‰,utsrH     ',
							'   ‹98{zyx|     ',
							'   <;TUVW     ',
							'   “<  NPQ      ',
							'    =           ',
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
							'     „          ',
							'     †)onm      ',
							'    ‰*,tsrH     ',
							'    ‹98zyx|     ',
							'    <;UVW     ',
							'    “<  NPQ     ',
							'     =          ',
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
							'     „)onm      ',
							'    †*,tsrH     ',
							'    ‰9:8yx|     ',
							'     ‹<;VW     ',
							'     <=        ',
							'      “         ',
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
							'     „)onm      ',
							'     †*tsr      ',
							'    ‰9,8yx      ',
							'    ‹<<;;       ',
							'     “<<       ',
							'        ==      ',
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
							'     „)onm      ',
							'    †*,tsrH     ',
							'    ‰9:8yx|     ',
							'     ‹<;VW     ',
							'     <=        ',
							'      “         ',
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
							'     „          ',
							'     †)onm      ',
							'    ‰*,tsrH     ',
							'    ‹98zyx|     ',
							'    <;UVW     ',
							'    “<  NPQ     ',
							'     =          ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']]
				};
				var flip = {
					'up': [],
					'down': []
				};
				for (var i = 0; i < def['up'][0].length; i++) {
					flip['up'][i] = Object.create(def['up'][0])[i].split('').reverse().join('');
					flip['down'][i] = Object.create(def['down'][0])[i].split('').reverse().join('');
				}
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var keys = {
					'up': {},
					'down': {},
					'left': {},
					'right': {},
					'mirror': {},
				};
				for (var y = 0; y < this.front.length; y++) {
					for (var x = 0; x < this.front[y].length; x++) {
						keys['mirror'][def['up'][0][y][x]] = flip['up'][y][x];
						keys['mirror'][def['down'][0][y][x]] = flip['down'][y][x];
						keys['down'][def['down'][0][y][x]] = this.front[y][x];
						keys['up'][def['up'][0][y][x]] = this.back[y][x];
					}
				}
				keys['left'] = Object.assign({}, keys['down']);
				var tempKeys = Object.keys(keys['up']);
				for (var i = 0; i < tempKeys.length; i++) {
					if (keys['left'][tempKeys[i]] === undefined) {
						keys['left'][tempKeys[i]] = keys['up'][tempKeys[i]];
					}
				}
				var tempKeysLeft = Object.keys(keys['left']);
				for (var i = 0; i < tempKeysLeft.length; i++) {
					keys['right'][tempKeysLeft[i]] = keys['left'][keys['mirror'][tempKeysLeft[i]]];
				}
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[dir[j]][p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
			var PantsAnimation = function (a, b, c, d, colors, speed, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			PantsAnimation.prototype.load = function () {
				var def = {
					'up': [
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
							'      FEEF      ',
							'     DEDDED     ',
							'     DDCCDD     ',
							'     DCCCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
							'     DEDDED     ',
							'     DDCCCD     ',
							'     DCCC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEE      ',
							'     DEEDCC     ',
							'     DDDC       ',
							'     DCCC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEED      ',
							'     DEEDC      ',
							'     DDDC       ',
							'     DCC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEE      ',
							'     DEEDCC     ',
							'     DDDC       ',
							'     DCCC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
							'     DEDDED     ',
							'     DDCCCD     ',
							'     DCCC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
							'     DEDDED     ',
							'     DDCCDD     ',
							'     DCCCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
							'     DEDDED     ',
							'     DCCCDD     ',
							'       CCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      EEEFD     ',
							'     CCDEED     ',
							'       CDDD     ',
							'       CCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      DEEFD     ',
							'      CDEED     ',
							'       CDDD     ',
							'        CCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      EEEFD     ',
							'     CCDEED     ',
							'       CDDD     ',
							'       CCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
							'     DEDDED     ',
							'     DCCCDD     ',
							'       CCCD     ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'down': [
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
							'      FEEF      ',
							'     DEDDED     ',
							'     DDCCDD     ',
							'     DCCCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEF      ',
							'    DEECDED     ',
							'    DCCCDED     ',
							'        CCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DDEEE       ',
							'    DCCCDED     ',
							'        CDD     ',
							'        CCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DDEE       ',
							'       DEED     ',
							'        CDD     ',
							'        CCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DDEEE       ',
							'    DCCCDED     ',
							'        CDD     ',
							'        CCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEF      ',
							'    DEECDED     ',
							'    DCCCDED     ',
							'        CCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
							'     DEDDED     ',
							'     DDCCDD     ',
							'     DCCCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEFD     ',
							'     DEDCEED    ',
							'     DEDCCCD    ',
							'     DCC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EEEDD    ',
							'     DEDCCCD    ',
							'     DDC        ',
							'     DCC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EEDD     ',
							'     DEED       ',
							'     DDC        ',
							'     DCC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EEEDD    ',
							'     DEDCCCD    ',
							'     DDC        ',
							'     DCC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEFD     ',
							'     DEDCEED    ',
							'     DEDCCCD    ',
							'     DCC        ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'left': [
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
							'      DF        ',
							'      DED       ',
							'     DEDDDD     ',
							'      DCCCD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      DFF       ',
							'      DEED      ',
							'     DEDEDD     ',
							'      DCDC      ',
							'        C       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFFEED     ',
							'     DEEDDC     ',
							'     DDDDC      ',
							'      CDC       ',
							'       C        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFFEFD     ',
							'     DEEEED     ',
							'     DEDDD      ',
							'     DDDCC      ',
							'      CC        ',
							'       C        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFFEED     ',
							'     DEEDDC     ',
							'     DDDDC      ',
							'      CDC       ',
							'       C        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      DFE       ',
							'      DEED      ',
							'     DEDEDD     ',
							'      DCDC      ',
							'        C       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      DF        ',
							'      DED       ',
							'     DEDDDD     ',
							'      DCCCD     ',
							'          C     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DE         ',
							'     DED        ',
							'     DDDDDDD    ',
							'     DCCCDC     ',
							'         C      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     D    D     ',
							'     DD  DD     ',
							'    DDEDDEDD    ',
							'     CDCDDCD    ',
							'      C CC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        DED     ',
							'    DDDEEFD     ',
							'    DCDDEEDD    ',
							'     CCCDDC     ',
							'        CC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     D    D     ',
							'     DD  DD     ',
							'    DDEDDEDD    ',
							'     CDCDDCD    ',
							'      C CC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DE         ',
							'     DED        ',
							'     DDDDDDD    ',
							'     DCCCDC     ',
							'         C      ',
							'                ',
							'                ',
							'                ']],
					'right': [
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
							'        FD      ',
							'       DED      ',
							'     DDDDED     ',
							'     DCCCD      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       FFD      ',
							'      DEED      ',
							'     DDEDED     ',
							'      CDCD      ',
							'       C        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DEEFFD     ',
							'     CDDEED     ',
							'      CDDDD     ',
							'       CDC      ',
							'        C       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEFFD     ',
							'     DEEEED     ',
							'      DDDED     ',
							'      CCDDD     ',
							'        CC      ',
							'        C       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DEEFFD     ',
							'     CDDEED     ',
							'      CDDDD     ',
							'       CDC      ',
							'        C       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EFD      ',
							'      DEED      ',
							'     DDEDED     ',
							'      CDCD      ',
							'       C        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        FD      ',
							'       DED      ',
							'     DDDDED     ',
							'     DCCCD      ',
							'     C          ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         ED     ',
							'        DED     ',
							'    DDDDDDD     ',
							'     CDCCCD     ',
							'      C         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     D    D     ',
							'     DD  DD     ',
							'    DDEDDEDD    ',
							'    DCDDCDC     ',
							'      CC C      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DED        ',
							'     DFEEDDD    ',
							'    DDEEDDCD    ',
							'     CDDCCC     ',
							'      CC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     D    D     ',
							'     DD  DD     ',
							'    DDEDDEDD    ',
							'    DCDDCDC     ',
							'      CC C      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         ED     ',
							'        DED     ',
							'    DDDDDDD     ',
							'     CDCCCD     ',
							'      C         ',
							'                ',
							'                ',
							'                ']]
				};
				var keys = {
					'C': this.a,
					'D': this.b,
					'E': this.c,
					'F': this.d,
					' ': ' '
				};
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
			var GlovesAnimation = function (a, b, c, colors, speed, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			GlovesAnimation.prototype.load = function () {
				var def = {
					'up': [
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
							'   EE      EE   ',
							'  DDDE    EDDD  ',
							'   CC      CC   ',
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
							'                ',
							'                ',
							'                ',
							'           EED  ',
							'    D      DDD  ',
							'    C      CC   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'           EED  ',
							'          EDDD  ',
							'           CC   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'           ED   ',
							'          EDD   ',
							'           CC   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'           EED  ',
							'          EDDD  ',
							'           CC   ',
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
							'                ',
							'                ',
							'                ',
							'           EED  ',
							'    D      DDD  ',
							'    C      CC   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'   EE      EE   ',
							'  DDDE    EDDD  ',
							'   CC      CC   ',
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
							'                ',
							'                ',
							'                ',
							'  DEE           ',
							'  DDD      D    ',
							'   CC      C    ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'  DEE           ',
							'  DDDE          ',
							'   CC           ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'   DE           ',
							'   DDE          ',
							'   CC           ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'  DEE           ',
							'  DDDE          ',
							'   CC           ',
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
							'                ',
							'                ',
							'                ',
							'  DEE           ',
							'  DDD      D    ',
							'   CC      C    ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'down': [
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
							'   EE      EE   ',
							'  DEED    DEED  ',
							'   CC      CC   ',
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
							'                ',
							'                ',
							'                ',
							'         EE     ',
							'  DE     DED    ',
							'  CDC     CC    ',
							'   C            ',
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
							'                ',
							'                ',
							'                ',
							'   DD   EE      ',
							'   CC   DD      ',
							'         DC     ',
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
							'                ',
							'                ',
							'                ',
							'        EE      ',
							'        DD      ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'   DD   EE      ',
							'   CC   DD      ',
							'         DC     ',
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
							'                ',
							'                ',
							'                ',
							'         EE     ',
							'  DE     DED    ',
							'  CDC     CC    ',
							'   C            ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'   EE      EE   ',
							'  DEED    DEED  ',
							'   CC      CC   ',
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
							'                ',
							'                ',
							'                ',
							'     EE         ',
							'    DED     ED  ',
							'    CC     CDC  ',
							'            C   ',
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
							'                ',
							'                ',
							'                ',
							'      EE   DD   ',
							'      DD   CC   ',
							'     CD         ',
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
							'                ',
							'                ',
							'                ',
							'      EE        ',
							'      DD        ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'      EE   DD   ',
							'      DD   CC   ',
							'     CD         ',
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
							'                ',
							'                ',
							'                ',
							'     EE         ',
							'    DED     ED  ',
							'    CC     CDC  ',
							'            C   ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'left': [
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
							'    DE   DE     ',
							'    DD  DDD     ',
							'     C   CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'   DEE          ',
							'   DDD   DDD    ',
							'    CC    CC    ',
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
							'                ',
							'                ',
							'   D            ',
							'  DEE      EE   ',
							'  DDD      DDC  ',
							'   C       CC   ',
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
							'                ',
							'   D            ',
							'  DEE           ',
							'  DDD       EE  ',
							'   C       DDDD ',
							'            CC  ',
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
							'                ',
							'                ',
							'   D            ',
							'  DEE      EE   ',
							'  DDD      DDD  ',
							'   C       CC   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'   DEE          ',
							'   DDD   DDD    ',
							'    CC    CC    ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'    DE   DE     ',
							'    DD  DDD     ',
							'     C   CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'        DE      ',
							'       DDD      ',
							'        CCC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'     DEE        ',
							'      DDD       ',
							'       CC       ',
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
							'                ',
							'                ',
							'     D          ',
							'    DED         ',
							'    DDD         ',
							'     C          ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'     DEE        ',
							'      DDD       ',
							'       CC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'        DE      ',
							'       DDD      ',
							'        CCC     ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                '],
					],
					'right': [
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
							'     ED   ED    ',
							'     DDD  DD    ',
							'     CC   C     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'          EED   ',
							'    DDD   DDD   ',
							'    CC    CC    ',
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
							'                ',
							'                ',
							'            D   ',
							'   EE      EED  ',
							'  CDD      DDD  ',
							'   CC       C   ',
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
							'                ',
							'            D   ',
							'           EED  ',
							'  EE       DDD  ',
							' DDDD       C   ',
							'  CC            ',
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
							'                ',
							'                ',
							'            D   ',
							'   EE      EED  ',
							'  DDD      DDD  ',
							'   CC       C   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'          EED   ',
							'    DDD   DDD   ',
							'    CC    CC    ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'     ED   ED    ',
							'     DDD  DD    ',
							'     CC   C     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'      ED        ',
							'      DDD       ',
							'     CCC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'        EED     ',
							'       DDD      ',
							'       CC       ',
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
							'          D     ',
							'         DED    ',
							'         DDD    ',
							'          C     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'        EED     ',
							'       DDD      ',
							'       CC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'      ED        ',
							'      DDD       ',
							'     CCC        ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']]
				};
				var keys = {
					'C': this.a,
					'D': this.b,
					'E': this.c,
					' ': ' '
				};
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
			var BeltAnimation = function (a, b, c, colors, speed, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			BeltAnimation.prototype.load = function () {
				var def = {
					'up': [
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
							'      FEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEFD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEFD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEFD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DFEEFD     ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'down': [
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
							'      FEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EE       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EE       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EE       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EE       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EE       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       EE       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      FEEF      ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'left': [
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
							'      EE        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      EED       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     FEEDDD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     FEEDDD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     FEEDDD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      EED       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'      EE        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     FE         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     F    D     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        DDD     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     F    D     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     FE         ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']],
					'right': [
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
							'        EE      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       DEE      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DDDEEF     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DDDEEF     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DDDEEF     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'       DEE      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        EE      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         EF     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     D    F     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DDD        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     D    F     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         EF     ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ']]
				};
				var keys = {
					'D': this.a,
					'F': this.b,
					'E': this.c,
					' ': ' '
				};
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
			var BootsAnimation = function (a, b, c, colors, speed, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			BootsAnimation.prototype.load = function () {
				var def = {
					'up': [
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
							'    DEEDDEED    ',
							'    CDDCCDDC    ',
							'     CC  CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         EED    ',
							'    DEEDDDDC    ',
							'    CDDCCCC     ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         EED    ',
							'         DDC    ',
							'    DEEDCCC     ',
							'    CDDC        ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'          E     ',
							'         DDC    ',
							'        CCCC    ',
							'    DEED        ',
							'    CDDC        ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         EED    ',
							'         DDC    ',
							'    DEEDCCC     ',
							'    CDDC        ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         EED    ',
							'    DEEDDDDC    ',
							'    CDDCCCC     ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEEDDEED    ',
							'    CDDCCDDC    ',
							'     CC  CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEE         ',
							'    CDDDDEED    ',
							'     CCCCDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEE         ',
							'    CDD         ',
							'     CCCDEED    ',
							'        CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     E          ',
							'    CDD         ',
							'    CCCC        ',
							'        DEED    ',
							'        CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEE         ',
							'    CDD         ',
							'     CCCDEED    ',
							'        CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEE         ',
							'    CDDDDEED    ',
							'     CCCCDDC    ',
							'         CC     ',
							'                ']],
					'down': [
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
							'    DEEDDEED    ',
							'    CDDCCDDC    ',
							'     CC  CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEED        ',
							'    CDDCDEED    ',
							'     CC CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEED        ',
							'    CDDC        ',
							'     CC DEED    ',
							'        CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEE         ',
							'    CDDD        ',
							'     CCC        ',
							'        DEED    ',
							'        CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEED        ',
							'    CDDC        ',
							'     CC DEED    ',
							'        CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEED        ',
							'    CDDCDEED    ',
							'     CC CDDC    ',
							'         CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEEDDEED    ',
							'    CDDCCDDC    ',
							'     CC  CC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        DEED    ',
							'    DEEDCDDC    ',
							'    CDDC CC     ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        DEED    ',
							'        CDDC    ',
							'    DEED CC     ',
							'    CDDC        ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         EED    ',
							'        DDDC    ',
							'        CCC     ',
							'    DEED        ',
							'    CDDC        ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        DEED    ',
							'        CDDC    ',
							'    DEED CC     ',
							'    CDDC        ',
							'     CC         ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        DEED    ',
							'    DEEDCDDC    ',
							'    CDDC CC     ',
							'     CC         ',
							'                ']],
					'left': [
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
							'     DEDEEED    ',
							'     CDCDDDC    ',
							'      CCCCC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'          ED    ',
							'      DE DDC    ',
							'      CDCCC     ',
							'      CCCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         ED     ',
							'      C DDC     ',
							'       CCCC     ',
							'       CCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'        EEC     ',
							'        DCC     ',
							'        CC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'         ED     ',
							'      C DDC     ',
							'       CCCC     ',
							'       CCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'          ED    ',
							'      DE DDC    ',
							'      CDCCC     ',
							'      CCCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DEDEEED    ',
							'     CDCDDDC    ',
							'      CCCCC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'           ED   ',
							'    DEEDD EDC   ',
							'    CDDCCDDC    ',
							'     CCCCCC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    D           ',
							'   DEE    EED   ',
							'   CDDC  DDDC   ',
							'    CC   CCC    ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'   D            ',
							'  DEE      EE   ',
							'  CDDC    DDDC  ',
							'   CC     CCC   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    D           ',
							'   DEE    EED   ',
							'   CDDC  DDDC   ',
							'    CC   CCC    ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'           ED   ',
							'    DEEDD EDC   ',
							'    CDDCCDDC    ',
							'     CCCCCC     ',
							'                ']],
					'right': [
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
							'    DEEEDED     ',
							'    CDDDCDC     ',
							'     CCCCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DE          ',
							'    CDD ED      ',
							'     CCCDC      ',
							'      CCCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DE         ',
							'     CDD C      ',
							'     CCCC       ',
							'      CCC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     CEE        ',
							'     CCD        ',
							'      CC        ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'     DE         ',
							'     CDD C      ',
							'     CCCC       ',
							'      CCC       ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DE          ',
							'    CDD ED      ',
							'     CCCDC      ',
							'      CCCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'    DEEEDED     ',
							'    CDDDCDC     ',
							'     CCCCC      ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'   DE           ',
							'   CDE DDEED    ',
							'    CDDCCDDC    ',
							'     CCCCCC     ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'           D    ',
							'   DEE    EED   ',
							'   CDDD  CDDC   ',
							'    CCC   CC    ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'            D   ',
							'   EE      EED  ',
							'  CDDD    CDDC  ',
							'   CCC     CC   ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'           D    ',
							'   DEE    EED   ',
							'   CDDD  CDDC   ',
							'    CCC   CC    ',
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
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'                ',
							'   DE           ',
							'   CDE DDEED    ',
							'    CDDCCDDC    ',
							'     CCCCCC     ',
							'                ']]
				};
				var keys = {
					'C': this.a,
					'D': this.b,
					'E': this.c,
					' ': ' '
				};
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
			var ShortHairAnimation = function (a, b, c, d, colors, speed, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			ShortHairAnimation.prototype.load = function () {
				var def = {
					'up': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DEFFED     ',
						'     DFFFFD     ',
						'    DEEFEFEC    ',
						'    CDFEEEDC    ',
						'    CDDEDDDC    ',
						'     CDDDDC     ',
						'      CCCC      ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'down': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DFEFFD     ',
						'     DEEEFD     ',
						'    CDDDEEFC    ',
						'    CCCDDDCC    ',
						'    C   D  C    ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'left': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DFFFFD     ',
						'    DFEFFEFD    ',
						'    DEDDEDFD    ',
						'    C CCEDED    ',
						'        D DD    ',
						'          CC    ',
						'         CC     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'right': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DFFFFD     ',
						'    DFEFFEFD    ',
						'    DFDEDDED    ',
						'    DEDECC C    ',
						'    DD D        ',
						'    CC          ',
						'     CC         ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']]
				};
				var keys = {
					'C': this.a,
					'D': this.b,
					'E': this.c,
					'F': this.d,
					' ': ' '
				};
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
			var LongHairAnimation = function (a, b, c, d, colors, speed, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.d = d;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			LongHairAnimation.prototype.load = function () {
				var def = {
					'up': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DEFFED     ',
						'     DFFFFD     ',
						'    DFEFEEED    ',
						'    DEDEEDFD    ',
						'    CEFEDEFC    ',
						'    CEEFEFEC    ',
						'    CDEFFEDC    ',
						'    CDEFFEDC    ',
						'     CDFEDC     ',
						'     CDEDC      ',
						'      CDDC      ',
						'       CC       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'down': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DEFFED     ',
						'     DFFEFD     ',
						'    DEDDDDED    ',
						'    CDCC  CD    ',
						'    CC     D    ',
						'    C      C    ',
						'    C      C    ',
						'    DC    CD    ',
						'    EDC  CD     ',
						'     ED  D      ',
						'     EE         ',
						'      E         ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'left': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DFFFFD     ',
						'    DFEFFEFD    ',
						'    DEDDEDFD    ',
						'    D CCDDED    ',
						'       CC ED    ',
						'        C EC    ',
						'         EEC    ',
						'        ED C    ',
						'     C ED       ',
						'       ED       ',
						'        C       ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'right': [[
						'                ',
						'                ',
						'      DDDD      ',
						'     DFFFFD     ',
						'    DFEFFEFD    ',
						'    DFDEDDED    ',
						'    DEDDCC D    ',
						'    DE CC       ',
						'    CE C        ',
						'    CEE         ',
						'    C DE        ',
						'       DE C     ',
						'       DE       ',
						'       C        ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']]
				};
				var keys = {
					'C': this.a,
					'D': this.b,
					'E': this.c,
					'F': this.d,
					' ': ' '
				};
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
			var ShortBeardAnimation = function (a, b, c, colors, speed, name) {
				this.a = a;
				this.b = b;
				this.c = c;
				this.colors = colors;
				this.speed = speed;
				this.name = name;
				load.animations.push(this);
			};
			ShortBeardAnimation.prototype.load = function () {
				var def = {
					'up': [[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'down': [[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'    D      D    ',
						'     D EE D     ',
						'     CD  DC     ',
						'      CCCC      ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'left': [[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'         D      ',
						'         D      ',
						'    DE ED       ',
						'      DDD       ',
						'     CC         ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']],
					'right': [[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      D         ',
						'      D         ',
						'       DE ED    ',
						'       DDD      ',
						'         CC     ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ']]
				};
				var keys = {
					'C': this.a,
					'D': this.b,
					'E': this.c,
					' ': ' '
				};
				var final = {
					'up': [],
					'down': [],
					'left': [],
					'right': []
				};
				var dir = Object.keys(def);
				for (var j = 0; j < dir.length; j++) {
					for (var i = 0; i < def[dir[j]].length; i++) {
						final[dir[j]][i] = [];
						for (var y = 0; y < def[dir[j]][i].length; y++) {
							final[dir[j]][i][y] = '';
							for (var x = 0; x < def[dir[j]][i][y].length; x++) {
								var p = def[dir[j]][i][y][x];
								final[dir[j]][i][y] += String(keys[p]);
							}
						}
					}
					new Animation(final[dir[j]], this.colors, this.speed, this.name + ' ' + dir[j]);
				}
				new AnimationSet(this.name + ' up', this.name + ' down', this.name + ' left', this.name + ' right', this.name)
			};
		} // animation constructor
		var textKeys = {
			'A': 'textUpperA',
			'a': 'textLowerA',
			'B': 'textUpperB',
			'b': 'textLowerB',
			'C': 'textUpperC',
			'c': 'textLowerC',
			'D': 'textUpperD',
			'd': 'textLowerD',
			'E': 'textUpperE',
			'e': 'textLowerE',
			'F': 'textUpperF',
			'f': 'textLowerF',
			'G': 'textUpperG',
			'g': 'textLowerG',
			'H': 'textUpperH',
			'h': 'textLowerH',
			'I': 'textUpperI',
			'i': 'textLowerI',
			'J': 'textUpperJ',
			'j': 'textLowerJ',
			'K': 'textUpperK',
			'k': 'textLowerK',
			'L': 'textUpperL',
			'l': 'textLowerL',
			'M': 'textUpperM',
			'm': 'textLowerM',
			'N': 'textUpperN',
			'n': 'textLowerN',
			'O': 'textUpperO',
			'o': 'textLowerO',
			'P': 'textUpperP',
			'p': 'textLowerP',
			'Q': 'textUpperQ',
			'q': 'textLowerQ',
			'R': 'textUpperR',
			'r': 'textLowerR',
			'S': 'textUpperS',
			's': 'textLowerS',
			'T': 'textUpperT',
			't': 'textLowerT',
			'U': 'textUpperU',
			'u': 'textLowerU',
			'V': 'textUpperV',
			'v': 'textLowerV',
			'W': 'textUpperW',
			'w': 'textLowerW',
			'X': 'textUpperX',
			'x': 'textLowerX',
			'Y': 'textUpperY',
			'y': 'textLowerY',
			'Z': 'textUpperZ',
			'z': 'textLowerZ',
			' ': 'textSpace',
			'.': 'textPeriod',
			',': 'textComma',
			'(': 'textParLeft',
			')': 'textParRight',
			'\"': 'textDoubleQuotes',
			'\'': 'textSingleQuotes',
			'?': 'textQuestionMark',
			'!': 'textExclamationPoint',
			':': 'textColon',
			';': 'textSemiColon',
			'1': 'textOne',
			'2': 'textTwo',
			'3': 'textThree',
			'4': 'textFour',
			'5': 'textFive',
			'6': 'textSix',
			'7': 'textSeven',
			'8': 'textEight',
			'9': 'textNine',
			'0': 'textZero',
			'/': 'textSlash',
			'-': 'textDash'
		};
		{
			var Text = function (text, size, color) {
				this.text = text;
				this.size = size;
				this.color = color;
				load.texts.push(this);
			};
			Text.prototype.load = function () {
				this.lines = this.text.split('\n').length; // returns how many lines there are
				this.width = []; // stores the width of each line to find the maximum width of the text
				var tempWidth = 0; // the position of the next letter to be drawn
				this.height = this.lines * 8 + (this.lines - 1) + 4; // how high the text block is
				for (var i = 0; i < this.text.length; i++) {
					if (this.text[i] === '\n' || i === this.text.length - 1) { // resets the letter drawing position when a newline is reached
						this.width.push(tempWidth); // pushes the line width to the width array
						tempWidth = 0;
					} else if (this.text[i] === '\t') { // increases the letter drawing position by 32 when an indent is made
						tempWidth += 32;
					} else if (images[textKeys[this.text[i]]].p !== undefined) { // increases the drawing position by the width of the last letter
						tempWidth += images[textKeys[this.text[i]]].width;
					}
				}
				this.width = arrayMax(this.width); // finds the greatest line width in the width array
				this.p = createGraphics(this.width + 8, this.height, JAVA2D); // creates an image of the text based upon the width and height
				this.p.noStroke();
				this.p.background(pal[' ']);
				var x = 0;
				var y = 0;
				for (var i = 0; i < this.text.length; i++) {
					if (this.text[i] === '\n') { // adds a new line and resets x-position
						y += 9;
						x = 0;
					} else if (this.text[i] === '\t') { // adds tab by increasing x-position by more
						x += 32;
					} else if (images[textKeys[this.text[i]]].p !== undefined) {
						var tempImage = images[textKeys[this.text[i]]]; // gets the image related to the text character
						this.index = tempImage.colorKeys.indexOf(this.color); // gets the index of the correct image color
						this.p.image(tempImage.p[this.index], x, y); // draws the character image
						x += tempImage.width; // increases the x-position by the width
					} else {
						images[textKeys[this.text[i]]].load(); // loads the text if it wasn't loaded before the programy
						println('image called in text before loaded: forced load');
					}
				}
				this.p = this.p.get();
			};
			Text.prototype.draw = function (x, y) {
				image(this.p, x, y);
			};
			var PixelNumber = function (number, x, y, color) {
				number = String(number);
				var tempX = x;
				for (var i = 0; i < number.length; i++) {
					var tempImage = images[textKeys[number[i]]];
					var colorIndex = tempImage.colorKeys.indexOf(color);
					image(tempImage.p[colorIndex], tempX, y);
					tempX += tempImage.width;
				}
			}; // draws a pixel number that has not been preloaded
			var PixelText = function (string, x, y, color) {
				var temp = {
					x: x,
					y: y,
				};
				for (var i = 0; i < string.length; i++) {
					if (string[i] === '~' && string[i + 2] === '~') {
						color = string[i + 1];
						i += 2;
					} else if (string[i] === '\n') {
						temp.y += 9;
						temp.x = x;
					} else if (string[i] === '\t') {
						temp.x += 32;
					} else if (images[textKeys[string[i]]].p !== undefined) {
						var tempImage = images[textKeys[string[i]]];
						var index = tempImage.colorKeys.indexOf(color);
						image(tempImage.p[index], temp.x, temp.y);
						temp.x += tempImage.width;
					} else {
						images[textKeys[string[i]]].load();
						println('image called in text before loaded: forced load');
					}
				}
			}; // draws pixel text that has not been preloaded
		} // text constructors
		{
			var Tile = function (image, type, key) {
				this.image = image;
				this.type = type;
				this.offset = {
					x: 0,
					y: 0,
				};
				if (key !== undefined) {
					this.key = key;
					tiles[this.key] = this;
				}
				load.tiles.push(this);
			}; // the tile constructor function
			Tile.prototype.load = function () {
				// detects if the tile is a composition of different images
				if (this.image.constructor === Array) {
					for (var i = 0; i < this.image.length; i++) {
						this.image[i] = images[this.image[i]];
					}
					this.width = this.image[0].width; // sets the width to that of the first image
					this.height = this.image[0].height; // sets the height to that of the first image
					this.offset.x = this.image[0].offset.x;
					this.offset.y = this.image[0].offset.y;
				} else {
					this.image = images[this.image];
					this.width = this.image.width; // sets the width
					this.height = this.image.height; // sets the height
					this.offset.x = this.image.offset.x;
					this.offset.y = this.image.offset.y;
				}
			};
			Tile.prototype.draw = function (x, y) {
				// detects if the tile is a composition of different images
				if (this.image.constructor === Array) {
					// draws all the images if it is a composite
					for (var i = 0; i < this.image.length; i++) {
						if (this.image[i].width !== undefined) {
							this.image[i].draw(x, y);
						} else {
							this.image[i].load();
							println('composite tile image not loaded on start: forced load');
						}
					}
				} else {
					if (this.image.width !== undefined) {
						// draws the image
						this.image.draw(x, y);
					} else {
						this.image.load();
						println('tile image not loaded on start: forced load');
					}
				}
			}; // draws the tile
			Tile.prototype.collide = function (x1, y1, x2, y2, w, h) {
				var cols = {
					up: false,
					down: false,
					left: false,
					right: false
				};
				if (x2 + w > x1 && x2 + w < x1 + this.width / 3 && y2 + h > y1 && y2 < y1 + this.height) {
					// detects if something overlaps with the tile to the left
					cols.left = true;
				} else {
					cols.left = false;
				}
				if (x2 < x1 + this.width && x2 > x1 + this.width - this.width / 3 && y2 + h > y1 && y2 < y1 + this.height) {
					// detects if something overlaps with the tile to the right
					cols.right = true;
				} else {
					cols.right = false;
				}
				if (x2 + w > x1 && x2 < x1 + this.width && y2 + h > y1 && y2 + h < y1 + this.height / 3) {
					// detects if something overlaps with the top of the tile
					cols.up = true;
				} else {
					cols.up = false;
				}
				if (x2 + w > x1 && x2 < x1 + this.width && y2 < y1 + this.height && y2 > y1 + this.height - this.height / 3) {
					// detects if something overlaps with the bottom of the tile
					cols.down = true;
				} else {
					// if there are no collisions
					cols.down = false;
				}
				return cols;
			}; // detects if the tile is colliding
		} // tile constructor
		{
			var gui = {
				'a': new Tile('top', 'basic'),
				'b': new Tile('bottom', 'basic'),
				'c': new Tile('left', 'basic'),
				'd': new Tile('right', 'basic'),
				'e': new Tile('topLeft', 'basic'),
				'f': new Tile('topRight', 'basic'),
				'g': new Tile('bottomLeft', 'basic'),
				'h': new Tile('bottomRight', 'basic'),
				'j': new Tile('middle', 'basic'),
				'k': new Tile('slot', 'slot'),
				'l': new Tile('slotTop', 'slot'),
				'm': new Tile('slotBottom', 'slot'),
				'n': new Tile('slotLeft', 'slot'),
				'o': new Tile('slotRight', 'slot'),
				'p': new Tile('slotTopLeft', 'slot'),
				'q': new Tile('slotTopRight', 'slot'),
				'r': new Tile('slotBottomLeft', 'slot'),
				's': new Tile('slotBottomRight', 'slot'),
				't': new Tile('barLeft', 'bar'),
				'u': new Tile('barRight', 'bar'),
				'v': new Tile('barMiddle', 'bar'),
				'w': new Tile('characterIcon', 'character'),
				'y': new Tile('spellBookIcon', 'spellbook'),
				'z': new Tile('questLogIcon', 'questlog'),
				'A': new Tile('headSlot', 'head'),
				'B': new Tile('neckSlot', 'neck'),
				'C': new Tile('shoulderSlot', 'shoulders'),
				'D': new Tile('wristSlot', 'wrists'),
				'E': new Tile('handSlot', 'hands'),
				'F': new Tile('fingerSlot', 'finger'),
				'G': new Tile('waistSlot', 'waist'),
				'H': new Tile('legSlot', 'legs'),
				'I': new Tile('footSlot', 'feet'),
				'J': new Tile('mainHandSlot', 'mainhand'),
				'K': new Tile('offHandSlot', 'offhand'),
				'L': new Tile('emptyBagSlot', 'bagSlot'),
				'M': new Tile('chestSlot', 'chest'),
				'N': new Tile('xpBarLeft', 'xp'),
				'O': new Tile('xpBar', 'xp'),
				'P': new Tile('xpBarRight', 'xp'),
				'Q': new Tile('nextButton', 'next'),
				'R': new Tile('backButton', 'back'),
				'S': new Tile('gold', 'gold'),
				'T': new Tile('silver', 'silver'),
				'*': new Tile('acceptButton', 'accept'),
				'x': new Tile('closeButton', 'close')
			}; // stores all of the gui tiles
			var Gui = function (tilemap) {
				this.tilemap = tilemap;
				this.open = false;
				load.guis.push(this);
			};
			Gui.prototype.load = function () {
				this.width = this.tilemap[0].length * REAL_SIZE; // sets the width
				this.height = this.tilemap.length * REAL_SIZE; // sets the height
				this.tiles = []; // stores all of the tiles to later detect user interaction
				this.slots = [];

				this.p = createGraphics(this.width, this.height, JAVA2D);
				this.p.background(pal[' ']);
				this.p.noStroke();

				// loops through the tilemap
				for (var y = 0; y < this.tilemap.length; y++) {
					for (var x = 0; x < this.tilemap[y].length; x++) {
						var t = gui[this.tilemap[y][x]];
						var b = t.image;
						if (slots[this.tilemap[y][x]]) {
							this.slots.push({
								x: x * REAL_SIZE - b.offset.x,
								y: y * REAL_SIZE - b.offset.y
							});
						} // stores the coordinates of the slots
						this.tiles.push({
							tile: t,
							x: x * REAL_SIZE - b.offset.x,
							y: y * REAL_SIZE - b.offset.y
						}); // adds the tiles to the array to later detect user interaction
						if (b.p !== undefined) {
							// draws the image if it is defined
							this.p.image(b.p, x * REAL_SIZE - b.offset.x, y * REAL_SIZE - b.offset.y);
						} else {
							b.load();
							println('image called in gui: forced load');
						} // loads the image if it is undefined
					}
				}
				this.p = this.p.get(); // stores the entire gui as an image
			};
			Gui.prototype.draw = function (x, y) {
				// draws the gui
				if (this.p !== undefined) {
					image(this.p, x, y); // draws the gui image
					for (var i = 0; i < this.tiles.length; i++) {
						var t = this.tiles[i];
						if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								this.open = false;
							}
						} // detects if a close button is clicked
					} // loops through all of the tiles
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
		} // basic gui constructor
		{
			var Alert = function (tilemap) {
				Gui.call(this, tilemap, open);
			};
			Alert.prototype = Object.create(Gui.prototype);
			Alert.prototype.constructor = Alert;
			Alert.prototype.draw = function (x, y, text) {
				// draws the gui
				if (this.p !== undefined) {
					var temp = {
						x: 0,
						y: 0,
					};
					if (x + this.width <= width) {
						temp.x = x;
					} else if (x + this.width > width) {
						temp.x = x - this.width - REAL_SIZE;
					}
					if (y + this.height <= height) {
						temp.y = y;
					} else if (y + this.height > height) {
						temp.y = y - this.width + REAL_SIZE * 2;
					}

					image(this.p, temp.x, temp.y); // draws the gui image

					if (text !== undefined) {
						PixelText(text, temp.x + 4, temp.y + 4, GUI_TEXT_COLOR);
					}
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
			var createAlert = function (x, y, text, key) {
				alerts[key] = { x: x, y: y, text: text };
			};
			var removeAlert = function (key) {
				delete alerts[key];
			};
			var drawAlerts = function () {
				var tempKeys = Object.keys(alerts);
				for (var i = 0; i < tempKeys.length; i++) {
					var a = alerts[tempKeys[i]];
					Player['info'].draw(a.x, a.y, a.text);
					removeAlert(tempKeys[i]);
				}
			};
		} // alert gui constructor
		{
			var Popup = function (text, color, x, y, key) {
				this.text = text;
				this.color = color;
				this.key = key;
				this.x = x;
				this.yInitial = y;
				this.y = y;
				popups[this.key] = this;
			};
			Popup.prototype.draw = function () {
				this.y -= 0.5;
				PixelText(this.text, this.x, round(this.y / PIXEL_SIZE) * PIXEL_SIZE, this.color);
				if (this.y < this.yInitial - REAL_SIZE * 2) {
					this.remove();
				}
			};
			Popup.prototype.remove = function () {
				delete popups[this.key];
			};
		} // popup text constructor
		{
			var Bar = function (tilemap) {
				Gui.call(this, tilemap);
			};
			Bar.prototype = Object.create(Gui.prototype);
			Bar.prototype.constructor = Bar;
			Bar.prototype.draw = function (x, y) {
				var tempBagIndex = 1;
				var tempAbilityIndex = 1;
				image(this.p, x, y);
				for (var i = 0; i < this.tiles.length; i++) {
					var t = this.tiles[i];
					var hover = Hover(t.x + x, t.y + y, REAL_SIZE, REAL_SIZE);
					if (t.tile.type === 'character' && hover) {
						createAlert(t.x + x, t.y + y - REAL_SIZE, 'Click to view armor', 'charGui');
						if (mouseIsPressed && newClick) {
							if (!Player['actions']['guis']['characterPane']) {
								Player.closeGuis();
							}
							newClick = false;
							Player['actions']['guis']['characterPane'] = !Player['actions']['guis']['characterPane'];
						}
					} // detects if a character pane is clicked
					if (t.tile.type === 'questlog' && hover) {
						createAlert(t.x + x, t.y + y - REAL_SIZE, 'Click to view quests', 'questLogGui');
						if (mouseIsPressed && newClick) {
							if (!Player['actions']['guis']['questLog']) {
								Player.closeGuis();
							}
							newClick = false;
							Player['actions']['guis']['questLog'] = !Player['actions']['guis']['questLog'];
						}
					} // detects if a questlog is clicked
					if (t.tile.type === 'spellbook' && hover) {
						createAlert(t.x + x, t.y + y - REAL_SIZE, 'Click to view spells', 'spellBookGui');
						if (mouseIsPressed && newClick) {
							if (!Player['actions']['guis']['spellBook']) {
								Player.closeGuis();
							}
							newClick = false;
							Player['spellBookGui'].page = 0;
							Player['actions']['guis']['spellBook'] = !Player['actions']['guis']['spellBook'];
						}
					}
					if (t.tile.type === 'bagSlot') {
						if (Player['inventory']['bagSlots']['bag' + tempBagIndex] !== 'nothing') {
							items[Player['inventory']['bagSlots']['bag' + tempBagIndex]].draw(t.x + x, t.y + y);
							if (Hover(t.x + x, t.y + y, REAL_SIZE, REAL_SIZE)) {
								createAlert(t.x + x, t.y + y - REAL_SIZE, 'left click to open\nright click to dequip', 'bagInfo');
								if (mouseIsPressed && newClick) {
									newClick = false;
									if (mouseButton === LEFT) {
										Player['actions']['guis']['bag' + tempBagIndex] = !Player['actions']['guis']['bag' + tempBagIndex];
									} else {
										if (Object.keys(Player['inventory']['bags']['bag' + tempBagIndex]).length === 0) {
											if (Player.calcBagSpace() - items[Player['inventory']['bagSlots']['bag' + tempBagIndex]].slots > 0) {
												items[Player['inventory']['bagSlots']['bag' + tempBagIndex]].store();
												Player['inventory']['bagSlots']['bag' + tempBagIndex] = 'nothing';
											}
										}
									}
								}
							}
						}
						tempBagIndex++;
					}
					if (t.tile.type === 'slot') {
						if (Player['inventory']['abilityBar'][tempAbilityIndex] !== 'nothing') {
							abilities[Player['inventory']['abilityBar'][tempAbilityIndex]].draw(t.x + x, t.y + y);
							var cool = Player['actions']['cooldown'][tempAbilityIndex];
							rectMode(CORNERS);
							fill(0, 0, 0, 150);
							rect(t.x + x, t.y + y + REAL_SIZE, t.x + x + REAL_SIZE, (t.y + y) + round((REAL_SIZE / cool.max * cool.cur) / 2) * 2);
							rectMode(CORNER);
							if (hover) {
								var tempText = abilities[Player['inventory']['abilityBar'][tempAbilityIndex]].text;
								createAlert(t.x + x, t.y + y - REAL_SIZE, tempText, 'ability' + tempAbilityIndex);
							}
						}
						tempAbilityIndex++;
					}
					if (t.tile.type === 'gold') {
						PixelNumber(Number(Player['inventory']['gold']), t.x + x, t.y + y, 'h');
					}
					if (t.tile.type === 'silver') {
						PixelNumber(Number(Player['inventory']['silver']), t.x + x, t.y + y, 'h');
					}
				} // loops through all of the tiles
			};
		} // bar gui constructor
		{
			var CharacterPane = function (tilemap) {
				Gui.call(this, tilemap);
			};
			CharacterPane.prototype = Object.create(Gui.prototype);
			CharacterPane.prototype.constructor = CharacterPane;
			CharacterPane.prototype.draw = function (x, y) {
				image(this.p, x, y);
				for (var i = 0; i < this.tiles.length; i++) {
					var t = this.tiles[i];
					var hover = Hover(t.x + x, t.y + y, REAL_SIZE, REAL_SIZE);
					if (t.tile.type === 'close' && hover) {
						if (mouseIsPressed && newClick) {
							newClick = false;
							Player['actions']['guis']['characterPane'] = false;
						}
					} // detects if a close button is clicked
					var tempArmorSlot = Player['inventory']['equipment'][t.tile.type];
					if (tempArmorSlot !== 'nothing' && tempArmorSlot !== undefined) {
						items[Player['inventory']['equipment'][t.tile.type]].draw(t.x + x, t.y + y);
						if (hover) {
							createAlert(t.x + REAL_SIZE, t.y, items[Player['inventory']['equipment'][t.tile.type]].text + 'click to dequip', 'armor' + tempArmorSlot);
							if (mouseIsPressed && newClick) {
								newClick = false;
								if (items[Player['inventory']['equipment'][t.tile.type]].storable()) {
									items[Player['inventory']['equipment'][t.tile.type]].dequip();
								}
							}
						}
					}
				}
				image(images[Player['animation']['sprite']['down']].a[0], x + this.width / 2 - REAL_SIZE / 2, y + this.height / 2 - images[Player['animation']['sprite']['down']].height / 2); // draws the base frame as a static image
				var armorSlots = Object.keys(Player['animation']['armor']); // gets the names of all of the armor slots
				for (var j = 0; j < armorSlots.length; j++) { // loops through the armor
					var gearAnim = Player['animation']['armor'][armorSlots[j]]; // gets the value of the players armor
					if (gearAnim !== 'nothing') {
						gearAnim = images[gearAnim];
						image(images[gearAnim['down']].a[0], x + this.width / 2 - REAL_SIZE / 2, y + this.height / 2 - images[gearAnim['down']].height / 2); // draws the base frame as a static image
					}
				}
			};
			Player['characterPane'] = new CharacterPane([
				'eaax',
				'AjjE',
				'BjjF',
				'CjjG',
				'MjjH',
				'DJKI',]);
		} // character gui constructor
		{
			var HealthBar = function (tilemap) {
				Gui.call(this, tilemap);
			};
			HealthBar.prototype = Object.create(Gui.prototype);
			HealthBar.prototype.constructor = HealthBar;
			HealthBar.prototype.draw = function (x, y, curFortitude, fortitude, curEndurance, endurance, vitality, vigor, luck, strength, armor) {
				if (fortitude === undefined) {
					curFortitude = 0;
					fortitude = 0;
					curEndurance = 0;
					endurance = 0;
				}
				image(this.p, x, y);
				fill(pal[colors['fortitude']]);
				noStroke();
				rect(x + PIXEL_SIZE * 3, y + PIXEL_SIZE * 4, curFortitude / fortitude * (this.width - PIXEL_SIZE * 6), PIXEL_SIZE * 3);
				PixelNumber(floor(curFortitude), x + PIXEL_SIZE * 2, y + PIXEL_SIZE * 3.5, GUI_TEXT_COLOR);
				fill(pal[colors['endurance']]);
				rect(x + PIXEL_SIZE * 3, y + PIXEL_SIZE * 9, curEndurance / endurance * (this.width - PIXEL_SIZE * 6), PIXEL_SIZE * 3);
				PixelNumber(floor(curEndurance), x + PIXEL_SIZE * 2, y + PIXEL_SIZE * 8.5, GUI_TEXT_COLOR);
				if (Hover(x, y, this.width, this.height)) {
					var message = 'fortitude: ' + fortitude;
					message += '\nendurance: ' + endurance;
					message += '\nvitality: ' + vitality;
					message += '\nvigor: ' + vigor;
					message += '\nluck: ' + luck;
					message += '\nstrength: ' + strength;
					message += '\narmor: ' + armor;
					createAlert(x + REAL_SIZE, y, message, 'healthBarStats');
				}
			};
			Player['healthBar'] = new HealthBar(['tvu']);
		} // health bar constructor
		{
			var Bag = function (tilemap) {
				Gui.call(this, tilemap);
			};
			Bag.prototype = Object.create(Gui.prototype);
			Bag.prototype.constructor = Bag;
			Bag.prototype.draw = function (x, y, bagItems, index) {
				if (Player['actions']['guis'][index]) {
					// draws the gui
					if (this.p !== undefined) {
						image(this.p, x, y); // draws the gui image
						if (bagItems !== undefined) {
							var tempKeys = Object.keys(bagItems);
							for (var i = 0; i < tempKeys.length; i++) {
								var s = this.slots[i]; // assigns a slot to each bag value
								var temp = {
									x: s.x + x,
									y: s.y + y,
								}; // sets the x-coordinates of the slots
								temp.hov = Hover(temp.x, temp.y, REAL_SIZE, REAL_SIZE); // detects if the mouse is over the slot and item
								items[tempKeys[i]].draw(s.x + x, s.y + y); // draws the items
								PixelNumber(bagItems[tempKeys[i]], s.x + x, s.y + y, GUI_TEXT_COLOR);
								if (temp.hov) {
									createAlert(temp.x + REAL_SIZE, temp.y, items[tempKeys[i]].text, 'bag' + i + items[tempKeys[i]].text);
									if (mouseIsPressed && newClick) {
										newClick = false;
										if (mouseButton === 37) {
											if (items[tempKeys[i]].useable() && !Player['actions']['guis']['vendor']) {
												items[tempKeys[i]].use();
												if (bagItems[tempKeys[i]] > 1) {
													bagItems[tempKeys[i]]--;
												} else {
													delete bagItems[tempKeys[i]];
												}
											} else if (Player['actions']['guis']['vendor'] !== false) {
												Player['inventory']['silver'] += items[tempKeys[i]].sell;
												if (bagItems[tempKeys[i]] > 1) {
													bagItems[tempKeys[i]]--;
												} else {
													delete bagItems[tempKeys[i]];
												}
											}
										} else {
											for (var j = 49; j < 54; j++) {
												if (keys[j]) {
													if (Player['inventory']['bagSlots']['bag' + (j - 48)] !== 'nothing') {
														var tempName = tempKeys[i];
														var tempAmount = bagItems[tempKeys[i]];
														if (items[tempName].moveable('bag' + (j - 48))) {
															delete bagItems[tempKeys[i]];
															items[tempName].move('bag' + (j - 48), tempAmount);
														}
													}
												}
											}
										}
									}
								} // displays info about the items if they are hovered over
							} // loops through items in the bag
						} // detects if anything is in the bag
						for (var i = 0; i < this.tiles.length; i++) {
							var t = this.tiles[i];
							if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
								if (mouseIsPressed && newClick) {
									newClick = false;
									Player['actions']['guis'][index] = false;
								}
							} // detects if a close button is clicked
						}
					} else {
						println('gui not loaded on start: forced load');
						this.load();
					} // loads the gui if it is not loaded
				}
			};
		} // bag gui constructor
		{
			var LootBox = function (tilemap) {
				Gui.call(this, tilemap);
			};
			LootBox.prototype = Object.create(Gui.prototype);
			LootBox.prototype.constructor = LootBox;
			LootBox.prototype.draw = function (x, y, loot) {
				// draws the gui
				if (this.p !== undefined) {
					image(this.p, x, y); // draws the gui image
					for (var i = 0; i < this.tiles.length; i++) {
						var t = this.tiles[i];
						if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								if (loot.length > 1) {
									loot.shift();
								} else {
									Player['actions']['guis']['looting'] = false;
									Player['actions']['removeInteracting'] = false;
								}
							}
						} // detects if a close button is clicked
						if (t.tile.type === 'slot') {
							items[loot[0]].draw(t.x + x, t.y + y);
							if (Hover(t.x + x, t.y + y, 32, 32)) {
								createAlert(t.x + x + REAL_SIZE, t.y + y, items[loot[0]].text, 'loot');
								if (mouseIsPressed && newClick) {
									if (items[loot[0]].storable()) {
										items[loot[0]].store();
										if (loot.length > 1) {
											loot.shift();
										} else {
											Player['actions']['guis']['looting'] = false;
										}
									}
									newClick = false;
								}
							}
						}
					}
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
		} // loot box constructor
		{
			var QuestGui = function (tilemap) {
				Gui.call(this, tilemap);
			};
			QuestGui.prototype = Object.create(Gui.prototype);
			QuestGui.prototype.constructor = QuestGui;
			QuestGui.prototype.draw = function (x, y, quest) {
				quest = quests[quest];
				// draws the gui
				if (this.p !== undefined) {
					image(this.p, x, y); // draws the gui image
					if (quest.status === 'unaccepted') { // displays the quest objectives as well as the rewards
						quest.details.draw(x + REAL_SIZE, y + REAL_SIZE);
						var tempKeys = Object.keys(quest.rewards);
						if (tempKeys.length > 0) {
							PixelText('You will be rewarded with: ', x + REAL_SIZE, y + REAL_SIZE * 11.5, GUI_TEXT_COLOR);
							for (var i = tempKeys.length - 1; i >= 0; i--) {
								image(gui['k'].image.p, x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12);
								items[tempKeys[i]].draw(x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12);
								PixelNumber(quest.rewards[tempKeys[i]], x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12, GUI_TEXT_COLOR);
								if (Hover(x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12, REAL_SIZE, REAL_SIZE)) {
									createAlert(x + REAL_SIZE * (i + 2), y + REAL_SIZE * 12, items[tempKeys[i]].text, 'rewards' + i);
								}
							}
						}
					} else if (quest.status === 'accepted') { // displays the quest details while the quest is in progress
						var qText = ''; // sets the default starting phrase
						if (quest.type !== 'speak') {
							qText += 'Return once you have ';
							if (quest.type === 'gather') {
								qText += 'acquired ';
							} else if (quest.type === 'kill') {
								qText += 'slain ';
							} else {
								qText += 'activated ';
							} // sets the correct verb depending on quest type

							if (quest.amount > 1) {
								qText += quest.amount + ' ' + quest.object + 's.\n';
							} else {
								if (quest.object[0] === ('a' || 'e' || 'i' || 'o' || 'u')) {
									qText += 'an ';
								} else {
									qText += 'a ';
								}
								qText += quest.object + '.\n';
							} // sets the correct amount and name of the quest object
							qText += 'Then you shall receive your reward'; // sets the ending text
						} else {
							qText += 'Find and speak with ' + quest.completer;
						}
						PixelText(qText, x + REAL_SIZE, y + REAL_SIZE, GUI_TEXT_COLOR); // draws the text
					} else if (quest.status === 'complete') {
						quest.completion.draw(x + REAL_SIZE, y + REAL_SIZE);
						var tempKeys = Object.keys(quest.rewards);
						if (tempKeys.length > 0) {
							PixelText('You will be rewarded with: ', x + REAL_SIZE, y + REAL_SIZE * 11.5, GUI_TEXT_COLOR);
							for (var i = tempKeys.length - 1; i >= 0; i--) {
								image(gui['k'].image.p, x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12);
								items[tempKeys[i]].draw(x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12);
								PixelNumber(quest.rewards[tempKeys[i]], x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12, GUI_TEXT_COLOR);
								if (Hover(x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12, REAL_SIZE, REAL_SIZE)) {
									createAlert(x + REAL_SIZE * (i + 2), y + REAL_SIZE * 12, items[tempKeys[i]].text, 'rewards' + i);
								}
							}
						}
					}
					for (var i = 0; i < this.tiles.length; i++) {
						var t = this.tiles[i];
						if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								Player['actions']['guis']['quest'] = false;
							}
						} // detects if a close button is clicked
						if (t.tile.type === 'accept' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								if (quest.status === 'unaccepted' && Object.keys(Player['inventory']['quests']).length < 15) {
									quest.accept();
									if (quest.type === 'speak') {
										quest.status = 'complete';
									}
								} else if (quest.status === 'complete') {
									var tempKeys = Object.keys(quest.rewards);
									if (tempKeys.length === 0) {
										quest.turnIn();
									}
									for (var i = 0; i < tempKeys.length; i++) {
										if (!items[tempKeys[i]].storable()) {
											break;
										} else if (i === tempKeys.length - 1) {
											quest.turnIn();
										}
									}
								}
								Player['actions']['guis']['quest'] = false;
							}
						} // detects if a accept button is clicked
					}
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
		} // quest gui constructor
		{
			var QuestLogGui = function (tilemap) {
				Gui.call(this, tilemap);
			};
			QuestLogGui.prototype = Object.create(Gui.prototype);
			QuestLogGui.prototype.constructor = QuestLogGui;
			QuestLogGui.prototype.draw = function (x, y, quest) {
				quest = quests[quest];
				if (this.p !== undefined) {
					image(this.p, x, y); // draws the gui image
					var q = Object.keys(Player['inventory']['quests']);
					PixelText('Quests: ' + q.length + '/15', x + REAL_SIZE / 4, y + REAL_SIZE / 4, GUI_TEXT_COLOR);
					for (var i = 0; i < q.length; i++) {
						PixelText(q[i], x + REAL_SIZE / 4, y + REAL_SIZE * (i + 2) / 2, GUI_TEXT_COLOR);
						if (Hover(x + REAL_SIZE / 4, y + REAL_SIZE * (i + 2) / 2, REAL_SIZE * 4, REAL_SIZE / 2)) {
							var tempQuest = quests[q[i]];
							var message = q[i] + '\n';
							if (tempQuest.type === 'kill') {
								message += tempQuest.object + ' slain ' + Player['inventory']['quests'][q[i]] + '/' + tempQuest.amount;
							}
							if (tempQuest.type === 'gather') {
								message += tempQuest.object + ' ' + Player['inventory']['quests'][q[i]] + '/' + tempQuest.amount;
							}
							if (tempQuest.type === 'speak') {
								message += 'speak to ' + tempQuest.completer;
							}
							if (tempQuest.type === 'trigger') {
								message += 'activate ' + tempQuest.object + ' ' + Player['inventory']['quests'][q[i]] + '/' + tempQuest.amount;
							}
							message += '\nClick to view details';
							createAlert(x + this.width, y + REAL_SIZE * (i + 2) / 2, message, 'questAlert' + i);
							if (mouseIsPressed && newClick) {
								Player['actions']['guis']['questDetails'] = q[i];
								newClick = false;
								Player['actions']['guis']['questLog'] = false;
							}
						}
					}
					for (var i = 0; i < this.tiles.length; i++) {
						var t = this.tiles[i];
						if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								Player['actions']['guis']['questLog'] = false;
							}
						} // detects if a close button is clicked
					}
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
		} // quest log gui constructor
		{
			var QuestDetailsGui = function (tilemap) {
				Gui.call(this, tilemap);
			};
			QuestDetailsGui.prototype = Object.create(Gui.prototype);
			QuestDetailsGui.prototype.constructor = QuestGui;
			QuestDetailsGui.prototype.draw = function (x, y, quest) {
				quest = quests[quest];
				// draws the gui
				if (this.p !== undefined) {
					image(this.p, x, y); // draws the gui image
					quest.details.draw(x + REAL_SIZE, y + REAL_SIZE);
					var tempKeys = Object.keys(quest.rewards);
					if (tempKeys.length > 0) {
						PixelText('You will be rewarded with: ', x + REAL_SIZE, y + REAL_SIZE * 11.5, GUI_TEXT_COLOR);
						for (var i = tempKeys.length - 1; i >= 0; i--) {
							image(gui['k'].image.p, x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12);
							items[tempKeys[i]].draw(x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12);
							PixelNumber(quest.rewards[tempKeys[i]], x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12, GUI_TEXT_COLOR);
							if (Hover(x + REAL_SIZE * (i + 1), y + REAL_SIZE * 12, REAL_SIZE, REAL_SIZE)) {
								createAlert(x + REAL_SIZE * (i + 2), y + REAL_SIZE * 12, items[tempKeys[i]].text, 'rewards' + i);
							}
						}
					}
					for (var i = 0; i < this.tiles.length; i++) {
						var t = this.tiles[i];
						if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								Player['actions']['guis']['questDetails'] = false;
								Player['actions']['guis']['questLog'] = true;
							}
						} // detects if a close button is clicked
					}
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
		} // quest details gui constructor
		{
			var SpellBookGui = function (tilemap) {
				Gui.call(this, tilemap);
				this.page = 0;
			};
			SpellBookGui.prototype = Object.create(Gui.prototype);
			SpellBookGui.prototype.constructor = SpellBookGui;
			SpellBookGui.prototype.draw = function (x, y) {
				var tempAbilityIndex = 0 + this.page * this.slots.length;
				if (this.p !== undefined) {
					image(this.p, x, y); // draws the gui image
					for (var i = 0; i < this.tiles.length; i++) {
						var t = this.tiles[i];
						if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								this.page = 0;
								Player['actions']['guis']['spellBook'] = false;
							}
						} // detects if a close button is clicked
						if (t.tile.type === 'slot') {
							var tempKeys = Object.keys(Player['inventory']['abilities']);
							if (tempKeys[tempAbilityIndex] !== undefined) {
								var a = abilities[tempKeys[tempAbilityIndex]];
								a.draw(t.x + x, t.y + y);
								if (Hover(t.x + x, t.y + y, REAL_SIZE, REAL_SIZE)) {
									createAlert(t.x + x + REAL_SIZE, t.y + y, a.text + '\nPress keys 1-5\nto assign', 'abilityInfo' + tempAbilityIndex);
									var actionKeys = testKeys();
									if (actionKeys !== false) {
										a.equip(actionKeys - 48);
									}
								}
							}
							tempAbilityIndex++;
						}
						if (t.tile.type === 'next') {
							if (Hover(t.x + x, t.y + y, REAL_SIZE, REAL_SIZE) && mouseIsPressed && newClick) {
								newClick = false;
								this.page++;
							}
						}
						if (t.tile.type === 'back' && this.page > 0) {
							if (Hover(t.x + x, t.y + y, REAL_SIZE, REAL_SIZE) && mouseIsPressed && newClick) {
								newClick = false;
								this.page--;
							}
						}
					}
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
		} // spell book gui constructor
		{
			var VendorGui = function (tilemap) {
				Gui.call(this, tilemap);
			};
			VendorGui.prototype = Object.create(Gui.prototype);
			VendorGui.prototype.constructor = VendorGui;
			VendorGui.prototype.draw = function (x, y, vendor) {
				vendor = vendor.entity;
				// draws the gui
				if (this.p !== undefined) {
					image(this.p, x, y); // draws the gui image
					var tempIndex = 0;
					for (var i = 0; i < this.tiles.length; i++) {
						var t = this.tiles[i];
						if (t.tile.type === 'close' && Hover(t.x + x, t.y + y, 32, 32)) {
							if (mouseIsPressed && newClick) {
								newClick = false;
								Player['actions']['guis']['vendor'] = false;
							}
						} // detects if a close button is clicked
						if (t.tile.type === 'slot') {
							if (tempIndex < vendor.sells.length) {
								var item = items[vendor.sells[tempIndex]];
								if (Hover(t.x + x, t.y + y, 32, 32)) {
									createAlert(t.x + x + REAL_SIZE, t.y + y, item.text, 'vendorInfo' + tempIndex);
									if (mouseIsPressed && newClick) {
										newClick = false;
										if (item.storable()) {
											if (Player['inventory']['silver'] + 100 * Player['inventory']['gold'] >= item.buy) {
												item.store();
												Player['inventory']['silver'] -= item.buy;
											}
										}
									}
								}
								item.draw(t.x + x, t.y + y);
								tempIndex++;
							}
						}
					}
				} else {
					println('gui not loaded on start: forced load');
					this.load();
				} // loads the gui if it is not loaded
			};
		} // vendor gui constructor
		{
			var XpBar = function (tilemap) {
				Gui.call(this, tilemap);
			};
			XpBar.prototype = Object.create(Gui.prototype);
			XpBar.prototype.constructor = XpBar;
			XpBar.prototype.draw = function (x, y) {
				image(this.p, x, y);
				noStroke();
				fill(pal[colors['xp']]);

				var tempWidth = this.width - PIXEL_SIZE * 4;
				tempWidth = tempWidth * (Player['stats']['xp'] / Player['stats']['nextLevel']);
				tempWidth = round(tempWidth / PIXEL_SIZE) * PIXEL_SIZE;

				rect(x + PIXEL_SIZE * 2, y + REAL_SIZE - PIXEL_SIZE * 4, tempWidth, PIXEL_SIZE * 2);


				if (Hover(x, y, this.width, this.height)) {
					createAlert(x, y - REAL_SIZE * 2, Player['stats']['level'] + '\n' + Player['stats']['xp'] + '/' + Player['stats']['nextLevel'], 'xp');
				}
			};
		} // xp bar constructor
		{
			var Enemy = function (image, name, minLevel, maxLevel, minDamage, maxDamage, speed, endurance, fortitude, luck, strength, armor, vitality, vigor, loot, aggressive, special) {
				this.image = image;
				this.name = name;
				this.maxLevel = maxLevel;
				this.minLevel = minLevel;
				this.maxDamage = maxDamage;
				this.minDamage = minDamage;
				this.speed = speed;
				this.loot = loot;

				this.cooldown = FRAME_RATE;
				this.aggressive = aggressive;
				this.curCooldown = FRAME_RATE;
				this.endurance = endurance;
				this.fortitude = fortitude;
				this.luck = luck;
				this.strength = strength;
				this.armor = armor;
				this.vitality = vitality;
				this.vigor = vigor;

				this.curFortitude = this.fortitude; // current health
				this.curEndurance = this.endurance; // current energy

				this.special = special;
				if (this.special === undefined) {
					this.special = false;
				}

				entities['enemy'][this.name] = this;
			};
			Enemy.prototype.draw = function (x, y) {
				images[this.image].draw(x, y);
			};
			Enemy.prototype.reset = function () {
				this.curCooldown = this.cooldown; // sets the current cooldown to max
				this.curFortitude = this.fortitude; // sets the current health to max
				this.curEndurance = this.endurance; // sets the current energy to max
			};
			Enemy.prototype.genLoot = function () {
				this.lootKeys = Object.keys(this.loot); // gets the name of each loot item
				var loot = [];
				for (var i = 0; i < this.lootKeys.length; i++) {
					var randomNum = round(random(0, 100)); // picks a random number between 1-100
					if (randomNum <= this.loot[this.lootKeys[i]]) {
						loot.push(this.lootKeys[i]);
					} // if the random number is less than the loot chance add the name to the loot array
				}
				return loot; // returns the loot array
			};
			Enemy.prototype.fight = function (entity) {
				Player['healthBar'].draw(width - Player['healthBar'].width, 0, this.curFortitude, this.fortitude, this.curEndurance, this.endurance, this.vitality, this.vigor, this.luck, this.strength, this.armor); // draws the enemies health bar
				this.curCooldown -= 1 / this.speed; // increments the enemies cooldown

				if (this.curEndurance < this.endurance) {
					this.curEndurance += (this.vigor + 50) / 1000;
				} else if (this.curEndurance > this.endurance) {
					this.curEndurance = this.vigor;
				} // increments the enemies energy
				if (this.curFortitude < this.fortitude) {
					this.curFortitude += (this.vitality) / 1000;
				} else if (this.curFortitude > this.fortitude) {
					this.curFortitude = this.fortitude
				}
				if (this.curCooldown <= 0 && this.curEndurance >= 20) {
					if (round(random(1, 3)) === 3 && this.special !== false && this.curEndurance >= 30) {
						buffs[this.special].give();
						this.curEndurance -= 30; // subtracts energy
					} else {
						var damage = calcDamage(this.luck, this.strength, Player['stats']['armor'], entity.level, Player['stats']['level'], this.minDamage, this.maxDamage);
						new Popup(String(damage), GUI_TEXT_COLOR, Player['loc']['x'], Player['loc']['y'], 'enemyDamage');
						if (Player['stats']['curFortitude'] - damage >= 0) {
							Player['stats']['curFortitude'] -= damage;
						} else {
							Player['stats']['curFortitude'] = 0;
						} // subtracts the damage from the player's health
						this.curEndurance -= 20; // subtracts energy
					} // when cooldown is zero and there is enough energy attack the player
					this.curCooldown = this.cooldown; // reset the cooldown
				}
				var actionKeys = testKeys();
				if (actionKeys !== false && !Player['actions']['guis']['spellBook']) {
					if (Player['inventory']['abilityBar'][actionKeys - 48] !== 'nothing') {
						var a = abilities[Player['inventory']['abilityBar'][actionKeys - 48]]; // stores which ability is being used
						var cooldown = Player['actions']['cooldown'][actionKeys - 48]; // stores the corresponding cooldown
						if (cooldown['cur'] === cooldown['max'] && Player['stats']['curEndurance'] >= a.cost) {
							if (a.type === 'damage') {
								Player['stats']['curEndurance'] -= a.cost; // take away the player's energy
								var damage = calcDamage(Player['stats']['luck'], Player['stats']['strength'], this.armor, Player['stats']['level'], entity.level, a.min, a.max, Player['stats']['weapon damage']);
								new Popup(String(damage), GUI_TEXT_COLOR, entity.x, entity.y, 'playerDamage');
								if (this.curFortitude - damage >= 0) {
									this.curFortitude -= damage;
								} else {
									this.curFortitude = 0;
								} // subtract the damage from the enemy's health
								a.animation.reset(); // resets the animation before drawing it
								World['animations'].push({
									animation: a.animation,
									x: entity.x,
									y: entity.y - a.animation.height
								}); // adds an animation to the world animation list
							} // if the ability is a damage ability
							if (a.type === 'buff') {
								buffs[a.min].give();
								a.animation.reset(); // resets the animation before drawing it
								World['animations'].push({
									animation: a.animation,
									x: Player['loc']['x'],
									y: Player['loc']['x'] - a.animation.height
								}); // adds an animation to the world animation list
							}
							cooldown['change'] = 1; // start the cooldown
							if (this.curFortitude === 0) {
								World['animations'].push({
									animation: images['death animation'],
									x: entity.x,
									y: entity.y
								}); // adds an animation to the world animation list
								entity.alive = false; // set the entity to dead so that it doesn't appear on the map
								var q = Object.keys(Player['inventory']['quests']);
								for (var i = 0; i < q.length; i++) {
									if (this.name === quests[q[i]].object && Player['inventory']['quests'][q[i]] < quests[q[i]].amount) {
										Player['inventory']['quests'][q[i]]++;
										if (Player['inventory']['quests'][q[i]] === quests[q[i]].amount) {
											quests[q[i]].status = 'complete';
										}
									}
								}
								var xpGen = round(entity.level * 5 + random(0, entity.level * 4));
								Player['stats']['xp'] += xpGen; // gives the player xp
								new Popup(xpGen + ' xp', GUI_TEXT_COLOR, entity.x, entity.y, 'killXp');
								Player['actions']['fighting'] = false; // set the fighting variable to false
								Player['actions']['guis']['looting'] = this.genLoot(); // set the looting variable to a loot array
								this.reset(); // reset the health, energy, and cooldowns of the enemy
							} // if the enemy has no health
						} // if the cooldown is full and the player has enough energy
					} // if there is an ability in the slot
				} // if a player's ability is used
			};
		} // enemy constructors
		{
			var Npc = function (name, type, animationSet, equipment, sells) {
				this.name = name;
				this.type = type;
				this.animationSet = animationSet;
				this.equipment = equipment;
				this.sells = sells;
				load.npcs.push(this);
				entities[this.type][this.name] = this;
			};
			Npc.prototype.load = function () {
				this.width = images[images[this.animationSet].down].width; // sets the width of the image
				this.height = images[images[this.animationSet].down].height; // sets the height of the image
				this.p = createGraphics(this.width, this.height, JAVA2D); // creates the graphics
				this.p.background(pal[' ']);
				this.p.noStroke();
				this.p.image(images[images[this.animationSet]['down']]['a'][0]);
				var tempKeys = Object.keys(this.equipment);
				for (var i = 0; i < tempKeys.length; i++) {
					var anim = images[images[items[this.equipment[tempKeys[i]]].animationSet].down].a[0];
					this.p.image(anim);
				}
				this.image = this.name;
				images[this.name] = {
					p: this.p.get(),
					offset: {
						x: images[images[this.animationSet].down].offset.x, // sets the x-offset to align images
						y: images[images[this.animationSet].down].offset.y // sets the y-offset to align images
					},
					name: this.name
				};
				images[this.name].draw = function (x, y) {
					image(images[this.name].p, x, y);
				};
				// gets the canvas and exports it as an image
			};
		} // npc constructors
		{
			var Item = function (name, image, buy, sell) {
				this.name = name;
				this.text = name;
				this.image = image;
				this.buy = buy;
				this.sell = sell;
				items[this.name] = this;
			};
			Item.prototype.draw = function (x, y) {
				images[this.image].draw(x, y);
			};
			Item.prototype.store = function () {
				for (var i = 1; i < 6; i++) {
					if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
						var bag = items[Player['inventory']['bagSlots']['bag' + i]];
						var amount = Object.keys(Player['inventory']['bags']['bag' + i]).length;
						if (Player['inventory']['bags']['bag' + i][this.name] !== undefined) {
							Player['inventory']['bags']['bag' + i][this.name]++;
							break;
						} else if (bag.slots > amount) {
							Player['inventory']['bags']['bag' + i][this.name] = 1;
							break;
						}
					}
				}
				var questKeys = Object.keys(Player['inventory']['quests']);
				for (var i = 0; i < questKeys.length; i++) {
					var q = questKeys[i];
					if (this.name === quests[q].object) {
						Player['inventory']['quests'][questKeys[i]]++;
					}
					if (Player['inventory']['quests'][questKeys[i]] >= quests[q].amount) {
						quests[q].status = 'complete';
					}
				}
			};
			Item.prototype.useable = function () {
				return false;
			};
			Item.prototype.moveable = function (destination) {
				var tempSlots = Object.keys(Player['inventory']['bags'][destination]).length;
				var availableSlots = items[Player['inventory']['bagSlots'][destination]].slots - tempSlots;
				if (Player['inventory']['bags'][destination][this.name] !== undefined || availableSlots > 0) {
					return true;
				} else {
					return false;
				}
			}
			Item.prototype.move = function (destination, amount) {
				var tempSlots = Object.keys(Player['inventory']['bags'][destination]).length;
				var availableSlots = items[Player['inventory']['bagSlots'][destination]].slots - tempSlots;
				if (Player['inventory']['bags'][destination][this.name] !== undefined) {
					Player['inventory']['bags'][destination][this.name] += amount;
				} else if (availableSlots > 0) {
					Player['inventory']['bags'][destination][this.name] = amount;
				}
			};
			Item.prototype.storable = function () {
				if (Player.calcBagSpace() > 0) {
					return true;
				} else {
					for (var i = 1; i < 6; i++) {
						if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
							if (Player['inventory']['bags']['bag' + i][this.name] !== undefined) {
								return true;
							}
						}
					}
					return false;
				}
			};
			Item.prototype.remove = function (amount) {
				for (var i = 1; i < 6; i++) {
					if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
						if (Player['inventory']['bags']['bag' + i][this.name] !== undefined) {
							Player['inventory']['bags']['bag' + i][this.name] -= amount;
							if (Player['inventory']['bags']['bag' + i][this.name] <= 0) {
								delete Player['inventory']['bags']['bag' + i][this.name];
							}
							break;
						}
					}
				}
			};
		} // item constructors
		{
			var Food = function (name, image, buy, sell, health) {
				Item.call(this, name, image, buy, sell);
				this.text = this.name + '\n\nRestores ' + health + ' health\nCannot be used in\ncombat\n\nclick to use';
				this.health = health;
			};
			Food.prototype = Object.create(Item.prototype);
			Food.prototype.constructor = Food;
			Food.prototype.use = function () {
				if (Player['stats']['curFortitude'] < Player['stats']['fortitude']) {
					Player['stats']['curFortitude'] += this.health;
				}
			};
			Food.prototype.useable = function () {
				if (!Player['actions']['fighting']) {
					return true;
				}
			};
		} // food constructors
		{
			var Drink = function (name, image, buy, sell, energy) {
				Item.call(this, name, image, buy, sell);
				this.text = this.name + '\n\nRestores ' + energy + ' energy\nCannot be used in\ncombat\n\nclick to use';
				this.energy = energy;
			};
			Drink.prototype = Object.create(Item.prototype);
			Drink.prototype.constructor = Drink;
			Drink.prototype.use = function () {
				if (Player['stats']['curEndurance'] < Player['stats']['endurance']) {
					Player['stats']['curEndurance'] += this.energy;
				}
			};
			Drink.prototype.useable = function () {
				if (!Player['actions']['fighting']) {
					return true;
				}
			};
		} // drink constructors
		{
			var Consumable = function (name, image, buy, sell, buff) {
				Item.call(this, name, image, buy, sell);
				this.text = this.name + '\n\nGives you ' + buff + '\nCannot be used in\ncombat\n\nclick to use';
				this.buff = buff;
			};
			Consumable.prototype = Object.create(Item.prototype);
			Consumable.prototype.constructor = Consumable;
			Consumable.prototype.use = function () {
				buffs[this.buff].give();
			};
			Consumable.prototype.useable = function () {
				if (!Player['actions']['fighting']) {
					return true;
				}
			};
		} // consumable constructors
		{
			var Armor = function (name, image, buy, sell, slot, animationSet, stats) {
				Item.call(this, name, image, buy, sell);

				this.text = this.name + '\n' + slot + '\n';
				this.stats = stats;
				this.animationSet = animationSet;
				this.statKeys = Object.keys(stats);
				for (var i = 0; i < this.statKeys.length; i++) {
					this.text += this.statKeys[i] + ' ' + this.stats[this.statKeys[i]] + '\n';
				}
				this.slot = slot;
			};
			Armor.prototype = Object.create(Item.prototype);
			Armor.prototype.constructor = Armor;
			Armor.prototype.use = function () {
				if (Player['inventory']['equipment'][this.slot] === 'nothing') {
					Player['inventory']['equipment'][this.slot] = this.name;
					if (Player['animation']['armor'][this.slot] !== undefined) {
						Player['animation']['armor'][this.slot] = this.animationSet;
					}
				} else {
					var temp = Player['inventory']['equipment'][this.slot];
					if (items[temp].storable()) {
						items[temp].dequip();
						Player['inventory']['equipment'][this.slot] = this.name;
						if (Player['animation']['armor'][this.slot] !== undefined) {
							Player['animation']['armor'][this.slot] = this.animationSet;
						}
					}
				}
				for (var i = 0; i < this.statKeys.length; i++) {
					var tempStat = this.stats[this.statKeys[i]];
					Player['stats'][this.statKeys[i]] += tempStat;
				}
			};
			Armor.prototype.dequip = function () {
				Player['inventory']['equipment'][this.slot] = 'nothing';
				for (var i = 0; i < this.statKeys.length; i++) {
					var tempStat = this.stats[this.statKeys[i]];
					Player['stats'][this.statKeys[i]] -= tempStat;
					Player['animation']['armor'][this.slot] = 'nothing';
				}
				this.store();
			};
			Armor.prototype.useable = function () {
				if (!Player['actions']['fighting']) {
					return true;
				}
			};
		} // armor constructors
		{
			var Rune = function (name, image, buy, sell, teaches) {
				Item.call(this, name, image, buy, sell);
				this.text = this.name + '\n\nTeaches you ' + teaches;
				this.teaches = teaches;
			};
			Rune.prototype = Object.create(Item.prototype);
			Rune.prototype.constructor = Rune;
			Rune.prototype.use = function () {
				abilities[this.teaches].learn();
			};
			Rune.prototype.useable = function () {
				if (Player['inventory']['abilities'][this.teaches] !== true) {
					return true;
				}
			};
		} // rune constructors
		{
			var bag8 = new Bag([
				'eaax',
				'nkko',
				'rmms'
			]);
			var bag2 = new Bag([
				'ex',
				'rs'
			]);
			var BagItem = function (name, image, buy, sell, slots) {
				Item.call(this, name, image, buy, sell);
				this.slots = slots;
				this.text = this.name + '\n' + this.slots + ' slot bag';
				if (this.slots === 8) {
					this.bag = bag8;
				} else if (this.slots === 2) {
					this.bag = bag2;
				}
			};
			BagItem.prototype = Object.create(Item.prototype);
			BagItem.prototype.constructor = BagItem;
			BagItem.prototype.use = function () {
				for (var i = 1; i < 6; i++) {
					if (Player['inventory']['bagSlots']['bag' + i] === 'nothing') {
						Player['inventory']['bagSlots']['bag' + i] = this.name;
						break;
					}
				}
			};
			BagItem.prototype.useable = function () {
				for (var i = 1; i < 6; i++) {
					if (Player['inventory']['bagSlots']['bag' + i] === 'nothing') {
						return true;
					} else if (i === 5) {
						return false;
					}
				}
			};
		} // bag constructors
		{
			var Interacting = function (name, image, type, action, persistant) {
				this.name = name;
				this.image = image;
				this.type = type;
				this.action = action;
				this.persistant = persistant;
				if (this.persistant === undefined) {
					this.persistant = true;
				}
				if (this.type === 'trigger') {
					this.quests = [];
				}
				entities['interacting'][this.name] = this;
			};
			Interacting.prototype.draw = function (x, y) {
				images[this.image].draw(x, y);
			};
			Interacting.prototype.genLoot = function () {
				this.lootKeys = Object.keys(this.action); // gets the name of each loot item
				var loot = [];
				for (var i = 0; i < this.lootKeys.length; i++) {
					var randomNum = round(random(0, 100)); // picks a random number between 1-100
					if (randomNum <= this.action[this.lootKeys[i]]) {
						loot.push(this.lootKeys[i]);
					} // if the random number is less than the loot chance add the name to the loot array
				}
				return loot; // returns the loot array
			};
			Interacting.prototype.use = function () {
				if (this.type === 'loot') {
					Player['actions']['guis']['looting'] = this.genLoot();
				} else if (this.type === 'trigger') {
					for (var i = 0; i < this.quests.length; i++) {
						if (Player['inventory']['quests'][this.quests[i]] !== undefined) {
							Player['inventory']['quests'][this.quests[i]]++;
						}
					}
				}
			};
		} // interacting constructors
		{
			var Quest = function (name, giver, completer, requires, rewards, xp, money, type, object, amount, details, completion) {
				this.name = name;
				this.giver = giver;
				this.completer = completer;
				this.requires = requires;
				this.rewards = rewards;
				this.xp = xp;
				this.money = money;
				this.type = type;
				this.object = object;
				this.amount = amount;
				this.details = details;
				this.completion = completion;
				this.status = "unaccepted";
				quests[this.name] = this;
				load.quests.push(this);
				if (entities['quest'][this.giver].gives === undefined) {
					entities['quest'][this.giver].gives = [];
				}
				if (entities['quest'][this.completer].completes === undefined) {
					entities['quest'][this.completer].completes = [];
				}
				entities['quest'][this.giver].gives.push(this.name);
				entities['quest'][this.completer].completes.push(this.name);
				if (this.type === 'trigger') {
					entities['interacting'][this.object].quests.push(this.name);
				}
			};
			Quest.prototype.load = function () {
				this.details = this.details.replace(/%/g, Player['name']);
				for (var i = 0; i < this.details.length; i++) {
					if (i % 40 === 0 && i !== 0) {
						var j = 0;
						while (this.details[i + j] !== ' ' && this.details.length > i + j) {
							j++;
						}
						this.details = this.details.slice(0, i + j) + '\n' + this.details.slice(i + j + 1, this.details.length);
					}
				}
				this.details = new Text(this.details, 1, GUI_TEXT_COLOR);

				this.completion = this.completion.replace(/%/g, Player['name']);
				for (var i = 0; i < this.completion.length; i++) {
					if (i % 40 === 0 && i !== 0) {
						var j = 0;
						while (this.completion[i + j] !== ' ' && this.completion.length > i + j) {
							j++;
						}
						this.completion = this.completion.slice(0, i + j) + '\n' + this.completion.slice(i + j + 1, this.completion.length);
					}
				}
				this.completion = new Text(this.completion, 1, GUI_TEXT_COLOR);
			}
			Quest.prototype.accept = function () {
				this.status = "accepted";
				for (var i = 1; i < 6; i++) {
					if (Player['inventory']['bagSlots']['bag' + i] !== 'nothing') {
						if (Player['inventory']['bags']['bag' + i][this.object] !== undefined) {
							Player['inventory']['quests'][this.name] = Player['inventory']['bags']['bag' + i][this.object];
							if (Player['inventory']['bags']['bag' + i][this.object] >= this.amount) {
								this.status = 'complete';
							}
							break;
						} else {
							Player['inventory']['quests'][this.name] = 0;
							break;
						}
					}
				}
			};
			Quest.prototype.turnIn = function () {
				this.status = "turnedIn";
				var tempKeys = Object.keys(this.rewards);
				var tempItems = [];
				for (var i = 0; i < tempKeys.length; i++) {
					for (var j = 0; j < this.rewards[tempKeys[i]]; j++) {
						if (items[tempKeys[i]].storable()) {
							items[tempKeys[i]].store();
						}
					}
				}
				Player['inventory']['silver'] += this.money;
				Player['stats']['xp'] += this.xp;
				if (this.type === 'gather') {
					items[this.object].remove(this.amount);
				}
				delete Player['inventory']['quests'][this.name];
				Player['actions']['completedQuests'].push(this.name);
			};
			var QuestGiverCheck = function (name, open) {
				var entity = entities['quest'][name];
				if (entity.completes !== undefined) {
					for (var i = 0; i < entity.completes.length; i++) {
						var q = entity.completes[i];
						q = quests[q];
						if (!Player['actions']['completedQuests'].includes(q.name)) {
							if (q.status !== 'unaccepted') {
								if (open) {
									Player.closeGuis();
									Player['actions']['guis']['quest'] = q.name;
								} else {
									if (q.status === 'complete') {
										return 'complete';
									} else {
										return 'incomplete'
									}
								}
							}
						}
					}
				}
				if (entity.gives !== undefined) {
					for (var i = 0; i < entity.gives.length; i++) {
						var q = entity.gives[i];
						q = quests[q];
						if (q.requires === 'nothing') {
							if (!Player['actions']['completedQuests'].includes(q.name)) {
								if (q.status === 'unaccepted') {
									if (open) {
										Player.closeGuis();
										Player['actions']['guis']['quest'] = q.name;
									} else {
										return 'available';
									}
								}
							}
						} else {
							if (Player['actions']['completedQuests'].includes(q.requires)) {
								if (q.status === 'unaccepted') {
									if (open) {
										Player.closeGuis();
										Player['actions']['guis']['quest'] = q.name;
									} else {
										return 'available';
									}
								}
							}
						}
					}
				}
			};
		} // quest constructors
		{
			var Ability = function (name, type, image, animation, min, max, cost, cooldown) {
				this.name = name;
				this.type = type;
				this.image = image;
				this.animation = animations[animation];
				this.min = min;
				this.max = max;
				this.cost = cost;
				this.cooldown = cooldown;
				this.text = name + '\ncosts ' + this.cost + ' endurance\n';
				abilities[this.name] = this;
				if (this.type === 'damage') {
					this.text += 'does ' + this.min + '-' + this.max + ' damage';
				} else if (this.type === 'buff') {
					this.text += 'empowers you with\n' + this.min;
				}
			};
			Ability.prototype.draw = function (x, y) {
				images[this.image].draw(x, y);
			};
			Ability.prototype.learn = function () {
				Player['inventory']['abilities'][this.name] = true;
			};
			Ability.prototype.equip = function (slot) {
				for (var i = 1; i < 6; i++) {
					if (Player['inventory']['abilityBar'][i] === this.name) {
						return;
					}
				}
				Player['inventory']['abilityBar'][slot] = this.name;
				Player['actions']['cooldown'][slot]['max'] = (this.cooldown * FRAME_RATE);
				Player['actions']['cooldown'][slot]['cur'] = (this.cooldown * FRAME_RATE);
			};
		} // ability constructors
		{
			var Interior = function (x, y, z, ix, iy, dimension, spawnX, spawnY, exitX, exitY, map, entities) {
				this.x = x;
				this.y = y;
				this.z = z;
				this.ix = ix;
				this.iy = iy;
				this.dimension = dimension;
				this.exitX = exitX;
				this.exitY = exitY;
				this.spawnX = spawnX;
				this.spawnY = spawnY;
				this.map = map;
				this.entities = entities;
				if (entities === undefined) {
					this.entities = {
						enemy: [],
						interacting: [],
						quest: [],
						vendor: [],
						portal: []
					};
				} // if the entities variable is undefined, fill it with empty arrays
				load.interiors.push(this);
			};
			Interior.prototype.load = function () {
				this.width = this.map[0].length * REAL_SIZE; // sets the map width
				this.height = this.map.length * REAL_SIZE;  // sets the map height
				this.tiles = []; // stores the tiles
				this.storedEntities = []; // stores the entities
				this.p = createGraphics(this.width, this.height, JAVA2D); // creates an image
				this.t = createGraphics(this.width, this.height, JAVA2D);
				this.p.background(pal[' ']); // sets the background
				this.t.background(pal[' ']);
				this.p.noStroke();
				this.t.noStroke();
				this.animations = [];
				// loops through the map array
				for (var y = 0; y < this.map.length; y++) {
					for (var x = 0; x < this.map[y].length; x++) {
						var b = tiles[this.map[y][x]];
						var exit = false;
						if (this.exitX === x && this.exitY === y) {
							exit = true;
						}
						this.tiles.push({
							tile: b,
							x: x * REAL_SIZE,
							y: y * REAL_SIZE,
							interior: 'nothing',
							exit: exit
						}); // pushes the different tile types to the tiles array
						if (b.image.constructor === Array) {
							for (var i = 0; i < b.image.length; i++) {
								if (b.image[i].width !== undefined) {
									if (b.image[i].constructor !== Animation) {
										this.p.image(b.image[i].p, x * REAL_SIZE - b.image[i].offset.x, y * REAL_SIZE - b.image[i].offset.y);
										if (b.image[i].height > REAL_SIZE) {
											this.t.image(b.image[i].top, x * REAL_SIZE - b.image[i].offset.x, y * REAL_SIZE - b.image[i].offset.y);
										}
									} else {
										this.animations.push({
											tile: b.image[i],
											x: x * REAL_SIZE - b.image[i].offset.x,
											y: y * REAL_SIZE - b.image[i].offset.y
										});
									}
								} else {
									b.image[i].load();
									println('composite image not loaded in map function: forced load');
								}
							}
						} else {
							if (b.image.p !== undefined) {
								if (b.image.constructor !== Animation) {
									this.p.image(b.image.p, x * REAL_SIZE - b.image.offset.x, y * REAL_SIZE - b.image.offset.y);
									if (b.image.height > REAL_SIZE) {
										this.t.image(b.image.top, x * REAL_SIZE - b.image.offset.x, y * REAL_SIZE - b.image.offset.y);
									}
								} else {
									this.animations.push({
										tile: b.image,
										x: x * REAL_SIZE,
										y: y * REAL_SIZE
									});
								}
							} else {
								b.image.load();
								println('image not loaded in map function: forced load');
							}
						}
					}
				}
				var entityKeys = Object.keys(this.entities);
				for (var i = 0; i < entityKeys.length; i++) {
					for (var j = 0; j < this.entities[entityKeys[i]].length; j++) {
						var b = this.entities[entityKeys[i]][j];
						var e = entities[entityKeys[i]][b['name']];
						this.storedEntities.push({
							name: b['name'],
							entity: e,
							image: images[e.image],
							x: b.x * REAL_SIZE,
							y: b.y * REAL_SIZE,
							type: entityKeys[i],
							level: round(random(e.minLevel, e.maxLevel)),
							alive: true
						});
					}
				}
				this.p = this.p.get();
				this.t = this.t.get();
				World.interiors.push(this);
			};
			Interior.prototype.reset = function () {
				for (var i = 0; i < this.storedEntities.length; i++) {
					var e = this.storedEntities[i];
					if (e.entity.persistant !== false) {
						e.alive = true;
						if (e.type === 'enemy') {
							e.level = round(random(e.entity.minLevel, e.entity.maxLevel));
						}
					}
				}
			};
			var Screen = function (x, y, z, dimension, map, entities) {
				this.x = x;
				this.y = y;
				this.z = z;
				this.dimension = dimension;
				this.map = map;
				this.entities = entities;
				if (entities === undefined) {
					this.entities = {
						enemy: [],
						interacting: [],
						quest: [],
						vendor: [],
						portal: []
					};
				} // if the entities variable is undefined, fill it with empty arrays
				load.screens.push(this);
			}; // the map constructor function
			Screen.prototype.load = function () {
				this.width = this.map[0].length * REAL_SIZE; // sets the map width
				this.height = this.map.length * REAL_SIZE;  // sets the map height
				this.tiles = []; // stores the tiles
				this.storedEntities = []; // stores the entities
				this.animations = []; // stores the animations
				if (World.maps[this.dimension] === undefined) {
					World.maps[this.dimension] = [];
				}
				if (World.maps[this.dimension][this.x] === undefined) {
					World.maps[this.dimension][this.x] = [];
				} // creates a new x array if it is not defined
				if (World.maps[this.dimension][this.x][this.y] === undefined) {
					World.maps[this.dimension][this.x][this.y] = [];
				} // creates a new y array if it is not defined
				this.p = createGraphics(this.width, this.height, JAVA2D); // creates an image
				this.t = createGraphics(this.width, this.height, JAVA2D);
				this.p.background(pal[' ']); // sets the background
				this.t.background(pal[' ']);
				this.p.noStroke();
				this.t.noStroke();
				// loops through the map array
				for (var y = 0; y < this.map.length; y++) {
					for (var x = 0; x < this.map[y].length; x++) {
						var b = tiles[this.map[y][x]];
						var interior = 'nothing';
						for (var i = 0; i < World.interiors.length; i++) {
							var inter = World.interiors[i];
							if (inter.x === this.x && inter.y === this.y && inter.z === this.z && inter.ix === x && inter.iy === y && inter.dimension === this.dimension) {
								interior = inter;
								break;
							}
						}
						this.tiles.push({
							tile: b,
							x: x * REAL_SIZE,
							y: y * REAL_SIZE,
							interior: interior
						}); // pushes the different tile types to the tiles array
						if (b.image.constructor === Array) {
							for (var i = 0; i < b.image.length; i++) {
								if (b.image[i].width !== undefined) {
									if (b.image[i].constructor !== Animation) {
										this.p.image(b.image[i].p, x * REAL_SIZE - b.image[i].offset.x, y * REAL_SIZE - b.image[i].offset.y);
										if (b.image[i].height > REAL_SIZE) {
											this.t.image(b.image[i].top, x * REAL_SIZE - b.image[i].offset.x, y * REAL_SIZE - b.image[i].offset.y);
										}
										if (b.image[i].width > REAL_SIZE) {
											this.t.image(b.image[i].side, x * REAL_SIZE - b.image[i].offset.x, y * REAL_SIZE - b.image[i].offset.y);
										}
									} else {
										this.animations.push({
											tile: b.image[i],
											x: x * REAL_SIZE - b.image[i].offset.x,
											y: y * REAL_SIZE - b.image[i].offset.y
										});
									}
								} else {
									b.image[i].load();
									println('composite image not loaded in map function: forced load');
								}
							}
						} else {
							if (b.image.p !== undefined) {
								if (b.image.constructor !== Animation) {
									this.p.image(b.image.p, x * REAL_SIZE - b.image.offset.x, y * REAL_SIZE - b.image.offset.y);
									if (b.image.height > REAL_SIZE) {
										this.t.image(b.image.top, x * REAL_SIZE - b.image.offset.x, y * REAL_SIZE - b.image.offset.y);
									}
									if (b.image.width > REAL_SIZE) {
										this.t.image(b.image.side, x * REAL_SIZE - b.image.offset.x, y * REAL_SIZE - b.image.offset.y);
									}
								} else {
									this.animations.push({
										tile: b.image,
										x: x * REAL_SIZE,
										y: y * REAL_SIZE
									});
								}
							} else {
								b.image.load();
								println('image not loaded in map function: forced load');
							}
						}
					}
				}
				var entityKeys = Object.keys(this.entities);
				for (var i = 0; i < entityKeys.length; i++) {
					for (var j = 0; j < this.entities[entityKeys[i]].length; j++) {
						var b = this.entities[entityKeys[i]][j];
						var e = entities[entityKeys[i]][b['name']];
						this.storedEntities.push({
							name: b['name'],
							entity: e,
							image: images[e.image],
							x: b.x * REAL_SIZE,
							y: b.y * REAL_SIZE,
							type: entityKeys[i],
							level: round(random(e.minLevel, e.maxLevel)),
							alive: true
						});
					}
				}
				this.p = this.p.get();
				this.t = this.t.get();
				World.maps[this.dimension][this.x][this.y][this.z] = this;

				if (Player['loc']['dimension'][this.dimension] === undefined) {
					Player['loc']['dimension'][this.dimension] = {
						'x': dimensions[this.dimension].x,
						'y': dimensions[this.dimension].y,
						'sx': dimensions[this.dimension].sx,
						'sy': dimensions[this.dimension].sy,
						'sz': dimensions[this.dimension].sz,
						'wx': dimensions[this.dimension].x,
						'wy': dimensions[this.dimension].y,
						'sub': false
					};
				}
			};
			Screen.prototype.reset = function () {
				for (var i = 0; i < this.storedEntities.length; i++) {
					var e = this.storedEntities[i];
					if (e.entity.persistant !== false) {
						e.alive = true;
						if (e.type === 'enemy') {
							e.level = round(random(e.entity.minLevel, e.entity.maxLevel));
						}
					}
				}
			};
			World.draw = function (x, y, z, dimension) {
				var selMap = World.maps[dimension][x][y][z];
				if (Player['loc']['sub'] !== false) {
					selMap = Player['loc']['sub'];
				}
				image(selMap.p, Player['loc']['transition']['x'], Player['loc']['transition']['y']);
				if (World.maps[dimension][x - 1] !== undefined && Player['loc']['shifting'] === 'left') {
					if (World.maps[dimension][x - 1][y] !== undefined) {
						if (World.maps[dimension][x - 1][y][z] !== undefined) {
							image(World.maps[dimension][x - 1][y][z].p, Player['loc']['transition']['x'] - selMap.p.width, 0);
							for (var i = 0; i < World.maps[dimension][x - 1][y][z].storedEntities.length; i++) {
								var e = World.maps[dimension][x - 1][y][z].storedEntities[i];
								if (e.alive) {
									image(e.image.p, e.x + Player['loc']['transition']['x'] - selMap.p.width - e.image.offset.x, e.y - e.image.offset.y);
								}
							}
							for (var i = 0; i < World.maps[dimension][x - 1][y][z].animations.length; i++) {
								var a = World.maps[x - 1][y][z].animations[i];
								a.tile.draw(a.x + Player['loc']['transition']['x'] - selMap.p.width, a.y);
							}
						}
					}
				}
				if (World.maps[dimension][x + 1] !== undefined && Player['loc']['shifting'] === 'right') {
					if (World.maps[dimension][x + 1][y] !== undefined) {
						if (World.maps[dimension][x + 1][y][z] !== undefined) {
							image(World.maps[dimension][x + 1][y][z].p, Player['loc']['transition']['x'] + selMap.p.width, 0);
							for (var i = 0; i < World.maps[dimension][x + 1][y][z].storedEntities.length; i++) {
								var e = World.maps[dimension][x + 1][y][z].storedEntities[i];
								if (e.alive) {
									image(e.image.p, e.x + Player['loc']['transition']['x'] + selMap.p.width - e.image.offset.x, e.y - e.image.offset.y);
								}
							}
							for (var i = 0; i < World.maps[dimension][x + 1][y][z].animations.length; i++) {
								var a = World.maps[dimension][x + 1][y][z].animations[i];
								a.tile.draw(a.x + Player['loc']['transition']['x'] + selMap.p.width, a.y);
							}
						}
					}
				}
				if (World.maps[dimension][x] !== undefined && Player['loc']['shifting'] === 'up') {
					if (World.maps[dimension][x][y - 1] !== undefined) {
						if (World.maps[dimension][x][y - 1][z] !== undefined) {
							image(World.maps[dimension][x][y - 1][z].p, 0, Player['loc']['transition']['y'] - selMap.p.height);
							for (var i = 0; i < World.maps[dimension][x][y - 1][z].storedEntities.length; i++) {
								var e = World.maps[dimension][x][y - 1][z].storedEntities[i];
								if (e.alive) {
									image(e.image.p, e.x - e.image.offset.x, e.y + Player['loc']['transition']['y'] - selMap.p.height - e.image.offset.y);
								}
							}
							for (var i = 0; i < World.maps[dimension][x][y - 1][z].animations.length; i++) {
								var a = World.maps[dimension][x][y - 1][z].animations[i];
								a.tile.draw(a.x, a.y + Player['loc']['transition']['y'] - selMap.p.height);
							}
						}
					}
				}
				if (World.maps[dimension][x] !== undefined && Player['loc']['shifting'] === 'down') {
					if (World.maps[dimension][x][y + 1] !== undefined) {
						if (World.maps[dimension][x][y + 1][z] !== undefined) {
							image(World.maps[dimension][x][y + 1][z].p, 0, Player['loc']['transition']['y'] + selMap.p.height);
							for (var i = 0; i < World.maps[dimension][x][y + 1][z].storedEntities.length; i++) {
								var e = World.maps[dimension][x][y + 1][z].storedEntities[i];
								if (e.alive) {
									image(e.image.p, e.x, e.y + Player['loc']['transition']['y'] + selMap.p.height);
								}
							}
							for (var i = 0; i < World.maps[dimension][x][y + 1][z].animations.length; i++) {
								var a = World.maps[dimension][x][y + 1][z].animations[i];
								a.tile.draw(a.x, a.y + Player['loc']['transition']['y'] + selMap.p.height);
							}
						}
					}
				}
				for (var i = 0; i < selMap.tiles.length; i++) {
					var tile = selMap.tiles[i];
					var calc = tile.tile.collide(tile.x - tile.tile.offset.x, tile.y - tile.tile.offset.y, Player['colBox']['x'], Player['colBox']['y'], Player['colBox']['xSize'], Player['colBox']['ySize']);
					var distance = dist(tile.x + REAL_SIZE / 2, tile.y + REAL_SIZE / 2, Player['colBox']['x'] + Player['colBox']['xSize'] / 2, Player['colBox']['y'] + Player['colBox']['ySize'] / 2);

					if (Hover(tile.x, tile.y, REAL_SIZE, REAL_SIZE)) {
						if (tile.interior !== 'nothing') {
							createAlert(tile.x + REAL_SIZE, tile.y, 'Click to enter', 'tile' + i);
							if (mouseIsPressed && newClick && !Player['actions']['fighting']) {
								newClick = false;
								if (distance < 64) {
									World.transition.run('enter', i);
								} else {
									new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'entranceDistance');
								}
							}
						}
						if (tile.exit) {
							createAlert(tile.x + REAL_SIZE, tile.y, 'Click to exit', 'tile' + i);
							if (mouseIsPressed && newClick && !Player['actions']['fighting']) {
								newClick = false;
								if (distance < 64) {
									World.transition.run('exit');
								} else {
									new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'exitDistance');
								}
							}
						}
						if (tile.tile.type === 'up') {
							createAlert(tile.x + REAL_SIZE, tile.y, 'Click to ascend', 'tile' + i);
							if (mouseIsPressed && newClick && !Player['actions']['fighting']) {
								newClick = false;
								if (distance < 64) {
									World.maps[Player['loc']['current dimension']][Player['loc']['scene']['x']][Player['loc']['scene']['y']][Player['loc']['scene']['z'] + 1].reset();
									Player['loc']['scene']['z']++;
								} else {
									new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'exitDistance');
								}
							}
						}
						if (tile.tile.type === 'down') {
							createAlert(tile.x + REAL_SIZE, tile.y, 'Click to descend', 'tile' + i);
							if (mouseIsPressed && newClick && !Player['actions']['fighting']) {
								newClick = false;
								if (distance < 64) {
									World.maps[Player['loc']['current dimension']][Player['loc']['scene']['x']][Player['loc']['scene']['y']][Player['loc']['scene']['z'] - 1].reset();
									Player['loc']['scene']['z']--;
								} else {
									new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'exitDistance');
								}
							}
						}
					}
					if (collisionBoxes && tile.tile.type === 'solid') {
						strokeWeight(2);
						noFill();
						stroke(255, 255, 0);
						rect(tile.x, tile.y, REAL_SIZE, REAL_SIZE);
					}
					if (!Player['loc']['shifting']) {
						if (calc.up) {
							if (tile.tile.type === 'solid') {
								Player['loc']['y'] += -Player['stats']['speed'];
							}
						}
						if (calc.down) {
							if (tile.tile.type === 'solid') {
								Player['loc']['y'] += Player['stats']['speed'];
							}
						}
						if (calc.left) {
							if (tile.tile.type === 'solid') {
								Player['loc']['x'] += -Player['stats']['speed'];
							}
						}
						if (calc.right) {
							if (tile.tile.type === 'solid') {
								Player['loc']['x'] += Player['stats']['speed'];
							}
						}
					}
				}
				for (var i = 0; i < selMap.animations.length; i++) {
					selMap.animations[i].tile.draw(selMap.animations[i].x + Player['loc']['transition']['x'], selMap.animations[i].y + Player['loc']['transition']['y']);
				}
				if (collisionBoxes) {
					strokeWeight(2);
					noFill();
					stroke(255, 0, 0);
					rect(Player['colBox']['x'], Player['colBox']['y'], Player['colBox']['xSize'], Player['colBox']['ySize']);
				}
				for (var i = 0; i < World['animations'].length; i++) {
					var a = World['animations'][i];
					a.animation.draw(a.x, a.y);
					if (a.animation.frame >= a.animation.a.length - 2) {
						World['animations'].splice(i, 1);
						a.animation.frame = 0;
					}
				}
				World.transition.value += World.transition.change;
				if (World.transition.value < 0) {
					World.transition.value = 0;
					World.transition.change = 0;
					Player['loc']['fade'] = false;
				}
				if (World.transition.value > 255) {
					World.transition.change = -World.transition.change;
					if (World.transition.destination !== undefined) {
						World.transition.destination();
					}
				}
			};
			World.topDraw = function (x, y, z, dimension) {
				var selMap = World.maps[dimension][x][y][z];
				if (Player['loc']['sub'] !== false) {
					selMap = Player['loc']['sub'];
				}
				if (World.maps[dimension][x - 1] !== undefined && Player['loc']['shifting'] === 'left') {
					if (World.maps[dimension][x - 1][y] !== undefined) {
						if (World.maps[dimension][x - 1][y][z] !== undefined) {
							image(World.maps[dimension][x - 1][y][z].t, Player['loc']['transition']['x'] - selMap.p.width, 0);
						}
					}
				}
				if (World.maps[dimension][x + 1] !== undefined && Player['loc']['shifting'] === 'right') {
					if (World.maps[dimension][x + 1][y] !== undefined) {
						if (World.maps[dimension][x + 1][y][z] !== undefined) {
							image(World.maps[dimension][x + 1][y][z].t, Player['loc']['transition']['x'] + selMap.p.width, 0);
						}
					}
				}
				if (World.maps[dimension][x] !== undefined && Player['loc']['shifting'] === 'up') {
					if (World.maps[dimension][x][y - 1] !== undefined) {
						if (World.maps[dimension][x][y - 1][z] !== undefined) {
							image(World.maps[dimension][x][y - 1][z].t, 0, Player['loc']['transition']['y'] - selMap.p.height);
						}
					}
				}
				if (World.maps[dimension][x] !== undefined && Player['loc']['shifting'] === 'down') {
					if (World.maps[dimension][x][y + 1] !== undefined) {
						if (World.maps[dimension][x][y + 1][z] !== undefined) {
							image(World.maps[dimension][x][y + 1][z].t, 0, Player['loc']['transition']['y'] + selMap.p.height);
						}
					}
				}

				for (var i = 0; i < selMap.storedEntities.length; i++) {
					var e = selMap.storedEntities[i];
					stroke(255, 0, 0);
					strokeWeight(2);
					noStroke();
					if (e.alive) {
						if (e.image.draw)
							e.image.draw(e.x + Player['loc']['transition']['x'], e.y + Player['loc']['transition']['y'] - e.image.offset.y);
						//detects if the player is in range of the entity
						var distance = dist(e.x + REAL_SIZE / 2, e.y + REAL_SIZE / 2, Player['colBox']['x'] + Player['colBox']['xSize'] / 2, Player['colBox']['y'] + Player['colBox']['ySize'] / 2);
						if (e.type === 'enemy') {
							if (entities[e.type][e.name].aggressive && distance < 64 && !Player['loc']['shifting']) {
								Player['actions']['fighting'] = e;
							}
							if (Hover(e.x, e.y, REAL_SIZE, REAL_SIZE)) {
								createAlert(e.x + REAL_SIZE, e.y, e.name + '\nlevel ' + e.level, 'enemy' + i);
								if (mouseIsPressed && newClick) {
									newClick = false;
									if (distance < 64) {
										Player['actions']['fighting'] = e;
									} else {
										new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'enemyDistance');
									}
								}
							}
						}
						if (e.type === 'quest') {
							if (QuestGiverCheck(e.name, false) === 'complete') {
								images['question mark'].draw(e.x + Player['loc']['transition']['x'], e.y + Player['loc']['transition']['y'] - REAL_SIZE * 3 / 2);
							} else if (QuestGiverCheck(e.name, false) === 'available') {
								images['exclamation point'].draw(e.x + Player['loc']['transition']['x'], e.y + Player['loc']['transition']['y'] - REAL_SIZE * 3 / 2);
							} else if (QuestGiverCheck(e.name, false) === 'incomplete') {
								images['gray question mark'].draw(e.x + Player['loc']['transition']['x'], e.y + Player['loc']['transition']['y'] - REAL_SIZE * 3 / 2);
							}
							if (Hover(e.x, e.y, REAL_SIZE, REAL_SIZE)) {
								createAlert(e.x + REAL_SIZE, e.y, e.name + '\n', 'quest' + i);
								if (mouseIsPressed && newClick) {
									newClick = false;
									if (distance < 64) {
										QuestGiverCheck(e.name, true);
									} else {
										new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'questDistance');
									}
								}
							}
						}
						if (e.type === 'vendor') {
							if (Hover(e.x, e.y, REAL_SIZE, REAL_SIZE)) {
								createAlert(e.x + REAL_SIZE, e.y, e.name, 'vendor' + i);
								if (mouseIsPressed && newClick) {
									newClick = false;
									if (distance < 64) {
										Player.closeGuis();
										Player['actions']['guis']['vendor'] = e;
									} else {
										new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'vendorDistance');
									}
								}
							}
						}
						if (e.type === 'interacting') {
							if (Hover(e.x, e.y, REAL_SIZE, REAL_SIZE)) {
								createAlert(e.x + REAL_SIZE, e.y, e.name, 'interacting' + i);
								if (mouseIsPressed && newClick) {
									newClick = false;
									if (distance < 64) {
										if (e.entity.type === 'trigger') {
											for (var i = 0; i < e.entity.quests.length; i++) {
												if (Player['inventory']['quests'][e.entity.quests[i]] !== undefined) {
													e.entity.use();
													e.alive = false;
													if (!e.entity.persistant) {
														if (Player['loc']['sub'] !== false) {
															Player['actions']['used'].push([
																selMap.x,
																selMap.y,
																selMap.z,
																selMap.ix,
																selMap.iy,
																e.x / REAL_SIZE,
																e.y / REAL_SIZE,
																Player['loc']['current dimension']]);
														} else {
															Player['actions']['used'].push([
																selMap.x,
																selMap.y,
																selMap.z,
																e.x / REAL_SIZE,
																e.y / REAL_SIZE,
																Player['loc']['current dimension']]);
														}
													}
												}
											}
										} else {
											e.entity.use();
											Player['actions']['removeInteracting'] = i;
											if (!e.entity.persistant) {
												if (Player['loc']['sub'] !== false) {
													Player['actions']['used'].push([
														selMap.x,
														selMap.y,
														selMap.z,
														selMap.ix,
														selMap.iy,
														e.x / REAL_SIZE,
														e.y / REAL_SIZE,
														Player['loc']['current dimension']]);
												} else {
													Player['actions']['used'].push([
														selMap.x,
														selMap.y,
														selMap.z,
														e.x / REAL_SIZE,
														e.y / REAL_SIZE,
														Player['loc']['current dimension']]);
												}
											}
										}
									} else {
										new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'interactingDistance');
									}
								}
							}
						}
						if (e.type === 'portal') {
							if (Hover(e.x, e.y, REAL_SIZE, REAL_SIZE)) {
								createAlert(e.x + REAL_SIZE, e.y, 'click to warp to ' + e.entity.dimension, 'portal' + i);
								if (mouseIsPressed && newClick) {
									newClick = false;
									if (distance < 64) {
										World.transition.run('warp', e.entity.dimension);
									} else {
										new Popup('I need to get closer', GUI_TEXT_COLOR, Player['loc']['x'] - REAL_SIZE, Player['loc']['y'], 'enemyDistance');
									}
								}
							}
						}
					}
				}
				if (Player['actions']['removeInteracting'] !== false && !Player['actions']['guis']['looting']) {
					selMap.storedEntities[Player['actions']['removeInteracting']].alive = false;
					Player['actions']['removeInteracting'] = false;
				}
				for (var i = 0; i < selMap.storedEntities.length; i++) {
					var e = selMap.storedEntities[i];
					if (Hover(e.x, e.y, REAL_SIZE, REAL_SIZE)) {
						if (e.alive) {
							Player['actions']['hover'][e.type] = true;
							break;
						}
					} else if (i === selMap.storedEntities.length - 1) {
						Player['actions']['hover']['enemy'] = false;
						Player['actions']['hover']['quest'] = false;
						Player['actions']['hover']['vendor'] = false;
						Player['actions']['hover']['interacting'] = false;
					}
				}
				image(selMap.t, Player['loc']['transition']['x'], Player['loc']['transition']['y']);
			}
			World.transition.run = function (type, value) {
				Player['loc']['fade'] = true;
				World.transition.change = 10;
				if (type === 'enter') {
					World.transition.destination = function () {
						var tile = World.maps[Player['loc']['current dimension']][Player['loc']['scene']['x']][Player['loc']['scene']['y']][Player['loc']['scene']['z']].tiles[value];
						tile.interior.reset();
						Player['loc']['sub'] = tile.interior;
						Player['loc']['wx'] = Player['loc']['x'];
						Player['loc']['wy'] = Player['loc']['y'];
						Player['loc']['x'] = tile.interior.spawnX * REAL_SIZE;
						Player['loc']['y'] = tile.interior.spawnY * REAL_SIZE;
					};
				} else if (type === 'exit') {
					World.transition.destination = function () {
						Player['loc']['sub'] = false;
						Player['loc']['x'] = Player['loc']['wx'];
						Player['loc']['y'] = Player['loc']['wy'];
					};
				} else if (type === 'warp') {
					World.transition.destination = function () {
						dimensions[value].warp();
					};
				}
			};
		} // map constructors
		{
			var Dimension = function (name, sx, sy, sz, x, y) {
				this.name = name;
				this.sx = sx;
				this.sy = sy;
				this.sz = sz;
				this.x = x;
				this.y = y;
				dimensions[this.name] = this;
			};
			Dimension.prototype.warp = function () {
				var d = Player['loc']['dimension'][Player['loc']['current dimension']];
				d.sx = Player['loc']['scene']['x'];
				d.sy = Player['loc']['scene']['y'];
				d.sz = Player['loc']['scene']['z'];
				d.x = Player['loc']['x'];
				d.y = Player['loc']['y'];
				d.wx = Player['loc']['wx'];
				d.wy = Player['loc']['wy'];
				d.sub = Player['loc']['sub'];
				d = Player['loc']['dimension'][this.name];
				Player['loc']['scene']['x'] = d.sx;
				Player['loc']['scene']['y'] = d.sy;
				Player['loc']['scene']['z'] = d.sz;
				Player['loc']['x'] = d.x;
				Player['loc']['y'] = d.y;
				Player['loc']['wx'] = d.wx;
				Player['loc']['wy'] = d.wy;
				Player['loc']['sub'] = d.sub;
				Player['loc']['current dimension'] = this.name;
			};
		} // dimension constructor
		{
			var Portal = function (name, image, dimension) {
				this.name = name;
				this.image = image;
				this.dimension = dimension;
				entities['portal'][this.name] = this;
			};
		} // portal constructor
		{
			var Buff = function (name, image, stat, amount, duration) {
				this.name = name;
				this.image = image;
				this.stat = stat;
				this.amount = amount;
				this.duration = duration;
				buffs[this.name] = this;
			};
			Buff.prototype.give = function () {
				if (Player['buffs'][this.name] === undefined) {
					Player['stats'][this.stat] += this.amount;
				}
				Player['buffs'][this.name] = this.duration * FRAME_RATE;
			};
			Buff.prototype.remove = function () {
				Player['stats'][this.stat] -= this.amount;
				delete Player['buffs'][this.name];
			};
			Buff.prototype.draw = function (x, y, buffTime) {
				images[this.image].draw(x, y);
				if (Hover(x, y, REAL_SIZE, REAL_SIZE)) {
					var message = this.name + '\n';
					if (this.stat === 'curFortitude') {
						message += 'health';
					} else if (this.stat === 'curEndurance') {
						message += 'energy';
					} else {
						message += this.stat;
					}
					if (this.amount < 0) {
						message += ' decreased\nby ';
					} else {
						message += ' increased\nby ';
					}
					message += abs(this.amount) + '\n' + floor(buffTime / FRAME_RATE) + 's remaining';
					createAlert(x + REAL_SIZE, y, message, this.name + 'Buff');
				}
			};
		} // buff constructors

		/*                     _       
			/\                | |      
		   /  \   ___ ___  ___| |_ ___ 
		  / /\ \ / __/ __|/ _ \ __/ __|
		 / ____ \\__ \__ \  __/ |_\__ \
		/_/    \_\___/___/\___|\__|___/                            
		*/

		{
			new Image([
				'GIHFGGIHGGHIFHIG',
				'IHHFGIHFGGHIGFHG',
				'HHFGIHHGIGHHIFHG',
				'HFGGIHFGIGFHIGFG',
				'FIGGHHFHHIGHHGGI',
				'GHIGHFGHHIGFHGIH',
				'GHIGHFHGHHGGFGIH',
				'GFHIFGHGFHGIGGHH',
				'GFHHGHFIGFGHGIHF',
				'GGFHHFIHGGIHGHFI',
				'IGFHHGIHGIHHFHFH',
				'IGGFGIHFGIHFGFGH',
				'HGGGGHHFIHHFIGGH',
				'HGGIGHHGHHFGHIGF',
				'HGIHGHFGHFGGHIGF',
				'FIHHGFGGFGIGHHIG'], pal, 2, 'grass');
			new Image([
				'LONLMMONMMNOLNOM',
				'ONNLMONLMMNOMLNM',
				'NNLMONNMOMNNOLNM',
				'NLMMONLMOMLNOMLM',
				'LOMMNNLNNONNNMMO',
				'MNOMNLMNNOMLNMON',
				'MNOMNLNMNNMMLMON',
				'MLNOLMNMLNMOMMNN',
				'MLNNMNLOMLMNMONL',
				'MMLNNLONMMONMNLO',
				'OMLNNMONMONNLNLN',
				'OMMLMONLMONLMLMN',
				'NMMMMNNLONNLOMMN',
				'NMMOMNNMNNLMNOML',
				'NMONMNLMNLMMNOML',
				'MONNMLMMLMOMNNOM'], pal, 2, 'otherworld grass');
			new Image([
				'                ',
				'       bbb      ',
				'     bbccdb     ',
				'    bcddcdb     ',
				'    _bdcdddb    ',
				'   _aabccdca    ',
				'   _aabbccba    ',
				'  _aababbbbba   ',
				'  _aaaabbbbba   ',
				'  _``aaababbba  ',
				'  _```aabbbbba  ',
				'   __``aabbaaa  ',
				'     _```a___   ',
				'      ____      ',
				'                ',
				'                '], pal, 2, 'rock');
			new Image([
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj',
				'jjjjjjjjjjjjjjjj'], pal, 2, 'void');
			new Image([
				'                ',
				'      EEEE      ',
				'     EGGGGE     ',
				'    EFHIIHGE    ',
				'    DFIIIIGD    ',
				'   DGFHFIHHFE   ',
				'   DHGFFHFHFD   ',
				'   DHHGGFGFGD   ',
				'  DEGEEHGEGHED  ',
				'  DFEFEGEFEEFD  ',
				'  DGFGFEFGFGGD  ',
				' DDGGFGFGFGGFDD ',
				' CDFGDGGFGDGDEC ',
				' CEDFDFDFGDFDEC ',
				' CFEDEDEDFDDECC ',
				' CCFEFEFEDEEFCC ',
				' CCFECEFFEFCECC ',
				'  CDCECEECECCC  ',
				'   CCDCECDCCC   ',
				'    „CCCCCC„    ',
				'  CCC……†………CCC  ',
				' CCCC„†…††„CCCC ',
				'  CCCC„……„CCCC  ',
				'    CCCCCCCC    '], pal, 2, 'treeA');
			new Image([
				'       DD       ',
				'       DD       ',
				'      DEFD      ',
				'      DFFD      ',
				'     DFFEFD     ',
				'    DEEFFEED    ',
				'   CEDDEEDEEC   ',
				'    CDDDCDDC    ',
				'     CCCDDC     ',
				'    DDCCCCDD    ',
				'   DEDDDDDEFD   ',
				'  DEFFEEEEFFED  ',
				'   CDEFEFFCDC   ',
				'    CDEDDDDC    ',
				'   DDCDCDCCCD   ',
				'  DEEDCCCCDEFD  ',
				' DEFEEDEDEFFEDD ',
				' CDCFFFEFFEEDCC ',
				'  CCDEEFFEDDCC  ',
				'  CCCDDCCDCCCC  ',
				' CCCCC‡ˆˆ‡CCCCC ',
				' CCCCC‡‰ˆ‡CCCCC ',
				'  CCCCC‡‡CCCCC  ',
				'    CCCCCCCC    '], pal, 2, 'pine tree');
			new Image([
				'                ',
				'                ',
				'            ;   ',
				'        PQQ A;  ',
				'         PPP    ',
				'        QPPOP   ',
				'        PPO O   ',
				'       DOO      ',
				'        D       ',
				'        C       ',
				'    DDD  D      ',
				'   DCCED C      ',
				'   C  CED       ',
				'       CD       ',
				'       C        ',
				'                '], pal, 2, 'purple flower a');
			new Image([
				'                ',
				'                ',
				' ;              ',
				';A QQP          ',
				'  PPP           ',
				' POPPQ     QQ Q ',
				' O OPP    OPPPP ',
				'    OOD  D OPPO ',
				'      CDD   OPA;',
				'       C   OP ; ',
				'        D       ',
				'     DD E DD    ',
				'    DEECDDCCD   ',
				'    DCC  C  C   ',
				'    C    C      ',
				'                '], pal, 2, 'purple flower b');
			new Image([
				'                ',
				'      EEEE      ',
				'    EEGGGGEE    ',
				'   EGGHIHHGGE   ',
				'  EGFHIIIIHFGE  ',
				'  DEGFHIHHFGEE  ',
				' DFEGGFHFFGEFFD ',
				' DEFEEGFEGEFFDD ',
				' DEFDFEGEEFDFED ',
				' CDEDFDEFDFDDDD ',
				' CCDEDEDDEDEECD ',
				'  CCDEDEDDEDDC  ',
				'  CCCDCDDCDCCC  ',
				' CCCCCCCCCCCCCC ',
				'  CCCCCCCCCCCC  ',
				'    CCCCCCCC    '], pal, 2, 'bush');
			new Image([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'      …………      ',
				'     …-//-…     ',
				'     …--/-…     ',
				'     „…„„…„     ',
				'     „††…†„     ',
				'     |„……„|     ',
				'      ||||      '], pal, 2, 'tree stump');
			new Image([
				'       ……       ',
				'      …ˆ‡…      ',
				'     …†‡ˆ†…     ',
				'     …†‡ˆ‡…     ',
				'    ……†‡ˆ‡……    ',
				'   …‡…†‡ˆ†…†…   ',
				'  ……†…†‡ˆ‡…†……  ',
				'  …‡†…†ˆ‡†…‡……  ',
				'  …‡†…‡‡ˆ†…†‡…  ',
				'  …‡†…†‡ˆ‡…†‡…  ',
				'  …†‡…‡‡ˆ†…†‡…  ',
				'  …†‡…†ˆ‡†…††…  ',
				'  …†‡…†ˆ‡†…‡†…  ',
				'  …†‡…‡……‡…‡†…  ',
				'  …††……..……‡†…  ',
				'  …‡†…-...…††…  ',
				'  …††…--.-„†‡…  ',
				'  …†„„„--„„„‡…  ',
				'  ……..…„……..„…  ',
				'  …...-…„-...„  ',
				'  „.-.-…„-.-.„  ',
				'  |„--„„„…--„|  ',
				'   |„„|||„„„|   ',
				'    ||   |||    '], pal, 2, 'log pile');
			new Image([
				'                                ',
				'                                ',
				'                           ‡‡‡  ',
				'                        ‡‡‡ˆ‰‡ˆ ',
				'                     ‡‡‡ˆ‡ˆˆ‡‡ˆˆ',
				'                  ‡‡‡ˆ‰‡ˆ‡ˆ‡ˆ‡‡ˆ',
				'               ‡‡‡ˆ‰‰ˆˆˆ‡‡‡‡‡‡†ˆ',
				'            ‡‡‡ˆ‡ˆˆ‡ˆ†‡‡‡‡‡†††Šˆ',
				'           ˆˆˆ‰ˆ‡ˆ‡‡‡†‡‡†††ŠŠ‰‰ˆ',
				'           ˆˆ‡ˆ‡‡ˆ‡‡††††Š‰Š‰‰‰‰‡',
				'          ˆ‡‡‡‡‡‡‡†††ŠŠŠŠˆ‰‰ˆˆˆ‡',
				'          ˆ‡‡‡‡†††ŠŠŠ‡‡‰‰ˆˆˆ‰‰‰‡',
				'        ˆˆˆˆ†††Š‰Š‰‡‡††‡‡‰‰‰‰‡‡ ',
				'     ˆˆˆ‡‡‡ˆŠŠ‰‰ˆ‰‡††ˆˆ††‡ˆˆ‡   ',
				'   ˆˆ‡‡‡   ˆ‰‰‰ˆˆ‡†ˆˆ‡ˆˆ„†‡…    ',
				' ˆˆ‡‡    ||ˆˆˆˆ‰‰‡†ˆˆ‡„……†‡|||| ',
				'ˆ‡‡   ||ˆˆˆˆˆ‰‰‰‡†ˆ……bb‡‡…†‡||||',
				'‡   |ˆˆˆ‡‡‡‡‡‡‡‡‡†…‡‡ba………†‡||||',
				'  |ˆˆ‡‡‡|||||||||…†………‡……†…|||||',
				'|ˆˆ‡‡   |||||||||…†||…‡||†…|||||',
				'ˆ‡‡  |||||||||||||…††||††…||||||',
				'‡  ||||||||||||||||……††……|||||| ',
				'|||||          ||||||……|||||    ',
				'                    ||||        '], pal, 2, 'cart');
			new Image([
				'       ……       ',
				'      …‰ˆ…      ',
				'    ……ˆ‰ˆˆ……    ',
				'  ……‡ˆ‡ˆ‰‡ˆ‡……  ',
				'……†ˆ‡ˆ‰ˆ‰‰ˆ‡ˆ†……',
				'…‡†‡ˆˆ‡‰ˆ‡ˆˆ‡†‡…',
				'…‡‡ˆ‡ˆ‡……‡ˆ†‡‡‡…',
				'…‡†‡†‡…„„…‡†‡†‡…',
				'…‡††……„  „……††‡…',
				'…†……„„````„„……†…',
				'……„„``bcb`c`„„……',
				'…„…`c``````cb…„…',
				' …†``^^^^^^``†… ',
				' …†`^^]]]]^^`†… ',
				' …†`]][[[[]]`†… ',
				' …†``[[[[[[``†… ',
				' _``c``````cc`_ ',
				'C`c``cdd`cc``c`C',
				'C_cc```````ccb`C',
				'C^bcb`bccc`acb^C',
				'C^ab`bccccb`aa^C',
				'CC^a`abbbba`^^CC',
				'CCC^^^aaaa^^^CCC',
				' CCCC^^^^^^CCCC '], pal, 2, 'well');
			{
				new Image([
					'      ----      ',
					'     -.//.-     ',
					'     -/00/-     ',
					'     --//--     ',
					'     -.--.-     ',
					'     -....-     ',
					'     -....-     ',
					'     -.--.-     ',
					'     ,-0/--     ',
					'     ,-/0-,     ',
					'     ,-/0-,     ',
					'     ,-/0-,     ',
					'      -/0-      ',
					'      -0/-      ',
					'      -0/-      ',
					'      -0/-      '], pal, 2, 'fence side');
				new Image([
					'      ----      ',
					'     -.//.-     ',
					'     -/00/-     ',
					'     --//--     ',
					'------.--.------',
					'.....-....-.....',
					'------....------',
					'     -.-..-     ',
					'-----,-..-------',
					'.....,-.--,.....',
					',,,,,,----,,,,,,',
					'     ,----,     ',
					'      ,,,,      ',
					'                ',
					'                ',
					'                '], pal, 2, 'fence bottom');
				new Image([
					'      ----      ',
					'     -.//.-     ',
					'     -/00/-     ',
					'     --//--     ',
					'     -.--.------',
					'     -....-.....',
					'     -....------',
					'     -.--.-     ',
					'     ,-0/-------',
					'     ,-/0-,.....',
					'     ,-/0-,,,,,,',
					'     ,-/0-,     ',
					'      -/0-      ',
					'      -0/-      ',
					'      -0/-      ',
					'      -0/-      '], pal, 2, 'fence top left');
				new Image([
					'      ----      ',
					'     -.//.-     ',
					'     -/00/-     ',
					'     --//--     ',
					'------.--.-     ',
					'.....-....-     ',
					'------....-     ',
					'     -.--.-     ',
					'-------/0-,     ',
					'.....,-0/-,     ',
					',,,,,,-0/-,     ',
					'     ,-0/-,     ',
					'      -0/-      ',
					'      -/0-      ',
					'      -/0-      ',
					'      -/0-      '], pal, 2, 'fence top right');
				new Image([
					'      ----      ',
					'     -.//.-     ',
					'     -/00/-     ',
					'     --//--     ',
					'     -.--.------',
					'     -....-.....',
					'     -....------',
					'     -.-..-     ',
					'     ,-..-------',
					'     ,-.--,.....',
					'     ,----,,,,,,',
					'     ,----,     ',
					'      ,,,,      ',
					'                ',
					'                ',
					'                '], pal, 2, 'fence bottom left');
				new Image([
					'      ----      ',
					'     -.//.-     ',
					'     -/00/-     ',
					'     --//--     ',
					'------.--.-     ',
					'.....-....-     ',
					'------....-     ',
					'     -..-.-     ',
					'-------..-,     ',
					'.....,--.-,     ',
					',,,,,,----,     ',
					'     ,----,     ',
					'      ,,,,      ',
					'                ',
					'                ',
					'                '], pal, 2, 'fence bottom right');
			} // fence
			{
				new Image([
					'+-./,...',
					'+/-./000',
					'+./-.///',
					'+-./,...',
					'+/-.,/00',
					'+.--,///',
					'+,-/,...',
					'+.,./000'], pal, 2, 'wall corner left a');
				new Image([
					'+-.,////',
					'+,-.,---',
					'+.,-,.//',
					'+-,,,...',
					' +,.,---',
					'  +-.///',
					'   +-...',
					'    +,,,'], pal, 2, 'wall corner left b');
				new Image([
					'...,/.-+',
					'000/.-/+',
					'///.-/.+',
					'...,/.-+',
					'00/,.-/+',
					'///,--.+',
					'...,/-,+',
					'000/.,.+'], pal, 2, 'wall corner right a');
				new Image([
					'////,.-+',
					'---,.-,+',
					'//.,-,.+',
					'...,,,-+',
					'---,.,+ ',
					'///.-+  ',
					'...-+   ',
					',,,+    '], pal, 2, 'wall corner right b');
				new Image([
					'........',
					'0/./0000',
					'//-/////',
					'.--.-...',
					'000000/.',
					'///////-',
					'......--',
					'0/./0000'], pal, 2, 'wall a');
				new Image([
					'//-/////',
					'-,,-----',
					'//////.-',
					'.......-',
					'-------,',
					'/.-.////',
					'..,.....',
					',,,,,,,,'], pal, 2, 'wall b');
				new Image([
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$&'], pal, 2, 'wall left a');
				new Image([
					'+-./.&&(',
					'+-./.&((',
					'+-./0.((',
					'+-.010..',
					'+-010/00',
					'+,10////',
					'+/,.....',
					'+./,,,,,'], pal, 2, 'wall left b');
				new Image([
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$',
					'+-./.&$$'], pal, 2, 'wall left c');
				new Image([
					'   *****',
					' **,,,,,',
					' */-----',
					'+..//%%%',
					'+-...&%%',
					'+-./.&&&',
					'+-./.&&&',
					'+-./.&$$'], pal, 2, 'wall left d');
				new Image([
					'$$$$$$&(',
					'$$$$$&((',
					'$$$$&((%',
					'$$$&((%%',
					'$$&((%%%',
					'$&((%%%%',
					'&((%%%%%',
					'((%%%%%%'], pal, 2, 'roof left a');
				new Image([
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&'], pal, 2, 'roof left b');
				new Image([
					'(%%%%%%%',
					'%%%%%%%%',
					'((((((((',
					'........',
					'00000000',
					'////////',
					'........',
					',,,,,,,,'], pal, 2, 'roof bottom a');
				new Image([
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'&$&./.-+'], pal, 2, 'wall right a');
				new Image([
					'(&&./.-+',
					'((&./.-+',
					'((.0/.-+',
					'..010.-+',
					'00/010-+',
					'////01,+',
					'.....,/+',
					',,,,,/.+'], pal, 2, 'wall right b');
				new Image([
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+',
					'$$&./.-+'], pal, 2, 'wall right c');
				new Image([
					'*****   ',
					',,,,,** ',
					'-----/* ',
					'%%%//..+',
					'%%&...-+',
					'&&&./.-+',
					'&&&./.-+',
					'$$&./.-+'], pal, 2, 'wall right d');
				new Image([
					'(&$$$$$$',
					'((&$$$$$',
					'%((&$$$$',
					'%%((&$$$',
					'%%%((&$$',
					'%%%%((&$',
					'%%%%%((&',
					'%%%%%%(('], pal, 2, 'roof right a');
				new Image([
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$'], pal, 2, 'roof right b');
				new Image([
					'%%%%%%%(',
					'%%%%%%%%',
					'((((((((',
					'........',
					'00000000',
					'////////',
					'........',
					',,,,,,,,'], pal, 2, 'roof bottom b');
				new Image([
					'((((((((',
					'((((((((',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%'], pal, 2, 'roof middle a');
				new Image([
					'%%%%%%%%',
					'%%%%%%%%',
					'((((((((',
					'........',
					'00000000',
					'////////',
					'........',
					',,,,,,,,'], pal, 2, 'roof middle b');
				new Image([
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%'], pal, 2, 'roof middle c');
				new Image([
					'********',
					',,,,,,,,',
					'--------',
					'%%%%%%%%',
					'########',
					'%%######',
					'&&%%####',
					'&&&&%%##'], pal, 2, 'wall top a');
				new Image([
					'********',
					',,,,,,,,',
					'--------',
					'%%%%%%%%',
					'########',
					'########',
					'########',
					'########'], pal, 2, 'wall top b');
				new Image([
					'********',
					',,,,,,,,',
					'--------',
					'%%%%%%%%',
					'########',
					'######%%',
					'####%%&&',
					'##%%&&&&'], pal, 2, 'wall top c');
				new Image([
					'$$&&&&%%',
					'$$$$&&&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&',
					'$$$$$$&&'], pal, 2, 'roof top a');
				new Image([
					'########',
					'%%%%%%%%',
					'&&&&&&&&',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%',
					'%%%%%%%%'], pal, 2, 'roof top b');
				new Image([
					'%%&&&&$$',
					'&&&&$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$',
					'&&$$$$$$'], pal, 2, 'roof top c');
			} // house meta tiles
			{
				new MetaImage('wall corner left a', 'wall a', 'wall corner left b', 'wall b', 'wall corner left');
				new MetaImage('wall a', 'wall corner right a', 'wall b', 'wall corner right b', 'wall corner right');
				new MetaImage('wall a', 'wall a', 'wall b', 'wall b', 'wall center');
				new MetaImage('wall left a', 'roof left a', 'wall left b', 'roof bottom a', 'roof bottom left corner');
				new MetaImage('roof right a', 'wall right a', 'roof bottom b', 'wall right b', 'roof bottom right corner');
				new MetaImage('roof middle a', 'roof middle a', 'roof middle b', 'roof middle b', 'roof bottom');
				new MetaImage('wall left c', 'roof left b', 'wall left c', 'roof left b', 'roof left');
				new MetaImage('roof right b', 'wall right c', 'roof right b', 'wall right c', 'roof right');
				new MetaImage('roof middle c', 'roof middle c', 'roof middle c', 'roof middle c', 'roof middle');
				new MetaImage('wall left d', 'wall top a', 'wall left c', 'roof top a', 'roof top left corner');
				new MetaImage('wall top c', 'wall right d', 'roof top c', 'wall right c', 'roof top right corner');
				new MetaImage('wall top b', 'wall top b', 'roof top b', 'roof top b', 'roof top');
			} // house full tiles
			{
				new Image([
					'1111111111111111',
					'0000000000000000',
					'////////////////',
					'////////////////',
					'////////////////',
					'/////....../////',
					'//............//',
					'................',
					'----------------',
					'...-./-..-/.-...',
					'------.//.------',
					'.....------.....',
					'--....-..-....--',
					'-----.,..,.-----',
					'------,--,------',
					',,,,,,,,,,,,,,,,'], pal, 2, 'interior wall top');
				new Image([
					',,,,,,,,,,,,,,,,',
					'------,--,------',
					'-----.,..,.-----',
					'--....-..-....--',
					'.....------.....',
					'------.//.------',
					'...-./-..-/.-...',
					'----------------',
					'................',
					'//............//',
					'/////....../////',
					'////////////////',
					'////////////////',
					'////////////////',
					'0000000000000000',
					'1111111111111111'], pal, 2, 'interior wall bottom');
				new Image([
					'10/////.-.-.---,',
					'10/////.-.-.---,',
					'10////..-.-..--,',
					'10////..---..--,',
					'10////..-.-..--,',
					'10///...-/--..-,',
					'10///...--.--,,,',
					'10///...-./-..-,',
					'10///...-./-..-,',
					'10///...--.--,,,',
					'10///...-/--..-,',
					'10////..-.-..--,',
					'10////..---..--,',
					'10////..-.-..--,',
					'10/////.-.-.---,',
					'10/////.-.-.---,'], pal, 2, 'interior wall left');
				new Image([
					',---.-.-./////01',
					',---.-.-./////01',
					',--..-.-..////01',
					',--..---..////01',
					',--..-.-..////01',
					',-..--/-...///01',
					',,,--.--...///01',
					',-..-/.-...///01',
					',-..-/.-...///01',
					',,,--.--...///01',
					',-..--/-...///01',
					',--..-.-..////01',
					',--..---..////01',
					',--..-.-..////01',
					',---.-.-./////01',
					',---.-.-./////01'], pal, 2, 'interior wall right');
				new Image([
					'1111111111111111',
					'1100000000000000',
					'10./////////////',
					'10/.////////////',
					'10//.///////////',
					'10///./..../////',
					'10////-.......//',
					'10///..-........',
					'10///...,-------',
					'10///...-,..-...',
					'10////..-.,-----',
					'10////..-.-,.../',
					'10////..---.-.--',
					'10/////.-.-..,--',
					'10/////.-.-.--,-',
					'10/////.-.-.---,'], pal, 2, 'interior wall top left corner');
				new Image([
					'1111111111111111',
					'0000000000000011',
					'/////////////.01',
					'////////////./01',
					'///////////.//01',
					'/////...././//01',
					'//.......-////01',
					'........-..///01',
					'-------,...///01',
					'...-..,-...///01',
					'-----,.-..////01',
					'/...,-.-..////01',
					'--.-.---..////01',
					'--,..-.-./////01',
					'-,--.-.-./////01',
					',---.-.-./////01'], pal, 2, 'interior wall top right corner');
				new Image([
					'10/////.-.-.---,',
					'10/////.-.-.--,-',
					'10/////.-.-..,--',
					'10////..---.-.--',
					'10////..-.-,.../',
					'10////..-.,-----',
					'10///...-,..-...',
					'10///...,-------',
					'10///..-........',
					'10////-.......//',
					'10///./..../////',
					'10//.///////////',
					'10/.////////////',
					'10./////////////',
					'1100000000000000',
					'1111111111111111'], pal, 2, 'interior wall bottom left corner');
				new Image([
					',---.-.-./////01',
					'-,--.-.-./////01',
					'--,..-.-./////01',
					'--.-.---..////01',
					'/...,-.-..////01',
					'-----,.-..////01',
					'...-..,-...///01',
					'-------,...///01',
					'........-..///01',
					'//.......-////01',
					'/////...././//01',
					'///////////.//01',
					'////////////./01',
					'/////////////.01',
					'0000000000000011',
					'1111111111111111'], pal, 2, 'interior wall bottom right corner');
				new Image([
					',,/0000000000/,,',
					',-./11111111//-,',
					',-./12111121//-,',
					',-.0122222210/-,',
					'-..0122222210/.-',
					'-./1222222221/.-',
					'-./1222222221/..',
					'-.012222222210..',
					'..012222222210..',
					'./122222222221/.',
					'./122222222221/.',
					'./122222222221/.',
					'./122222222221/.',
					'../1111111111/..',
					'00.//////////.00',
					'111..........111'], pal, 2, 'interior door');
				new Image([
					',,////////////,,',
					'--0000/00/0001--',
					'---..........---',
					'-,-//////////-,-',
					'.-.000*00*000.-.',
					'--.0BB&BB&BB0.--',
					'.-.*&&B&&B&&*.-.',
					'--.0BB&BB&BB0.--',
					'-.0BBB&BB&BBB0.-',
					'-.*&&&B&&B&&&*.-',
					'-.0BBB&BB&BBB0.-',
					'-.0000*00*0000.-',
					'--............--',
					'/--------------/',
					'0000000000000000',
					'1111111111111111'], pal, 2, 'interior window');
				new Image([
					'................',
					'.--------------.',
					'-///11111111///-',
					'-..//////////..-',
					'----........----',
					'++++jjjjjjjj++++',
					'+,+,j#j##j#j,+,+',
					'+,,,jj$jj$jj,,,+',
					'+,,-jj$jj$jj-,,+',
					'+---j#j##j#j---+',
					'+---jjjjjjjj---+',
					',.001111111100.,',
					',...00000000...,',
					'+--------------+',
					',++++++++++++++,',
					',,,,,,,,,,,,,,,,'], pal, 2, 'window');
				new Image([
					'.//////////////.',
					'/-000000000000-/',
					'//-0,,,,,,,,0-//',
					'///,jjjjjjjj,///',
					'//,jjjjjjjjjj,//',
					'./,jjjjjjjjjj,/.',
					'./,jjjjjjjjjj,/.',
					'./,jjjjjjjjjj,/.',
					',-,jjjjjjjjjj,-,',
					'-.,jjjjjjjjjj,.-',
					'-.,jjjjjjjjjj,.-',
					'-.,jjjjjjjjjj,.-',
					',-,jjjjjjjjjj,-,',
					',-,jjjjjjjjjj,-,',
					',-,jjjjjjjjjj,-,',
					',,,jjjjjjjjjj,,,'], pal, 2, 'door');
				new Image([
					'†…………†††††………††…',
					'ˆ…ˆ†ˆ…ˆˆˆˆˆˆˆˆˆˆ',
					'ˆˆˆ†‡ˆ‡ˆˆˆ‡‡‡‡‡ˆ',
					'‡…‡…‡…ˆˆ‡ˆˆˆ‡‡ˆˆ',
					'††………††††………††††',
					'ˆˆˆˆˆˆˆˆ…ˆ…ˆ…ˆˆˆ',
					'‡‡‡ˆˆˆ‡ˆ‡‡†ˆ‡ˆˆ‡',
					'‡ˆˆ‡‡ˆˆˆ…‡…‡…‡ˆˆ',
					'………†††††……………†……',
					'ˆ…ˆˆˆˆˆˆˆˆˆˆˆ…ˆ…',
					'‡ˆˆ‡‡ˆˆ‡‡ˆ‡ˆˆ‡ˆ†',
					'‡…ˆˆ‡‡ˆˆ‡ˆˆˆ‡…‡…',
					'…†††††……††…†…………',
					'ˆˆˆˆˆˆˆˆˆˆ…ˆ…ˆ…ˆ',
					'ˆˆˆ‡ˆˆˆ‡‡‡ˆˆ†‡ˆ‡',
					'ˆ‡‡ˆˆ‡‡ˆ‡ˆ…‡…‡…ˆ'], pal, 2, 'wood floor');
				new Image([
					'†…………†††††………††…',
					'ˆ…ˆ†ˆ…ˆˆˆˆˆˆˆˆˆˆ',
					'ˆˆˆ†‡ˆ‡ˆˆˆ‡‡‡‡‡ˆ',
					'‡…‡…‡…ˆˆ‡ˆˆˆ‡‡ˆˆ',
					'††………††††………††††',
					'ˆˆˆˆˆˆˆˆˆˆ‡ˆ…ˆˆˆ',
					'‡‡‡ˆˆ‰‰‰‰‰ˆˆˆˆˆ‡',
					'‡ˆˆ‰‰ŠŠŠŠŠ‰‰‰ˆˆˆ',
					'…‡ˆˆ‰ŠŠŠŠŠŠ‰ˆˆ‡…',
					'ˆˆ‰Š‹‹‹‹‹‹‹‹Š‰‰ˆ',
					'ˆ‰Š‹‹‘‘‘‘‘‘‹‹Š‰‰',
					'ˆ‰Š‹‘‘“““’’‘‹Š‰Š',
					'…ˆ‰ŠŽ‘‘‘‘‘‘ŽŠ‰ˆ…',
					'ˆ‰ŠŽ‘’’’“‘Ž‰Š‰',
					'ˆ‰ŠŽ‘“““’‘Ž‰Š‰',
					'ˆ‰Ž‘““““““‘ŽŠˆ'], pal, 2, 'wood floor light');
				new Image([
					'  ………………………………  ',
					' …‰‰‰ˆ‰‰‰ˆ‰‰ˆ‰… ',
					' …ˆˆ‰‰ˆˆ‰‰ˆ‰ˆˆ… ',
					' …‡†††‡‡‡††††‡… ',
					' …‰‰ˆ‰‰‰‰‰ˆ‰‰‰… ',
					' …ˆˆ‰‰ˆˆˆ‰‰‰‰ˆ… ',
					' …ˆˆˆˆˆˆˆˆˆˆˆˆ… ',
					' …††‡††††‡‡†††… ',
					' …‰‰‰‰ˆ‰‰‰ˆˆ‰‰… ',
					' …ˆˆˆ‰‰ˆˆˆ‰‰‰ˆ… ',
					' …‡‡‡‡‡‡‡‡‡‡†‡„ ',
					' „‡††††††††††‡„ ',
					' …„‡„„„„„„„„‡„… ',
					' „‡†„„„„„„„„†‡„ ',
					' „……„…„„„„…„……„ ',
					' …„„……………………„„… '], pal, 2, 'table');
				new Image([
					'                ',
					'                ',
					'     %%%%%%     ',
					'   %%((((((%%   ',
					'  %&(%&&%&(((%  ',
					'  %&&&%%%%&(&%  ',
					' …$%&%%$$%%&%$… ',
					' …$%%($$%$&%%$… ',
					' „$%%%&&&&%%%$„ ',
					' „†$$%%%%%%$$$„ ',
					'  „……$$%%$$……„  ',
					' …„††………………††„… ',
					' …„……††††††……„… ',
					' …„‡†„„„„„„†‡„… ',
					' …„†…„„„„„„…†„… ',
					'  …„„…„„„„…„„…  '], pal, 2, 'stool');
				new Image([
					' #$%&&((((((((((',
					' #$%&&((((((((((',
					' #$%&&&&((((((((',
					' #$%&&&&&&&&&&&&',
					' #$%%&&&&&&&&&&&',
					' #$%%%%%%%%%%%%%',
					' #$‡‡‡‡‡‡‡‡‡‡‡‡‡',
					' #‡ˆˆˆˆˆˆˆˆˆˆˆˆˆ',
					' …ˆ‡††‡††‡††‡††‡',
					' …‡†$$†$$†$$†$$†',
					' …‡…##…##…##…##…',
					' …†…………………………………',
					' …†……„„„„„„„„„„„',
					' „……„„„„„„„„„„„„',
					' …„„„„…………………………',
					'  ……………………………………'], pal, 2, 'bed bottom left');
				new Image([
					'((((((((((&&%$# ',
					'((((((((((&&%$# ',
					'((((((((&&&&%$# ',
					'&&&&&&&&&&&&%$# ',
					'&&&&&&&&&&&%%$# ',
					'%%%%%%%%%%%%%$# ',
					'‡‡‡‡‡‡‡‡‡‡‡‡‡$# ',
					'ˆˆˆˆˆˆˆˆˆˆˆˆˆ‡# ',
					'‡††‡††‡††‡††‡ˆ… ',
					'†$$†$$†$$†$$†‡… ',
					'…##…##…##…##…‡… ',
					'…………………………………†… ',
					'„„„„„„„„„„„……†… ',
					'„„„„„„„„„„„„……„ ',
					'…………………………„„„„… ',
					'……………………………………  '], pal, 2, 'bed bottom right');
				new Image([
					'   ‡‡‡‡‡‡‡‡‡‡‡‡‡',
					'  ‡ˆˆˆˆˆˆˆˆˆˆˆˆˆ',
					' …ˆ‡††‡††‡††‡††‡',
					' …‡†  †  †  †  †',
					' …‡…  …  …  …  …',
					' …†…………………………………',
					' …†…$%%%%%%%%%%%',
					' „…$%%&&&&&&&&&&',
					' …$%%&&&&&&&&&&&',
					' …$%&&&&&&&(((((',
					' #$%&&&(((((((((',
					' #$%&&((((((((((',
					' #$%&&((((()))))',
					' #$%&&((()))))))',
					' #$%&&((()))))))',
					' #$%&&((()))))))',
					' #$%&&((()))((((',
					' #$%&&((((((((((',
					' #$%&&((((((((((',
					' #$%&&((((()))))',
					' #$%&&((()))))))',
					' #$%&&((()))))))',
					' #$%&&((()))))))',
					' #$%&&((()))(((('], pal, 2, 'bed top left');
				new Image([
					'‡‡‡‡‡‡‡‡‡‡‡‡‡   ',
					'ˆˆˆˆˆˆˆˆˆˆˆˆˆ‡  ',
					'‡††‡††‡††‡††‡ˆ… ',
					'†  †  †  †  †‡… ',
					'…  …  …  …  …‡… ',
					'…………………………………†… ',
					'%%%%%%%%%%%$…†… ',
					'&&&&&&&&&&%%$…„ ',
					'&&&&&&&&&&&%%$… ',
					'(((((&&&&&&&%$… ',
					'(((((((((&&&%$# ',
					'((((((((((&&%$# ',
					')))))(((((&&%$# ',
					')))))))(((&&%$# ',
					')))))))(((&&%$# ',
					')))))))(((&&%$# ',
					'(((()))(((&&%$# ',
					'((((((((((&&%$# ',
					'((((((((((&&%$# ',
					')))))(((((&&%$# ',
					')))))))(((&&%$# ',
					')))))))(((&&%$# ',
					')))))))(((&&%$# ',
					'(((()))(((&&%$# '], pal, 2, 'bed top right');
				new Image([
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'     ………………     ',
					'   ……ˆˆˆˆˆˆ……   ',
					'  …ˆˆˆ‰‰ˆ‰ˆˆˆ…  ',
					' …††‡†‡‡‡‡‡‡††… ',
					' …ˆˆˆ‰‰‰ˆˆˆ‰‰ˆ… ',
					'…†ˆ‰ˆˆˆ‰‰‰‰‰ˆˆ†…',
					'…†††‡‡‡‡‡††‡†††…',
					'…ˆ†ˆˆˆ‰ˆ‰‰ˆˆˆ†ˆ…',
					'…‡†††ˆˆˆˆˆˆ†††‡…',
					'…‡†ˆˆ††††††ˆˆ†‡…',
					'…‡†ˆ‡†ˆˆˆˆ†ˆ‡†‡…',
					'„†…‡‡†ˆ‡‡‡†‡‡…†„',
					'„†…†‡†‡‡‡‡…‡†…†„',
					'…„…†‡…†‡‡†…†‡…„…',
					'…„…††…‡†‡†…††…„…',
					' …„††…††††…††„… ',
					' ……„„…††††…„„…… ',
					'   ……„„„„„„……   ',
					'     ………………     '], pal, 2, 'barrel');
				new Animation([
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^:]]]a^    ',
						' ^abb^9:]9a^    ',
						' ^`ab^7898`^    ',
						' ^`a^^6666`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^9]]]a^    ',
						' ^`ab^78]8`^    ',
						' ^`a^^6666`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^]]]]a^    ',
						' ^`ab^7]]]`^    ',
						' ^`a^^66]6`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^]]]]a^    ',
						' ^`ab^767]`^    ',
						' ^`a^^66]6`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^8]8]a^    ',
						' ^`ab^767]`^    ',
						' ^`a^^66]6`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^8]]8a^    ',
						' ^abb^8]8]a^    ',
						' ^`ab^767]`^    ',
						' ^`a^^6676`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^]]8]a^    ',
						' ^`ab^]67]`^    ',
						' ^`a^^6666`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^]]]]a^    ',
						' ^`ab^]7]]`^    ',
						' ^`a^^6776`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[

						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^]]]]a^    ',
						' ^`ab^]]]]`^    ',
						' ^`a^^6]66`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[

						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]]]a^    ',
						' ^abb^]]]]a^    ',
						' ^`ab^77]]`^    ',
						' ^`a^^6766`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[

						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^]]8]a^    ',
						' ^abb^]8]]a^    ',
						' ^`ab^778]`^    ',
						' ^`a^^6766`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   '],
					[
						'      ^^^^      ',
						'    ^^aaaa^^    ',
						'   ^^``aa``^^   ',
						'    ^^^``^^^    ',
						'    ^``^^``^    ',
						'   ^^^aaaa`^    ',
						' ^^ab^8]]]a^    ',
						' ^abb^78]]a^    ',
						' ^`ab^]777`^    ',
						' ^`a^^6766`^^   ',
						' ^^[[^^a`^^[[   ',
						'    [[[^^[[[    ',
						' … …[[[[[[[[…   ',
						' ……[[„„[[„„[[…  ',
						'  …[[……„„……[[…  ',
						'   …………………………   ']], pal, 1, 'wood stove');


			} // house interior
		} // block images
		{
			new Tile('grass', 'walkable', '!');
			new Tile(['grass', 'rock'], 'solid', '#');
			new Tile('void', 'solid', ' ');
			new Tile(['grass', 'treeA'], 'solid', '$');
			new Tile(['grass', 'purple flower a'], 'walkable', '%');
			new Tile(['grass', 'purple flower b'], 'walkable', '&');
			new Tile(['grass', 'bush'], 'solid', '(');
			new Tile(['grass', 'wall corner left'], 'solid', ')');
			new Tile('wall center', 'solid', '+');
			new Tile(['grass', 'wall corner right'], 'solid', '*');
			new Tile('window', 'solid', ',');
			new Tile('door', 'solid', '-');
			new Tile('roof bottom left corner', 'solid', '.');
			new Tile('roof bottom right corner', 'solid', '/');
			new Tile('roof bottom', 'solid', '0');
			new Tile('roof left', 'solid', '1');
			new Tile('roof middle', 'solid', '2');
			new Tile('roof right', 'solid', '3');
			new Tile(['grass', 'roof top left corner'], 'solid', '4');
			new Tile('roof top', 'solid', '5');
			new Tile(['grass', 'roof top right corner'], 'solid', '6');
			new Tile('wood floor', 'walkable', '7');
			new Tile('interior wall top', 'solid', '8');
			new Tile('interior wall bottom', 'solid', '9');
			new Tile('interior wall left', 'solid', ':');
			new Tile('interior wall right', 'solid', ';');
			new Tile('interior wall top left corner', 'solid', '<');
			new Tile('interior wall top right corner', 'solid', '=');
			new Tile('interior wall bottom left corner', 'solid', '>');
			new Tile('interior wall bottom right corner', 'solid', '?');
			new Tile('interior door', 'solid', '@');
			new Tile('wood floor light', 'walkable', 'A');
			new Tile('interior window', 'solid', 'B');
			new Tile(['wood floor', 'table'], 'solid', 'C');
			new Tile(['wood floor', 'stool'], 'solid', 'D');
			new Tile(['grass', 'tree stump'], 'solid', 'E');
			new Tile(['grass', 'log pile'], 'solid', 'F');
			new Tile(['grass', 'cart'], 'solid', 'G');
			new Tile(['grass', 'fence side'], 'solid', 'H');
			new Tile(['grass', 'fence top right'], 'solid', 'I');
			new Tile(['grass', 'fence top left'], 'solid', 'J');
			new Tile(['grass', 'fence bottom'], 'solid', 'K');
			new Tile(['grass', 'fence bottom left'], 'solid', 'L');
			new Tile(['grass', 'fence bottom right'], 'solid', 'M');
			new Tile(['wood floor', 'bed bottom left'], 'solid', 'N');
			new Tile(['wood floor', 'bed bottom right'], 'solid', 'O');
			new Tile(['wood floor', 'bed top left'], 'solid', 'P');
			new Tile(['wood floor', 'bed top right'], 'solid', 'Q');
			new Tile(['wood floor', 'barrel'], 'solid', 'R');
			new Tile(['wood floor', 'wood stove'], 'solid', 'S');
			new Tile(['grass', 'well'], 'solid', 'T');
			new Tile(['grass', 'pine tree'], 'solid', 'U');
			new Tile('otherworld grass', 'walkable', 'V');
		} // block tiles
		{
			new Image([
				' _______________',
				'_ba_abbbbbbbbbbb',
				'_aba_a__________',
				'__aa__aaaaaaaaaa',
				'_a__a_abbbbbbbbb',
				'_ba___abbbbbbbbb',
				'_b_aaabbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'topLeft');
			new Image([
				'_______________ ',
				'bbbbbbbbbbba_ab_',
				'__________a_aba_',
				'aaaaaaaaaa__aa__',
				'bbbbbbbbba_a__a_',
				'bbbbbbbbba___ab_',
				'bbbbbbbbbbaaa_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'topRight');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_aaabbbbbbbbbb',
				'_ba___abbbbbbbbb',
				'_a__a_abbbbbbbbb',
				'__aa__aaaaaaaaaa',
				'_aba_a__________',
				'_ba_abbbbbbbbbbb',
				' _______________'], pal, 2, 'bottomLeft');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbaaa_b_',
				'bbbbbbbbba___ab_',
				'bbbbbbbbba_a__a_',
				'aaaaaaaaaa__aa__',
				'__________a_aba_',
				'bbbbbbbbbbba_ab_',
				'_______________ '], pal, 2, 'bottomRight');
			new Image([
				'________________',
				'bbbbbbbbbbbbbbbb',
				'________________',
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
				'bbbbbbbbbbbbbbbb'], pal, 2, 'top');
			new Image([
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
				'aaaaaaaaaaaaaaaa',
				'________________',
				'bbbbbbbbbbbbbbbb',
				'________________'], pal, 2, 'bottom');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'left');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'right');
			new Image([
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
				'bbbbbbbbbbbbbbbb'], pal, 2, 'middle');
			new Image([
				'_______________ ',
				'_ba_abbbbbba_ab_',
				'_ab__________ba_',
				'____%%%%%%%%____',
				'ba_%&&&&&&&&%_a_',
				'ba_%&2,&&,2&%_b_',
				'ba_%&,2,,2,&%_b_',
				'ba_%&&,22,&&%_b_',
				'ba_%&&,22,&&%_b_',
				'ba_%&,2,,2,&%_b_',
				'ba_%&2,&&,2&%_b_',
				'ba_%&&&&&&&&%_a_',
				'____%%%%%%%%____',
				'_ab__________ba_',
				'_ba_aaaaaaaa_ab_',
				'____bbbbbbbb____'], pal, 2, 'closeButton');
			new Image([
				'____bbbbbbbb____',
				'_ba_aaaaaaaa_ab_',
				'_ab__________ba_',
				'____DDDDDDDD____',
				'ba_DEEEEEEEED_a_',
				'ba_DEEEEE€ƒED_b_',
				'ba_DEEEE€ƒ€ED_b_',
				'ba_Dƒ€E€ƒ€EED_b_',
				'ba_D€ƒ€ƒ€EEED_b_',
				'ba_DE€ƒ€EEEED_b_',
				'ba_DEE€EEEEED_b_',
				'ba_DEEEEEEEED_a_',
				'____DDDDDDDD____',
				'_ab__________ba_',
				'_ba_abbbbbba_ab_',
				'_______________ '], pal, 2, 'acceptButton');
			new Image([
				'____bbbbbbbb____',
				'_ba_aaaaaaaa_ab_',
				'_ab__________ba_',
				'____99999999____',
				'ba_9::=<::::9_a_',
				'ba_9::=B<:::9_b_',
				'ba_9::=BB<::9_b_',
				'ba_9::=BBB<:9_b_',
				'ba_9::=BBB<:9_b_',
				'ba_9::=BB<::9_b_',
				'ba_9::=B<:::9_b_',
				'ba_9::=<::::9_a_',
				'____99999999____',
				'_ab__________ba_',
				'_ba_abbbbbba_ab_',
				'_______________ '], pal, 2, 'nextButton');
			new Image([
				'____bbbbbbbb____',
				'_ba_aaaaaaaa_ab_',
				'_ab__________ba_',
				'____99999999____',
				'_a_9::::<=::9_ab',
				'_b_9:::<B=::9_ab',
				'_b_9::<BB=::9_ab',
				'_b_9:<BBB=::9_ab',
				'_b_9:<BBB=::9_ab',
				'_b_9::<BB=::9_ab',
				'_b_9:::<B=::9_ab',
				'_a_9::::<=::9_ab',
				'____99999999____',
				'_ab__________ba_',
				'_ba_abbbbbba_ab_',
				' _______________'], pal, 2, 'backButton');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'babbbbbbbbbbbbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babbbbbbbbbbbbab',
				'bbaaaaaaaaaaaabb',
				'bbbbbbbbbbbbbbbb'], pal, 2, 'slot');
			new Image([
				'________________',
				'bbaaaaaaaaaaaabb',
				'_abbbbbbbbbbbba_',
				'aabccccccccccbaa',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babbbbbbbbbbbbab',
				'bbaaaaaaaaaaaabb',
				'bbbbbbbbbbbbbbbb'], pal, 2, 'slotTop');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'babbbbbbbbbbbbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'babccccccccccbab',
				'aabccccccccccbaa',
				'_abbbbbbbbbbbba_',
				'bbaaaaaaaaaaaabb',
				'________________'], pal, 2, 'slotBottom');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_baaaaaaaaaaaabb',
				'_abbbbbbbbbbbbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abbbbbbbbbbbbab',
				'_baaaaaaaaaaaabb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'slotLeft');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbaaaaaaaaaaaab_',
				'babbbbbbbbbbbba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babbbbbbbbbbbba_',
				'bbaaaaaaaaaaaab_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'slotRight');
			new Image([
				' _______________',
				'_`aaaaaaaaaaaa`b',
				'_abbbbbbbbbbbba_',
				'_abccccccccccbaa',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abbbbbbbbbbbbab',
				'_`aaaaaaaaaaaabb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'slotTopLeft');
			new Image([
				'_______________ ',
				'b`aaaaaaaaaaaa`_',
				'_abbbbbbbbbbbba_',
				'aabccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babbbbbbbbbbbba_',
				'bbaaaaaaaaaaaa`_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'slotTopRight');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_`aaaaaaaaaaaabb',
				'_abbbbbbbbbbbbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbab',
				'_abccccccccccbaa',
				'_abbbbbbbbbbbba_',
				'_`aaaaaaaaaaaa`b',
				' _______________'], pal, 2, 'slotBottomLeft');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbaaaaaaaaaaaa`_',
				'babbbbbbbbbbbba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'aabccccccccccba_',
				'_abbbbbbbbbbbba_',
				'b`aaaaaaaaaaaa`_',
				'_______________ '], pal, 2, 'slotBottomRight');
			new Image([
				'                ',
				'   _____________',
				' __bbbbbbbbbbbbb',
				' _b`````````````',
				'_b`ccccccccccccc',
				'_b`ccccccccccccc',
				'_b`bbbbbbbbbbbbb',
				'_`bbbbbbbbbbbbbb',
				'_`bbbbbbbbbbbbbb',
				'_b`ccccccccccccc',
				'_b`ccccccccccccc',
				'_b`bbbbbbbbbbbbb',
				' _b`````````````',
				' __bbbbbbbbbbbbb',
				'   _____________',
				'                '], pal, 2, 'barLeft');
			new Image([
				'                ',
				'_____________   ',
				'bbbbbbbbbbbbb__ ',
				'`````````````b_ ',
				'ccccccccccccc`b_',
				'ccccccccccccc`b_',
				'bbbbbbbbbbbbb`b_',
				'bbbbbbbbbbbbbb`_',
				'bbbbbbbbbbbbbb`_',
				'ccccccccccccc`b_',
				'ccccccccccccc`b_',
				'bbbbbbbbbbbbb`b_',
				'`````````````b_ ',
				'bbbbbbbbbbbbb__ ',
				'_____________   ',
				'                '], pal, 2, 'barRight');
			new Image([
				'                ',
				'________________',
				'bbbbbbbbbbbbbbbb',
				'````````````````',
				'cccccccccccccccc',
				'cccccccccccccccc',
				'bbbbbbbbbbbbbbbb',
				'bbbbbbbbbbbbbbbb',
				'bbbbbbbbbbbbbbbb',
				'cccccccccccccccc',
				'cccccccccccccccc',
				'bbbbbbbbbbbbbbbb',
				'````````````````',
				'bbbbbbbbbbbbbbbb',
				'________________',
				'                '], pal, 2, 'barMiddle');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'ba[[[[[[[[[[[[ab',
				'ba[[[[0000[[[[ab',
				'ba[[[011110[[[ab',
				'ba[[[011110[[[ab',
				'ba[[[/0110/[[[ab',
				'ba[[[./00/.[[[ab',
				'ba[[[[.//.[[[[ab',
				'ba[[[[.//.[[[[ab',
				'ba[[[-,..,-[[[ab',
				'ba[[0.-,,-.0[[ab',
				'ba[[[-....-[[[ab',
				'ba[[[[----[[[[ab',
				'bbaaaaaaaaaaaabb',
				'bbbbbbbbbbbbbbbb'], pal, 2, 'characterIcon');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'ba[[[[[[[[[[[[ab',
				'ba[[[[[[[[[[[[ab',
				'ba[[[[8[[[[[[[ab',
				'ba[[1818[111[[ab',
				'ba[6181./1116[ab',
				'ba[6181..1106[ab',
				'ba[6.8......6[ab',
				'ba[5-7-,,---5[ab',
				'ba[5474554445[ab',
				'ba[[[7[44[[[[[ab',
				'ba[[[[7[[[[[[[ab',
				'ba[[[[[[[[[[[[ab',
				'bbaaaaaaaaaaaabb',
				'bbbbbbbbbbbbbbbb'], pal, 2, 'spellBookIcon');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'ba[[[[[[[[[[[[ab',
				'ba[[[[1111111[ab',
				'ba[[[10000000[ab',
				'ba[[[......[[[ab',
				'ba[[[.ˆˆ0ˆ0[[[ab',
				'ba[[[001111[[[ab',
				'ba[[[1ˆˆˆˆ1[[[ab',
				'ba[[[111111[[[ab',
				'ba[[[1ˆ1ˆˆ0[[[ab',
				'ba[110000..[[[ab',
				'ba[.......[[[[ab',
				'ba[[[[[[[[[[[[ab',
				'bbaaaaaaaaaaaabb',
				'bbbbbbbbbbbbbbbb'], pal, 2, 'questLogIcon');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_baaaaaaaaaaaabb',
				'_abbbbbbbbbbbbab',
				'_abccccccccccbab',
				'_abcccbbbbbccbab',
				'_abccbdeffdbcbab',
				'_abccbefffebcbab',
				'_abccbf```abcbab',
				'_abccbff`afbcbab',
				'_abccbef`aebcbab',
				'_abcaedd`adbcbab',
				'_abccaaa`aaccbab',
				'_abccccccccccbab',
				'_abbbbbbbbbbbbab',
				'_baaaaaaaaaaaabb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'headSlot');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_baaaaaaaaaaaabb',
				'_abbbbbbbbbbbbab',
				'_abccbbbbccccbab',
				'_abcbededbcccbab',
				'_abbdaaaaebccbab',
				'_abaebbccadbcbab',
				'_abcadebbbebcbab',
				'_abccaadedaccbab',
				'_abccccaaadbcbab',
				'_abcccccadfdbbab',
				'_abccccccadacbab',
				'_abcccccccaccbab',
				'_abbbbbbbbbbbbab',
				'_baaaaaaaaaaaabb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'neckSlot');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_baaaaaaaaaaaabb',
				'_abbbbbbbbbbbbab',
				'_abccccccccccbab',
				'_abccbcbbbbccbab',
				'_abcbgbbeeebcbab',
				'_abcbfgbcdcbcbab',
				'_abccbeacbbacbab',
				'_abcbaacbaaccbab',
				'_abcbedbaacccbab',
				'_abcbccbaccccbab',
				'_abccbbacccccbab',
				'_abccccccccccbab',
				'_abbbbbbbbbbbbab',
				'_baaaaaaaaaaaabb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'shoulderSlot');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_baaaaaaaaaaaabb',
				'_abbbbbbbbbbbbab',
				'_abccccccccccbab',
				'_abcbbbccbbbcbab',
				'_abbeffbbffebbab',
				'_abbdeeeeeedbbab',
				'_abcaceeeecacbab',
				'_abccaddddaccbab',
				'_abccaceecaccbab',
				'_abcccaddacccbab',
				'_abccccaaccccbab',
				'_abccccccccccbab',
				'_abbbbbbbbbbbbab',
				'_baaaaaaaaaaaabb',
				'_b_abbbbbbbbbbbb'], pal, 2, 'chestSlot');
			new Image([
				'_b_abbbbbbbbbbbb',
				'_`aaaaaaaaaaaabb',
				'_abbbbbbbbbbbbab',
				'_abccccccccccbab',
				'_abccccbbbcccbab',
				'_abcccbffebccbab',
				'_abccbfccedbcbab',
				'_abcbdedbceacbab',
				'_abcb``edceacbab',
				'_abcb```ebaccbab',
				'_abcca``aacccbab',
				'_abcccaabccccbab',
				'_abccccccccccbaa',
				'_abbbbbbbbbbbba_',
				'_`aaaaaaaaaaaa`b',
				' _______________'], pal, 2, 'wristSlot');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbaaaaaaaaaaaab_',
				'babbbbbbbbbbbba_',
				'babcccbbbccccba_',
				'babccbfffbcccba_',
				'babcbfeddbcccba_',
				'babcaedbefbccba_',
				'babccabdefbccba_',
				'babcc`ddefaccba_',
				'babc`cacbeaccba_',
				'babccaacbeaccba_',
				'babccacbcacccba_',
				'babcccaaaccccba_',
				'babbbbbbbbbbbba_',
				'bbaaaaaaaaaaaab_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'handSlot');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbaaaaaaaaaaaab_',
				'babbbbbbbbbbbba_',
				'babccbbbcccccba_',
				'babcbgggbccccba_',
				'babbgfbcgbcccba_',
				'babaeedbcgbccba_',
				'babaddfgfcgbcba_',
				'babcadghgbcgbba_',
				'babccafgfdbgaba_',
				'babcccaddeffaba_',
				'babccccadeeacba_',
				'babcccccaaaccba_',
				'babbbbbbbbbbbba_',
				'bbaaaaaaaaaaaab_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'fingerSlot');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbaaaaaaaaaaaab_',
				'babbbbbbbbbbbba_',
				'babccccccccccba_',
				'babccccccccccba_',
				'babccbbbbbbccba_',
				'babcbeeeeeebcba_',
				'babbedcbbcdebba_',
				'babadedhhdedaba_',
				'babcbddggfdacba_',
				'babccaaaaefacba_',
				'babccccccaeacba_',
				'babcccccccaccba_',
				'babbbbbbbbbbbba_',
				'bbaaaaaaaaaaaab_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'waistSlot');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbaaaaaaaaaaaab_',
				'babbbbbbbbbbbba_',
				'babccccccccccba_',
				'babccbbbbbbccba_',
				'babcbffffffbcba_',
				'babcbefeefebcba_',
				'babcbdeddedbcba_',
				'babcbfdcddfbcba_',
				'babcafeccefacba_',
				'babcaeebbeeacba_',
				'babcaedaadeacba_',
				'babccaaccaaccba_',
				'babbbbbbbbbbbba_',
				'bbaaaaaaaaaaaab_',
				'bbbbbbbbbbbba_b_'], pal, 2, 'legSlot');
			new Image([
				'bbbbbbbbbbbba_b_',
				'bbaaaaaaaaaaaa`_',
				'babbbbbbbbbbbba_',
				'babcccbbbbcccba_',
				'babccbdcccbccba_',
				'babccbceddebcba_',
				'babcccbceecbcba_',
				'babccbdbfebccba_',
				'babcaddbfeaccba_',
				'babcacbfcdaccba_',
				'babccaeedbaccba_',
				'babccaedcacccba_',
				'aabcccaaaccccba_',
				'_abbbbbbbbbbbba_',
				'b`aaaaaaaaaaaa`_',
				'_______________ '], pal, 2, 'footSlot');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'babbbbbbbbbbbbab',
				'babcbbcccccccbab',
				'babaecbccccccbab',
				'babacedbcccccbab',
				'babcadedbcbccbab',
				'babccadfdbfbcbab',
				'babcccadfbfacbab',
				'babccccaafaccbab',
				'babcccaeeacbcbab',
				'babccccaacaebbab',
				'aabccccccccaabaa',
				'_abbbbbbbbbbbba_',
				'bbaaaaaaaaaaaabb',
				'________________'], pal, 2, 'mainHandSlot');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'babbbbbbbbbbbbab',
				'babccbccccbccbab',
				'babcbdbbbbdbcbab',
				'babcbdeeeedbcbab',
				'babcbdeffedbcbab',
				'babcadefeedacbab',
				'babcadeeeedacbab',
				'babcacdeedcacbab',
				'babccacddcaccbab',
				'babcccaccacccbab',
				'aabccccaaccccbaa',
				'_abbbbbbbbbbbba_',
				'bbaaaaaaaaaaaabb',
				'________________'], pal, 2, 'offHandSlot');
			new Image([
				'bbbbbbbbbbbbbbbb',
				'bbaaaaaaaaaaaabb',
				'ba[[[[[[[[[[[[ab',
				'ba[[[[[[[[[[[[ab',
				'ba[[[[[[bbb[[[ab',
				'ba[[[[[[[_`b[[ab',
				'ba[[[[cccc_b[[ab',
				'ba[[[cbbbac`b[ab',
				'ba[[abbaa`c_a[ab',
				'ba[[`baaa`ca_[ab',
				'ba[[_`a```c[[[ab',
				'ba[[[_```_c[[[ab',
				'ba[[[[___[[c[[ab',
				'ba[[[[[[[[[[[[ab',
				'bbaaaaaaaaaaaabb',
				'bbbbbbbbbbbbbbbb'], pal, 2, 'emptyBagSlot');
			new Image([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				' _______________',
				'_`aaaaaaaaaaaaaa',
				'_abbbbbbbbbbbbbb',
				'_abbbbbbbbbbbbbb',
				'_`aaaaaaaaaaaaaa',
				' _______________'], pal, 2, 'xpBarLeft');
			new Image([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'________________',
				'aaaaaaaaaaaaaaaa',
				'bbbbbbbbbbbbbbbb',
				'bbbbbbbbbbbbbbbb',
				'aaaaaaaaaaaaaaaa',
				'________________'], pal, 2, 'xpBar');
			new Image([
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'                ',
				'_______________ ',
				'aaaaaaaaaaaaaa`_',
				'bbbbbbbbbbbbbba_',
				'bbbbbbbbbbbbbba_',
				'aaaaaaaaaaaaaa`_',
				'_______________ '], pal, 2, 'xpBarRight');
			new Image([
				'                ',
				'                ',
				'                ',
				'    ;<<         ',
				'   ;<==<<       ',
				'   :<=>>><      ',
				'   :;<=>>><     ',
				'    :<==>><     ',
				'    :;<==>=<    ',
				'     :;<<==<    ',
				'      ::;<<;    ',
				'        ::;     ',
				'                ',
				'                ',
				'                ',
				'                '], pal, 2, 'gold');
			new Image([
				'                ',
				'                ',
				'                ',
				'    eff         ',
				'   efggff       ',
				'   dfghhhf      ',
				'   defghhhf     ',
				'    dfgghhf     ',
				'    defgghgf    ',
				'     deffggf    ',
				'      ddeffe    ',
				'        dde     ',
				'                ',
				'                ',
				'                ',
				'                '], pal, 2, 'silver');
			new Image([
				'                ',
				'                ',
				'       <<       ',
				'      <==<      ',
				'      <==<      ',
				'      <==<      ',
				'      <==<      ',
				'      <==<      ',
				'      <==<      ',
				'      ;<<;      ',
				'       ;;       ',
				'      <==<      ',
				'      ;<<;      ',
				'       ;;       ',
				'                ',
				'                '], pal, 2, 'exclamation point');
			new Image([
				'                ',
				'      <<<<      ',
				'     <====<     ',
				'    <=<;;<=<    ',
				'    ;<;  ;=<    ',
				'     ;   ;=<    ',
				'        <==<    ',
				'       <==;     ',
				'      <==;      ',
				'      ;<<;      ',
				'       ;;       ',
				'      <==<      ',
				'      ;<<;      ',
				'       ;;       ',
				'                ',
				'                '], pal, 2, 'question mark');
			new Image([
				'                ',
				'      eeee      ',
				'     effffe     ',
				'    efeddefe    ',
				'    ded  dfe    ',
				'     d   dfe    ',
				'        effe    ',
				'       effd     ',
				'      effd      ',
				'      deed      ',
				'       dd       ',
				'      effe      ',
				'      deed      ',
				'       dd       ',
				'                ',
				'                '], pal, 2, 'gray question mark');
			new Image([
				'aaa             ',
				'`beaa           ',
				'`cbeeaa         ',
				' `cbcecaa       ',
				' `bcbceeea      ',
				'  `ccbcecea     ',
				'  `bccbceeea    ',
				'   `cbcbceca    ',
				'   `bcccbaa     ',
				'    `bcc`ca     ',
				'     `bb``ca    ',
				'      ``  ``    ',
				'                ',
				'                ',
				'                ',
				'                '], pal, 2, 'defaultCursor');
			new Image([
				'  ;;            ',
				' ;<<;   ...     ',
				' ;<<;  ./---    ',
				' ;<<; ./-//-    ',
				' ;<<;))-//-     ',
				' ;<<:/()/-      ',
				' ;<<:-/(-       ',
				'-:<<:-/(        ',
				'--::-,- ()      ',
				',:<<:,    (     ',
				' ;<<;           ',
				'  ;;            ',
				'                ',
				'                ',
				'                ',
				'                '], pal, 2, 'questCursor');
			new Image([
				'bbb             ',
				'aeeb            ',
				'adeeb           ',
				' adeeb          ',
				'  adceb         ',
				'   adceb :      ',
				'    adce:9      ',
				'     adc:9      ',
				'      ::94      ',
				'     :99454     ',
				'         459    ',
				'          9:    ',
				'                ',
				'                ',
				'                ',
				'                '], pal, 2, 'enemyCursor');
			new Image([
				'  aaa           ',
				'  aefaa         ',
				'   afafa        ',
				'   aeafaa       ',
				'  aadaeaea      ',
				' `eaccdafa      ',
				' `ffeeccda      ',
				'  ``eefec`      ',
				'   `cddd`       ',
				'  `eeccb`       ',
				'  `deed`        ',
				'   aaaa         ',
				'                ',
				'                ',
				'                ',
				'                '], pal, 2, 'interactingCursor');
			new Image([
				'      †††       ',
				'    ††‡‡‡††     ',
				'   †‡‡‡†‡†‡†    ',
				'   ‡‡‡†‡†‡†…    ',
				'  †Š‰†††‡††…    ',
				' †…††ˆˆ‡†…†…    ',
				'  ;;…†…‰…†…     ',
				' ;<=;†…ˆ……      ',
				';=;<;…… Š       ',
				' ;:;<;…… ‰Š     ',
				'::;::;:    Š    ',
				'  :: :          ',
				'                ',
				'                ',
				'                ',
				'                '], pal, 2, 'vendorCursor');
		} // gui tile images
		{
			new Image([
				'                ',
				'                ',
				'  ˆˆ            ',
				'  †‡ˆ           ',
				'   †‡ˆ          ',
				'    †‡ˆ         ',
				'     †‡ˆ        ',
				'      †‡ˆ       ',
				'       †‡ˆ      ',
				'  CC  f †ff     ',
				'  CCCCffCceˆ    ',
				'   CCCfecC†‡C   ',
				'     CCeeeCC    ',
				'       CCC      ',
				'                ',
				'                '], pal, 2, 'sharp axe interacting');
		} // interacting images
		{
			new Image([
				'    ',
				'    ',
				'    ',
				'    ',
				'    ',
				'    ',
				'    ',
				'    '], pal, 1, 'textSpace', true);
			new Image([
				'  aaaa  ',
				'   aa   ',
				'  a  a  ',
				'  a  a  ',
				'  aaaa  ',
				' a    a ',
				' a    a ',
				'aaa  aaa'], pal, 1, 'textUpperA', true);
			new Image([
				'       ',
				'       ',
				'  aaa  ',
				'     a ',
				'  aaaa ',
				' a   a ',
				' a   a ',
				'  aaa a'], pal, 1, 'textLowerA', true);
			new Image([
				'aaaaaa ',
				' a    a',
				' a    a',
				' aaaaa ',
				' a    a',
				' a    a',
				' a    a',
				'aaaaaa '], pal, 1, 'textUpperB', true);
			new Image([
				' aaa   ',
				'  a    ',
				'  a    ',
				'  aaaa ',
				'  a   a',
				'  a   a',
				'  a   a',
				' aaaaa '], pal, 1, 'textLowerB', true);
			new Image([
				'  aaa a',
				' a   aa',
				'a     a',
				'a      ',
				'a      ',
				'a     a',
				' a    a',
				'  aaaa '], pal, 1, 'textUpperC', true);
			new Image([
				'       ',
				'       ',
				'  aaa a',
				' a   aa',
				' a    a',
				' a     ',
				' a    a',
				'  aaaa '], pal, 1, 'textLowerC', true);
			new Image([
				'aaaaa  ',
				' a   a ',
				' a    a',
				' a    a',
				' a    a',
				' a    a',
				' a   a ',
				'aaaaa  '], pal, 1, 'textUpperD', true);
			new Image([
				'    aaa',
				'     a ',
				'     a ',
				'  aaaa ',
				' a   a ',
				' a   a ',
				' a   a ',
				'  aaaaa'], pal, 1, 'textLowerD', true);
			new Image([
				'aaaaaaa',
				' a    a',
				' a  a  ',
				' aaaa  ',
				' a  a  ',
				' a     ',
				' a    a',
				'aaaaaaa'], pal, 1, 'textUpperE', true);
			new Image([
				'       ',
				'       ',
				'  aaaa ',
				' a    a',
				' a  aa ',
				' aaa   ',
				' a    a',
				'  aaaa '], pal, 1, 'textLowerE', true);
			new Image([
				'aaaaaaa',
				' a    a',
				' a  a  ',
				' aaaa  ',
				' a  a  ',
				' a     ',
				' a     ',
				'aaa    '], pal, 1, 'textUpperF', true);
			new Image([
				'   aa ',
				'  a  a',
				'  a   ',
				' aaaa ',
				'  a   ',
				'  a   ',
				'  a   ',
				' aaa  '], pal, 1, 'textLowerF', true);
			new Image([
				'  aaaa a',
				' a    aa',
				'a      a',
				'a       ',
				'a    aaa',
				'a      a',
				' a     a',
				'  aaaaa '], pal, 1, 'textUpperG', true);
			new Image([
				'       ',
				'       ',
				'       ',
				'  aaaaa',
				' a   a ',
				' a   a ',
				' a   a ',
				'  aaaa ',
				'     a ',
				'     a ',
				' a   a ',
				'  aaa  '], pal, 1, 'textLowerG', true);
			new Image([
				'aaa  aaa',
				' a    a ',
				' a    a ',
				' a    a ',
				' aaaaaa ',
				' a    a ',
				' a    a ',
				'aaa  aaa'], pal, 1, 'textUpperH', true);
			new Image([
				' aaa    ',
				'  a     ',
				'  aaa   ',
				'  a  a  ',
				'  a  a  ',
				'  a  a  ',
				'  a  a  ',
				' aaa aa '], pal, 1, 'textLowerH', true);
			new Image([
				'aaaaaaa',
				'a  a  a',
				'   a   ',
				'   a   ',
				'   a   ',
				'   a   ',
				'a  a  a',
				'aaaaaaa'], pal, 1, 'textUpperI', true);
			new Image([
				'  a ',
				'    ',
				' aaa',
				'  a ',
				'  a ',
				'  a ',
				'  a ',
				' aaa'], pal, 1, 'textLowerI', true);
			new Image([
				'aaaaaaaa',
				'a    a a',
				'     a  ',
				'     a  ',
				'     a  ',
				'a    a  ',
				'a    a  ',
				' aaaa   '], pal, 1, 'textUpperJ', true);
			new Image([
				'    a ',
				'      ',
				'   aaa',
				'    a ',
				'    a ',
				'    a ',
				'    a ',
				'    a ',
				'    a ',
				'    a ',
				'a   a ',
				' aaa  '], pal, 1, 'textLowerJ', true);
			new Image([
				'aaa  aaa',
				' a    a ',
				' a   a  ',
				' aaaa   ',
				' a   a  ',
				' a    a ',
				' a    a ',
				'aa   aaa'], pal, 1, 'textUpperK', true);
			new Image([
				' aaa   ',
				'  a    ',
				'  a aaa',
				'  a  a ',
				'  aaa  ',
				'  a  a ',
				'  a  a ',
				' aa aaa'], pal, 1, 'textLowerK', true);
			new Image([
				'aaa    ',
				' a     ',
				' a     ',
				' a     ',
				' a     ',
				' a     ',
				' a    a',
				'aaaaaaa'], pal, 1, 'textUpperL', true);
			new Image([
				' aa ',
				'  a ',
				'  a ',
				'  a ',
				'  a ',
				'  a ',
				'  a ',
				'  aa'], pal, 1, 'textLowerL', true);
			new Image([
				'aa    aa',
				' aa  aa ',
				' a aa a ',
				' a    a ',
				' a    a ',
				' a    a ',
				' a    a ',
				'aaa  aaa'], pal, 1, 'textUpperM', true);
			new Image([
				'            ',
				'            ',
				' aa aa  aa  ',
				'  aa  aa  a ',
				'  a   a   a ',
				'  a   a   a ',
				'  a   a   a ',
				' aaa aaa aaa'], pal, 1, 'textLowerM', true);
			new Image([
				'aa   aaa',
				' aa   a ',
				' a a  a ',
				' a  a a ',
				' a   aa ',
				' a    a ',
				' a    a ',
				'aaa  aaa'], pal, 1, 'textUpperN', true);
			new Image([
				'        ',
				'        ',
				' aa aa  ',
				'  aa  a ',
				'  a   a ',
				'  a   a ',
				'  a   a ',
				' aaa aaa'], pal, 1, 'textLowerN', true);
			new Image([
				'  aaaa  ',
				' a    a ',
				'a      a',
				'a      a',
				'a      a',
				'a      a',
				' a    a ',
				'  aaaa  '], pal, 1, 'textUpperO', true);
			new Image([
				'      ',
				'      ',
				'  aaa ',
				' a   a',
				' a   a',
				' a   a',
				' a   a',
				'  aaa '], pal, 1, 'textLowerO', true);
			new Image([
				'aaaaa ',
				' a   a',
				' a   a',
				' a   a',
				' aaaa ',
				' a    ',
				' a    ',
				'aaa   '], pal, 1, 'textUpperP', true);
			new Image([
				'       ',
				'       ',
				' aaaaa ',
				'  a   a',
				'  a   a',
				'  a   a',
				'  a   a',
				' aaaaa ',
				'  a    ',
				'  a    ',
				'  a    ',
				' aaa   '], pal, 1, 'textLowerP', true);
			new Image([
				'  aaaa  ',
				' a    a ',
				'a      a',
				'a      a',
				'a      a',
				'a   aa a',
				' a    a ',
				'  aaaa a'], pal, 1, 'textUpperQ', true);
			new Image([
				'        ',
				'        ',
				'  aaaa  ',
				' a    a ',
				' a    a ',
				' a    a ',
				' a    a ',
				'  aaaaa ',
				'      a ',
				'      a ',
				'      a ',
				'       a'], pal, 1, 'textLowerQ', true);
			new Image([
				'aaaaaa ',
				' a    a',
				' a    a',
				' aaaaa ',
				' a  a  ',
				' a   a ',
				' a   a ',
				'aaa aaa'], pal, 1, 'textUpperR', true);
			new Image([
				'       ',
				'       ',
				' aa aa ',
				'  aa  a',
				'  a    ',
				'  a    ',
				'  a    ',
				' aaa   '], pal, 1, 'textLowerR', true);
			new Image([
				' aaaa ',
				'a    a',
				'a     ',
				' aaaa ',
				'     a',
				'a    a',
				'a    a',
				' aaaa '], pal, 1, 'textUpperS', true);
			new Image([
				'      ',
				'      ',
				'  aaa ',
				' a   a',
				'  aa  ',
				'    a ',
				' a   a',
				'  aaa '], pal, 1, 'textLowerS', true);
			new Image([
				'aaaaaaa',
				'a  a  a',
				'   a   ',
				'   a   ',
				'   a   ',
				'   a   ',
				'   a   ',
				'  aaa  '], pal, 1, 'textUpperT', true);
			new Image([
				'  a ',
				'  a ',
				' aaa',
				'  a ',
				'  a ',
				'  a ',
				'  a ',
				'   a'], pal, 1, 'textLowerT', true);
			new Image([
				'aaa  aaa',
				' a    a ',
				' a    a ',
				' a    a ',
				' a    a ',
				' a    a ',
				' a    a ',
				'  aaaa  '], pal, 1, 'textUpperU', true);
			new Image([
				'        ',
				'        ',
				' aaa aaa',
				'  a   a ',
				'  a   a ',
				'  a   a ',
				'  a   a ',
				'   aaa a'], pal, 1, 'textLowerU', true);
			new Image([
				'a     a',
				'a     a',
				'a     a',
				' a   a ',
				' a   a ',
				' a   a ',
				'  a a  ',
				'   a   '], pal, 1, 'textUpperV', true);
			new Image([
				'      ',
				'      ',
				' a   a',
				' a   a',
				' a   a',
				'  a a ',
				'  a a ',
				'   a  '], pal, 1, 'textLowerV', true);
			new Image([
				'a  aaa  a',
				'a   a   a',
				'a   a   a',
				'a   a   a',
				' a a a a ',
				' a a a a ',
				' a a a a ',
				'  a   a  '], pal, 1, 'textUpperW', true);
			new Image([
				'        ',
				'        ',
				' a     a',
				' a  a  a',
				' a  a  a',
				' a a a a',
				'  aa aa ',
				'  a   a '], pal, 1, 'textLowerW', true);
			new Image([
				'aaa  aaa',
				' a    a ',
				'  a  a  ',
				'   aa   ',
				'   aa   ',
				'  a  a  ',
				' a    a ',
				'aaa  aaa'], pal, 1, 'textUpperX', true);
			new Image([
				'        ',
				'        ',
				' aaa aaa',
				'  a   a ',
				'   aaa  ',
				'   a a  ',
				'  a   a ',
				' aaa aaa'], pal, 1, 'textLowerX', true);
			new Image([
				'aaa aaa',
				' a   a ',
				' a   a ',
				' a   a ',
				'  a a  ',
				'   a   ',
				'   a   ',
				'  aaa  '], pal, 1, 'textUpperY', true);
			new Image([
				'        ',
				'        ',
				'aaa  aaa',
				' a    a ',
				' a    a ',
				'  a  a  ',
				'  a  a  ',
				'   aa   ',
				'    a   ',
				'   a    ',
				'   a    ',
				'  a     ',], pal, 1, 'textLowerY', true);
			new Image([
				'aaaaaaa',
				'a     a',
				'    aa ',
				'   a   ',
				'  a    ',
				' a     ',
				'a     a',
				'aaaaaaa'], pal, 1, 'textUpperZ', true);
			new Image([
				'       ',
				'       ',
				' aaaaaa',
				' a   a ',
				'   aa  ',
				'  a    ',
				' a    a',
				' aaaaaa'], pal, 1, 'textLowerZ', true);
			new Image([
				' a a ',
				' a a '], pal, 1, 'textDoubleQuotes', true);
			new Image([
				' a ',
				' a '], pal, 1, 'textSingleQuotes', true);
			new Image([
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				' a'], pal, 1, 'textPeriod', true);
			new Image([
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				' a',
				' a',
				'a '], pal, 1, 'textComma', true);
			new Image([
				'  ',
				' a',
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				' a'], pal, 1, 'textColon', true);
			new Image([
				'  ',
				' a',
				'  ',
				'  ',
				'  ',
				'  ',
				'  ',
				' a',
				' a',
				'a '], pal, 1, 'textSemiColon', true);
			new Image([
				' a',
				' a',
				' a',
				' a',
				' a',
				' a',
				'  ',
				' a'], pal, 1, 'textExclamationPoint', true);
			new Image([
				'  aaaa ',
				' a    a',
				'      a',
				'    aa ',
				'   a   ',
				'   a   ',
				'       ',
				'   a   '], pal, 1, 'textQuestionMark', true);
			new Image([
				' a  ',
				'  a ',
				'   a',
				'   a',
				'   a',
				'   a',
				'  a ',
				' a  '], pal, 1, 'textParRight', true);
			new Image([
				'   a',
				'  a ',
				' a  ',
				' a  ',
				' a  ',
				' a  ',
				'  a ',
				'   a'], pal, 1, 'textParLeft', true);
			new Image([
				'   a  ',
				'  aa  ',
				' a a  ',
				'   a  ',
				'   a  ',
				'   a  ',
				'   a  ',
				' aaaaa'], pal, 1, 'textOne', true);
			new Image([
				'  aaa ',
				' a   a',
				' a   a',
				'    a ',
				'   a  ',
				'  a   ',
				' a   a',
				' aaaaa'], pal, 1, 'textTwo', true);
			new Image([
				'  aaa ',
				' a   a',
				'     a',
				'   aa ',
				'     a',
				'     a',
				' a   a',
				'  aaa '], pal, 1, 'textThree', true);
			new Image([
				'  a  a ',
				'  a  a ',
				' a   a ',
				' a   a ',
				' aaaaaa',
				'     a ',
				'     a ',
				'    aaa'], pal, 1, 'textFour', true);
			new Image([
				' aaaaa',
				' a    ',
				' a    ',
				'  aaa ',
				'     a',
				'     a',
				' a   a',
				'  aaa '], pal, 1, 'textFive', true);
			new Image([
				'   aaa',
				'  a   ',
				' a    ',
				' aaaa ',
				' a   a',
				' a   a',
				' a   a',
				'  aaa '], pal, 1, 'textSix', true);
			new Image([
				' aaaaaa',
				'      a',
				'     a ',
				'    a  ',
				'    a  ',
				'   a   ',
				'   a   ',
				'   a   '], pal, 1, 'textSeven', true);
			new Image([
				'  aaa ',
				' a   a',
				' a   a',
				'  aaa ',
				' a   a',
				' a   a',
				' a   a',
				'  aaa '], pal, 1, 'textEight', true);
			new Image([
				'  aaa ',
				' a   a',
				' a   a',
				' a   a',
				'  aaaa',
				'     a',
				'    a ',
				'  aa  '], pal, 1, 'textNine', true);
			new Image([
				'   aaa  ',
				'  a   a ',
				' a     a',
				' a  a  a',
				' a     a',
				' a     a',
				'  a   a ',
				'   aaa  '], pal, 1, 'textZero', true);
			new Image([
				'      a ',
				'      a ',
				'     a  ',
				'    a   ',
				'   a    ',
				'  a     ',
				' a      ',
				' a      '], pal, 1, 'textSlash', true);
			new Image([
				'        ',
				'        ',
				'        ',
				' aaaaaa ',
				'        ',
				'        ',
				'        ',
				'        '], pal, 1, 'textDash', true);
		} // text
		{
			/*
			[
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '
			]
			*/
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[Š[[[[[ŠŠ[[  ',
				'  [ˆˆ‰Š[[‰‰ˆˆ[  ',
				'  [ˆ‡‡ˆ‰ˆˆ‡‡ˆ[  ',
				'  [[[†ˆ††ˆ†[[[  ',
				'  [[[‰ŠŠŠŠ‰[[[  ',
				'  [[[ˆ‰‰Š‰‰[[[  ',
				'  [[[ˆˆ[‰ˆˆ[[[  ',
				'  [[[[[[[ˆ[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'ragged leather jerkin');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[ˆˆˆ[[[[[  ',
				'  [[[ˆ‡†[[[[[[  ',
				'  [[‡††ˆ‰ˆ[[[[  ',
				'  [[[[ˆ‰††ˆ[[[  ',
				'  [[[‰‡†‡‡†ˆ[[  ',
				'  [[[ˆ‡‡†‡‡ˆ[[  ',
				'  [[[‰††‡†‡‡[[  ',
				'  [[[[ˆ††††[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'brown bag');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[chhhg[[[[[  ',
				'  [cbhhgffd[[[  ',
				'  [cb[[[[ddd[[  ',
				'  [cbhgd[[[ba[  ',
				'  [dcb[[a`[[a[  ',
				'  [[dcb[[[`[`[  ',
				'  [[[dc;;[[[`[  ',
				'  [[[[[;ˆ‰[[[[  ',
				'  [[[[;[[ˆ‰[[[  ',
				'  [[[[[[[[ˆ[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'slash');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[)[[[[  ',
				'  [[[[[7(+7[[[  ',
				'  [[[))[7+)[[[  ',
				'  [[[[[7-+[7[[  ',
				'  [[[7[[+7[)[[  ',
				'  [[[[[+,7[[7[  ',
				'  [[[[220+7[[[  ',
				'  [[[200.7[[[[  ',
				'  [[[[0.[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'gouge');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[nq{qn[[[  ',
				'  [[[nqxzyqn[[  ',
				'  [[[nqy{yqn[[  ',
				'  [[nqx{yqon[[  ',
				'  [nqyzxzqo[[[  ',
				'  [q{zxoozqo[[  ',
				'  [{o{omoxyqo[  ',
				'  [oozommoyqo[  ',
				'  [[[oxoomozq[  ',
				'  [[[[o{zomo[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'animate');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[‡‡‡‡[[[[[[  ',
				'  [[‡†ŠŠŠŠ[[[[  ',
				'  [[[‡ˆ‰ŠŠ[[[[  ',
				'  [[[‡†ˆ‰ŠŠ[[[  ',
				'  [[[[‡‡‡ŠŠ[[[  ',
				'  [[[[‡†‰‰Š[[[  ',
				'  [[‡‡††‡‡‰[[[  ',
				'  [[‡‡ŠŠ‰‰ˆ[[[  ',
				'  [[[[‰ˆˆ‡‡[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'brown boots');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[222222[[[  ',
				'  [[[2/00/2[[[  ',
				'  [[[2/../2[[[  ',
				'  [[[2.-..0[[[  ',
				'  [[[0.,-.0[[[  ',
				'  [[[0/,,/2[[[  ',
				'  [[[0/[[/0[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'canvas pants');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[5[[  ',
				'  [[[[[[[[54[[  ',
				'  [[[[[[[54[[[  ',
				'  [[[[[[gh[[[[  ',
				'  [[[[[ghf[[[[  ',
				'  [[[[ghf[[[[[  ',
				'  [[[ghf[[[[[[  ',
				'  [[f[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'bread knife');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[&8[[8&[[[  ',
				'  [[&%8&&8%&[[  ',
				'  [[88988988[[  ',
				'  [[&%8%%8%&[[  ',
				'  [[8[9889[8[[  ',
				'  [[%[8%%8[%[[  ',
				'  [[[[8%[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'red lumberjack flannel');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[o}[[}o[[[  ',
				'  [[on~oo~no[[  ',
				'  [[}~<}~<~}[[  ',
				'  [[on}nn}no[[  ',
				'  [[}[<~~<[}[[  ',
				'  [[n[}nn}[n[[  ',
				'  [[[[}n[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'blue lumberjack flannel');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[Fo[[pF[[[  ',
				'  [[FEoFFoEF[[  ',
				'  [[ooOooOoo[[  ',
				'  [[FEoEEoEF[[  ',
				'  [[o[OooO[o[[  ',
				'  [[E[oEEo[F[[  ',
				'  [[[[oE[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'green lumberjack flannel');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[qqpqpq[[[  ',
				'  [[[poopop[[[  ',
				'  [[[ooonoo[[[  ',
				'  [[[ponmop[[[  ',
				'  [[[pommno[[[  ',
				'  [[[onm[oo[[[  ',
				'  [[[on[[no[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'blue jeans');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[ˆˆˆ‡[[[  ',
				'  [[[[ˆˆ‡‡††[[  ',
				'  [[[ˆˆˆ†……[[[  ',
				'  [[[ˆˆ‡‡†[[[[  ',
				'  [[ˆ‡‡††‡[[[[  ',
				'  [[‡ˆ†‡[†[[[[  ',
				'  [[†‡†‡[[[[[[  ',
				'  [[†‡†‡†[[[[[  ',
				'  [[[†††[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'thick leather gloves');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[‡[[  ',
				'  [[[[[[[[f†[[  ',
				'  [[[[[[[de[f[  ',
				'  [[[[[[‡†[ff[  ',
				'  [[[[[‡†[cef[  ',
				'  [[[[‡†[eee[[  ',
				'  [[[‡†[[[[[[[  ',
				'  [[‡†[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'sharp axe');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[v{[[{v[[[  ',
				'  [[vvzu{zvv[[  ',
				'  [[vuz{uzuv[[  ',
				'  [vvyzzzzyvv[  ',
				'  [vuyyzzyyuv[  ',
				'  [vu[[[[[[uv[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'blue dress with apron');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[zzzz[[[[  ',
				'  [[[[{{z{[[[[  ',
				'  [[[{{{{{{[[[  ',
				'  [[[{z{z{z[[[  ',
				'  [[[{z{zzz[[[  ',
				'  [[z{yzyz{z[[  ',
				'  [[yzyyyzyz[[  ',
				'  [[yyyyyyyy[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'white skirt');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[‰‰ˆ[[[  ',
				'  [[[[[‰ˆˆ‰ˆ[[  ',
				'  [[[[‰ˆˆ‰ˆ‡[[  ',
				'  [[[‰ˆˆ‰‰ˆ‡[[  ',
				'  [[‰ŒŒ‰‰ˆ‡[[[  ',
				'  [[ŒŒˆ‡[[[[  ',
				'  [[Œ‡[[[[[  ',
				'  [[ŒŒŒ[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'stale bread');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[?[[[[[[[[  ',
				'  [[>?[[[[[[[[  ',
				'  [[=[[[[[[[[[  ',
				'  [[=>[[[[[[[[  ',
				'  [[[=[[[[[[[[  ',
				'  [[[=>[>??[[[  ',
				'  [[[[===[=?[[  ',
				'  [[[[[[[[[=[[  ',
				'  [[[[[[[[[[?[  ',
				'  [[[[[[[[[[>[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'frayed clothesline');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[{{[[[[{{[[  ',
				'  [[xwy[[ywx[[  ',
				'  [[xwz[[zwx[[  ',
				'  [[xwz[[zwx[[  ',
				'  [[{{z[[z{{[[  ',
				'  [[{zy[[yz{[[  ',
				'  [[[zy[[yz[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'white shoes');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[aabc[[[  ',
				'  [[[[abcda[[[  ',
				'  [[[abcdcb[[[  ',
				'  [[[adcdba[[[  ',
				'  [[bccdba[[[[  ',
				'  [[d[ddba[[[[  ',
				'  [[b[d[a[[[[[  ',
				'  [[[[c[b[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'rodent fur');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[/1[[[[  ',
				'  [[[[[/0/0[[[  ',
				'  [[[[[01.1[[[  ',
				'  [[[[/.-101[[  ',
				'  [[[1.-[-11[[  ',
				'  [[/.[[-./.[[  ',
				'  [[[-[/-[/[[[  ',
				'  [[[[[[/[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'half digested grain');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[===[[[[[  ',
				'  [[[[=;==;[[[  ',
				'  [[[[===;:[[[  ',
				'  [[[[;;=;:[[[  ',
				'  [[[[[;=~[[[[  ',
				'  [[[[[=}[[[[  ',
				'  [[[[[}[[[[[  ',
				'  [[[[[}[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'moldy cheese');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[1)[[[[  ',
				'  [[[[[101)[[[  ',
				'  [[[[1/./)[[[  ',
				'  [[[1/.[.[[[[  ',
				'  [[[/[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'rat tooth');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[;;;[[[[[  ',
				'  [[[[[;<;[[[[  ',
				'  [[[[[;<;[[[[  ',
				'  [[[[;<==;[[[  ',
				'  [[[;=<==;[[[  ',
				'  [[[;<=<<:[[[  ',
				'  [[[:;<<;:[[[  ',
				'  [[[[::::[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'drop of sap');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[‡‡[[[[  ',
				'  [[[[[†‡‡‡[[[  ',
				'  [[[[†‡ˆ‰[[[[  ',
				'  [[[†‡‡‰[[[[[  ',
				'  [[[†††‡‰[[[[  ',
				'  [[[:[††‡‡[[[  ',
				'  [[[;[;[††‡[[  ',
				'  [[[[[<[;[†[[  ',
				'  [<;;;<;;:;;[  ',
				'  [[[:;;:::[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'sticky sap');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[>[[[[[[  ',
				'  [[[[[>[[[[[[  ',
				'  [[[[>@[[[[[[  ',
				'  [[[[@=[[<[[[  ',
				'  [[[>@=@@<[[[  ',
				'  [[[>=<@=<[[[  ',
				'  [[[=[[><[[[[  ',
				'  [[[[[[=<[[[[  ',
				'  [[[[[[<[[[[[  ',
				'  [[[[[[<[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'sugar rush');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[56555[[  ',
				'  [[[[6645[[5[  ',
				'  [[[55445[[[[  ',
				'  [[[64545[[[[  ',
				'  [[55455[[[[[  ',
				'  [[645[[[[[[[  ',
				'  [[45[[[[[[[[  ',
				'  [[4[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'dead leaf');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[ˆ[[  ',
				'  [[[[[[[[[ˆ[[  ',
				'  [[[GFˆ[[ˆ†[[  ',
				'  [[GEE[ˆ[‡[[[  ',
				'  [[E[[[‡ˆ†[[[  ',
				'  [[[[[[‡†[[[[  ',
				'  [[[[[ˆ†[[[[[  ',
				'  [[[ˆ‡†[[[[[[  ',
				'  [[[†[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'twig');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[.-[[[[[  ',
				'  [[[[[-,[[[[[  ',
				'  [[[[[yy[[[[[  ',
				'  [[[yy{y[[[[[  ',
				'  [[y[{{zy[[[[  ',
				'  [[[y{zzy[[[[  ',
				'  [[[yzzzzy[[[  ',
				'  [[[555555[[[  ',
				'  [[[445444[[[  ',
				'  [[[[4444[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'maple syrup');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[{[[[[[{[[[  ',
				'  [[[{{{{{[[[[  ',
				'  [[[{zzzz[[[[  ',
				'  [[[zxxxxx[[[  ',
				'  [[[xxxxxw[[[  ',
				'  [[[wwwww{[[[  ',
				'  [[[[yyy{{[[[  ',
				'  [[[[xxxyy[[[  ',
				'  [[[y[[[[[y[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'empty flour sack');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[22[[22[[[  ',
				'  [[op22/2po[[  ',
				'  [[op00.0po[[  ',
				'  [[op//-/po[[  ',
				'  [[nop--pon[[  ',
				'  [[[no[[on[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'outfitter shirt');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[†ˆˆˆˆ†[[[  ',
				'  [[[ˆ‡‡ˆ‡ˆ[[[  ',
				'  [[[‡ˆ‡‡‡‡[[[  ',
				'  [[[ˆ‡†††ˆ[[[  ',
				'  [[[ˆ†……†ˆ[[[  ',
				'  [[[ˆ†[[†‡[[[  ',
				'  [[[‡†[[††[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'tough leather leggings');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[EEEEE[[[[  ',
				'  [[[EDFGFGG[[  ',
				'  [[[[DFEEEF[[  ',
				'  [[[[EDGGE[[[  ',
				'  [[DDDDFEE[[[  ',
				'  [[DCEEEED[[[  ',
				'  [[[[EDDDD[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'green leather boots');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[‹‹[[[[[  ',
				'  [[[[‹ŠŠ‹[[[[  ',
				'  [[[[[zz[[[[[  ',
				'  [[[[z{{z[[[[  ',
				'  [[[[z{{z[[[[  ',
				'  [[[zxxxxz[[[  ',
				'  [[[ywwwwy[[[  ',
				'  [[[yvvwvy[[[  ',
				'  [[[[yyyy[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'flask of energy');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[//..[[[  ',
				'  [[[[/++++.[[  ',
				'  [[[/++//*-[[  ',
				'  [[[/+/***-[[  ',
				'  [[/*/**--[[[  ',
				'  [[.*/*-[[[[[  ',
				'  [[--*-[[[[[[  ',
				'  [[[--[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'raw pork haunch');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[2[[[[[  ',
				'  [[[[[[[2[[[[  ',
				'  [[[[[[[22[[[  ',
				'  [[[[[[[2-[[[  ',
				'  [[22[[2-[[[[  ',
				'  [[00220,[[[[  ',
				'  [[/000/-[[[[  ',
				'  [[[////[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'chipped tusk');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[‹‹‹[[[[  ',
				'  [[[[Š‹‹‹ŠŠ[[  ',
				'  [[[[ŠŠŠŠ‹‰[[  ',
				'  [[[‰ˆˆˆŠ‰‰[[  ',
				'  [[[‰‰ˆ‰ˆˆ‰[[  ',
				'  [[[ˆ‰ˆ‰‰‰[[[  ',
				'  [[[ˆ[ˆ‰‰ˆ[[[  ',
				'  [[[[[‰[ˆ[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'boar hide');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[‰‰‰[[[  ',
				'  [[[[[‡ˆ†ˆˆ[[  ',
				'  [[[[‡ˆ†††ˆ[[  ',
				'  [[[‡ˆ†††…ˆ[[  ',
				'  [[‰‰‰††……[[[  ',
				'  [[ˆ‡†‰……[[[[  ',
				'  [[ˆ††ˆ…[[[[[  ',
				'  [[[ˆˆˆ[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'bracers of the boar');
			new Image([
				'                ',
				'                ',
				'  [[[[[[[[[[[[  ',
				'  [[[[[[[/[[[[  ',
				'  [[[[[[//0[[[  ',
				'  [[[[[//0//[[  ',
				'  [[[[/00/..,[  ',
				'  [[[/0//.-+[[  ',
				'  [[[0/..-+[[[  ',
				'  [[[/-.-+[[[[  ',
				'  [[.-+++[[[[[  ',
				'  [.[+[[[[[[[[  ',
				'  [[+[[[[[[[[[  ',
				'  [[[[[[[[[[[[  ',
				'                ',
				'                '], pal, 2, 'cutting board');
		} // item images
		{
			var armorAnimation = 0.45;
			{
				new Animation([
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'    /1/00/1/    ',
						'   /11100111/   ',
						'   /1/1111/1/   ',
						'  /10.0110.01/  ',
						'  /10./00/.01/  ',
						'  /1/./11/./1/  ',
						'  .00/1111/00.  ',
						'   ../1001/..   ',
						'     .1001.     ',
						'     .0000.     ',
						'    /10//01/    ',
						'    .00..00.    ',
						'     ..  ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'    /1/00/1/    ',
						'   /11100111/   ',
						'   /1/1111/1/   ',
						'   .0.011/00/   ',
						'   .0./00./00/  ',
						'   ././11/./1/  ',
						'    ./1111/..   ',
						'     /1000/     ',
						'     .100/.     ',
						'     .00/00/    ',
						'    /10/.//.    ',
						'    .00....     ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'     //00./     ',
						'    /110011/    ',
						'   /1/1111/1/   ',
						'   .0.011/00/   ',
						'    ../00./0/   ',
						'    ../11/.01/  ',
						'     /1111.01/  ',
						'     /1000/..   ',
						'     .100/0/    ',
						'     .00.00.    ',
						'    /10/...     ',
						'    .00.        ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'     /.00./     ',
						'    /11001/     ',
						'    //1111/     ',
						'    /.011/0/    ',
						'    ../00.//    ',
						'     ./11.00/   ',
						'     /1111.0/   ',
						'     /100//..   ',
						'     .10/.0/    ',
						'     .00....    ',
						'    /10.        ',
						'    .00.        ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'     //00./     ',
						'    /110011/    ',
						'   /1/1111/1/   ',
						'   .0.011/00/   ',
						'    ../00./0/   ',
						'    ../11/.01/  ',
						'     /1111.01/  ',
						'     /1000/..   ',
						'     .100/0/    ',
						'     .00.00.    ',
						'    /10/...     ',
						'    .00.        ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'    /1/00/1/    ',
						'   /11100111/   ',
						'   /1/1111/1/   ',
						'   .0.011/00/   ',
						'   .0./00./00/  ',
						'   ././11/./1/  ',
						'    ./1111/..   ',
						'     /1000/     ',
						'     .100/.     ',
						'     .00/00/    ',
						'    /10/.//.    ',
						'    .00....     ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'    /1/00/1/    ',
						'   /11100111/   ',
						'   /1/1111/1/   ',
						'  /10.0110.01/  ',
						'  /10./00/.01/  ',
						'  /1/./11/./1/  ',
						'  .00/1111/00.  ',
						'   ../1001/..   ',
						'     .1001.     ',
						'     .0000.     ',
						'    /10//01/    ',
						'    .00..00.    ',
						'     ..  ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'    /1/00/1/    ',
						'   /11100111/   ',
						'   /1/1111/1/   ',
						'   /00/110.0.   ',
						'  /00/.00/.0.   ',
						'  /1/./11/./.   ',
						'   ../1111/.    ',
						'     /0001/     ',
						'     ./001.     ',
						'    /00/00.     ',
						'    .//./01/    ',
						'     ....00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'     /.00//     ',
						'    /110011/    ',
						'   /1/1111/1/   ',
						'   /00/110.0.   ',
						'   /0/.00/..    ',
						'  /10./11/..    ',
						'  /10.1111/     ',
						'   ../0001/     ',
						'    /0/001.     ',
						'    .00.00.     ',
						'     .../01/    ',
						'        .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'     /.00./     ',
						'     /10011/    ',
						'     /1111//    ',
						'    /0/110./    ',
						'    //.00/..    ',
						'   /00.11/.     ',
						'   /0.1111/     ',
						'   ..//001/     ',
						'    /0./01.     ',
						'    ....00.     ',
						'        .01/    ',
						'        .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'     /.00//     ',
						'    /110011/    ',
						'   /1/1111/1/   ',
						'   /00/110.0.   ',
						'   /0/.00/..    ',
						'  /10./11/..    ',
						'  /10.1111/     ',
						'   ../0001/     ',
						'    /0/001.     ',
						'    .00.00.     ',
						'     .../01/    ',
						'        .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1111/.    ',
						'    ./0000/.    ',
						'     .0000.     ',
						'     ./00/.     ',
						'    /1/00/1/    ',
						'   /11100111/   ',
						'   /1/1111/1/   ',
						'   /00/110.0.   ',
						'  /00/.00/.0.   ',
						'  /1/./11/./.   ',
						'   ../1111/.    ',
						'     /0001/     ',
						'     ./001.     ',
						'    /00/00.     ',
						'    .//./01/    ',
						'     ....00.    ',
						'         ..     ',
						'                ']], pal, armorAnimation, 'humanUp');
				new Animation([
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'    /1.//.1/    ',
						'   /10000001/   ',
						'   /1/1111/1/   ',
						'  /10.0110.01/  ',
						'  /10./110.01/  ',
						'  /1/./00/./1/  ',
						'  .00/1111/00.  ',
						'   ../1001/..   ',
						'     .1001.     ',
						'     .0000.     ',
						'    /11//11/    ',
						'    .00..00.    ',
						'     ..  ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'    0/.//./0    ',
						'    /000001/    ',
						'   /1/1111/1/   ',
						'   .0.0110.0/   ',
						'   .0./11010/   ',
						'  /.0./11/11.   ',
						'  .0./1111..    ',
						'   .//1001.     ',
						'    .10001.     ',
						'    .11000.     ',
						'    .00./11/    ',
						'     .. .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'     /.//./     ',
						'    0.00001/    ',
						'    ./1111/1.   ',
						'    ..0111/0.   ',
						'   /../10/10.   ',
						'   .0./1/10.    ',
						'    ./111..     ',
						'    .10001.     ',
						'    .11001.     ',
						'    .00.00.     ',
						'     .. /11/    ',
						'        .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'     /.//./     ',
						'    0.0000.0    ',
						'    ./111.1.    ',
						'    ..01100.    ',
						'    ../1011.    ',
						'     ./100..    ',
						'     .111..     ',
						'    .11001.     ',
						'    .00.01.     ',
						'     ...00.     ',
						'        /11/    ',
						'        .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'     /.//./     ',
						'    0.00001/    ',
						'    ./1111/1.   ',
						'    ..0111/0.   ',
						'   /../10/10.   ',
						'   .0./1/10.    ',
						'    ./111..     ',
						'    .10001.     ',
						'    .11001.     ',
						'    .00.00.     ',
						'     .. /11/    ',
						'        .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'    0/.//./0    ',
						'    /000001/    ',
						'   /1/1111/1/   ',
						'   .0.0110.0/   ',
						'   .0./11010/   ',
						'  /.0./11/11.   ',
						'  .0./1111..    ',
						'   .//1001.     ',
						'    .11001.     ',
						'    .10000.     ',
						'    .00./11/    ',
						'     .. .00.    ',
						'         ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'    /1.//.1/    ',
						'   /10000001/   ',
						'   /1/1111/1/   ',
						'  /10.0110.01/  ',
						'  /10./110.01/  ',
						'  /1/./11/./1/  ',
						'  .00/1111/00.  ',
						'   ../1001/..   ',
						'     .1001.     ',
						'     .0000.     ',
						'    /11//11/    ',
						'    .00..00.    ',
						'     ..  ..     ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'    0/.//./0    ',
						'    /100000/    ',
						'   /1/1111/1/   ',
						'   /0.0110.0.   ',
						'   /01011/.0.   ',
						'   .11/11/.0./  ',
						'    ..1111/.0.  ',
						'     .1001//.   ',
						'     .10001.    ',
						'     .00011.    ',
						'    /11/.00.    ',
						'    .00. ..     ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'     /.//./     ',
						'    /10000.0    ',
						'   .1/1111/.    ',
						'   .0/1110..    ',
						'   .01/01/../   ',
						'    .01/1/.0.   ',
						'     ..111/.    ',
						'     .10001.    ',
						'     .10011.    ',
						'     .00.00.    ',
						'    /11/ ..     ',
						'    .00.        ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'     /.//./     ',
						'    0.0000.0    ',
						'    .1.111/.    ',
						'    .00110..    ',
						'    .1101/..    ',
						'    ..001/.     ',
						'     ..111.     ',
						'     .10011.    ',
						'     .10.00.    ',
						'     .00...     ',
						'    /11/        ',
						'    .00.        ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'     /.//./     ',
						'    /10000.0    ',
						'   .1/1111/.    ',
						'   .0/1110..    ',
						'   .01/01/../   ',
						'    .01/1/.0.   ',
						'     ..111/.    ',
						'     .10001.    ',
						'     .10011.    ',
						'     .00.00.    ',
						'    /11/ ..     ',
						'    .00.        ',
						'     ..         ',
						'                '],
					[
						'                ',
						'                ',
						'      ////      ',
						'     /1221/     ',
						'     /1111/     ',
						'    /111111/    ',
						'    ./1001/.    ',
						'    ./0000/.    ',
						'     .j//j.     ',
						'     .0000.     ',
						'    0/.//./0    ',
						'    /100000/    ',
						'   /1/1111/1/   ',
						'   /0.0110.0.   ',
						'   /01011/.0.   ',
						'   .11/11/.0./  ',
						'    ..1111/.0.  ',
						'     .1001//.   ',
						'     .10001.    ',
						'     .00011.    ',
						'    /11/.00.    ',
						'    .00. ..     ',
						'     ..         ',
						'                ']], pal, armorAnimation, 'humanDown');
				new Animation([
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222122.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./100.    ',
						'     /22221.    ',
						'     .121/11.   ',
						'     .010/10.   ',
						'    .0.0/110.   ',
						'    ./.0.00.    ',
						'     .0.0..     ',
						'     .0.10.     ',
						'      .//0.     ',
						'     .0.110.    ',
						'     ./.000.    ',
						'      .....     ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222122.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./100.    ',
						'     /222211.   ',
						'     .121/111.  ',
						'    ..0100/21.  ',
						'   .0/.0//110.  ',
						'   .//.0/.00.   ',
						'    ..0.0...    ',
						'     ..010.     ',
						'      ./00/.    ',
						'      ../00.    ',
						'      ././.     ',
						'      ....      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222122.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./100..   ',
						'     /222211/.  ',
						'   //.121/111.  ',
						'  .01.0100.21.  ',
						'  .10..0//.11.  ',
						'   .../0../..   ',
						'     ./00..     ',
						'     .001.      ',
						'      ./00.     ',
						'      ../0.     ',
						'       ....     ',
						'       ...      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /111110.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/.    ',
						'      ./1000..  ',
						'   ///2222111/. ',
						'  /20.121/./1/. ',
						'  .00.0100/.11. ',
						'   ...000//.11. ',
						'     .1///. ..  ',
						'     .00/..     ',
						'     .0/..      ',
						'     .0//.      ',
						'      .0/..     ',
						'       ....     ',
						'        ..      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222122.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./100..   ',
						'     /222211/.  ',
						'   //.121/111.  ',
						'  .01.0100.21.  ',
						'  .10..0//.11.  ',
						'   .../0../..   ',
						'     ./00..     ',
						'     .001.      ',
						'      ./00.     ',
						'      ../0.     ',
						'       ....     ',
						'       ...      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222122.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./100.    ',
						'     /222211.   ',
						'     .121/111.  ',
						'    ..0100/21.  ',
						'   .0/.0//110.  ',
						'   .//.0/.00.   ',
						'    ..0.0...    ',
						'     ..010.     ',
						'      ./00/.    ',
						'      ../00.    ',
						'      ././.     ',
						'      ....      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222122.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./100.    ',
						'     /22221.    ',
						'     .121/11.   ',
						'     .010/10.   ',
						'    .0.0/110.   ',
						'    ./.0.00.    ',
						'     .0.0..     ',
						'     .0.10.     ',
						'      .//0.     ',
						'     .0.110.    ',
						'     ./.000.    ',
						'      .....     ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222211.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./10/     ',
						'     /22221/    ',
						'     /12/21/    ',
						'     ./1/21/    ',
						'     ../111.    ',
						'     ../00.     ',
						'     .0/...     ',
						'     .0./0/.    ',
						'     .././0/.   ',
						'    .00..000.   ',
						'    ./.../0.    ',
						'     ......     ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222121.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./00//     ',
						'      ./10/     ',
						'     /22221/    ',
						'     /1./21/    ',
						'     /.021/     ',
						'     .1111/     ',
						'     ..00..     ',
						'     .0..0.     ',
						'    .10.101.    ',
						'    .01..01.    ',
						'   .10. .010.   ',
						'   .00.  .00.   ',
						'    ..   ...    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222121.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./00//     ',
						'      ./1//     ',
						'      ./22/     ',
						'     ..002/.    ',
						'    .1102//.    ',
						'    .001/0.     ',
						'     .../0.     ',
						'    ..0..0.     ',
						'   .010.101.    ',
						'  .000..//00.   ',
						'  .01.  ../00.  ',
						'   ..     ...   ',
						'                ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222121.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./00//     ',
						'      ./10/     ',
						'     /22221/    ',
						'     /1./21/    ',
						'     /.021/     ',
						'     .1111/     ',
						'     ..00..     ',
						'     .0..0.     ',
						'    .10.101.    ',
						'    .01..01.    ',
						'   .10. .010.   ',
						'   .00.  .00.   ',
						'    ..   ...    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    /222211.    ',
						'    .111110.    ',
						'    .1j1100.    ',
						'    .01100.     ',
						'     ./000/     ',
						'      ./10/     ',
						'     /22221/    ',
						'     /12/21/    ',
						'     ./1/21/    ',
						'     ../111.    ',
						'     ../00.     ',
						'     .0/...     ',
						'     .0./0/.    ',
						'     .././0/.   ',
						'    .00..000.   ',
						'    ./.../0.    ',
						'     ......     ',
						'                ']], pal, armorAnimation, 'humanLeft');
				new Animation([
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .221222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'    .001/.      ',
						'    .12222/     ',
						'   .11/121.     ',
						'   .01/010.     ',
						'   .011/0.0.    ',
						'    .00.0./.    ',
						'     ..0.0.     ',
						'     .01.0.     ',
						'     .0//.      ',
						'    .011.0.     ',
						'    .000./.     ',
						'     .....      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .221222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'    .001/.      ',
						'   .112222/     ',
						'  .111/121.     ',
						'  .12/0010..    ',
						'  .011//0./0.   ',
						'   .00./0.//.   ',
						'    ...0.0..    ',
						'     .010..     ',
						'    ./00/.      ',
						'    .00/..      ',
						'     ././.      ',
						'      ....      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .221222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'   ..001/.      ',
						'  ./112222/     ',
						'  .111/121.//   ',
						'  .12.0010.10.  ',
						'  .11.//0..01.  ',
						'   ../..0/...   ',
						'     ..00/.     ',
						'      .100.     ',
						'     .00/.      ',
						'     .0/..      ',
						'     ....       ',
						'      ...       ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .011111/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'    ./000/.     ',
						'  ..0001/.      ',
						' ./1112222///   ',
						' ./1/./121.02/  ',
						' .11./0010.00.  ',
						' .11.//000...   ',
						'  .. .///1.     ',
						'     ../00.     ',
						'      ../0.     ',
						'      .//0.     ',
						'     ../0.      ',
						'     ....       ',
						'      ..        ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .221222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'   ..001/.      ',
						'  ./112222/     ',
						'  .111/121.//   ',
						'  .12.0010.10.  ',
						'  .11.//0..01.  ',
						'   ../..0/...   ',
						'     ..00/.     ',
						'      .100.     ',
						'     .00/.      ',
						'     .0/..      ',
						'     ....       ',
						'      ...       ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .221222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'    .001/.      ',
						'   .112222/     ',
						'  .111/121.     ',
						'  .12/0010..    ',
						'  .011//0./0.   ',
						'   .00./0.//.   ',
						'    ...0.0..    ',
						'     .010..     ',
						'    ./00/.      ',
						'    .00/..      ',
						'     ././.      ',
						'      ....      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .221222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'    .001/.      ',
						'    .12222/     ',
						'   .11/121.     ',
						'   .01/010.     ',
						'   .011/0.0.    ',
						'    .00.0./.    ',
						'     ..0.0.     ',
						'     .01.0.     ',
						'     .0//.      ',
						'    .011.0.     ',
						'    .000./.     ',
						'     .....      ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .112222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'     /01/.      ',
						'    /12222/     ',
						'    /12/21/     ',
						'    /12/1/.     ',
						'    .111/..     ',
						'     .00/..     ',
						'     .../0.     ',
						'    ./0/.0.     ',
						'   ./0/./..     ',
						'   .000..00.    ',
						'    .0/.../.    ',
						'     ......     ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .121222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     //00/.     ',
						'     /01/.      ',
						'    /12222/     ',
						'    /12/.1/     ',
						'     /120./     ',
						'     /1111.     ',
						'     ..00..     ',
						'     .0..0.     ',
						'    .101.01.    ',
						'    .10..10.    ',
						'   .010. .01.   ',
						'   .00.  .00.   ',
						'    ...   ..    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .121222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     //00/.     ',
						'     //1/.      ',
						'     /22/.      ',
						'    ./200..     ',
						'    .//2011.    ',
						'     .0/100.    ',
						'     .0/...     ',
						'     .0..0..    ',
						'    .101.010.   ',
						'   .00//..000.  ',
						'  .00/..  .10.  ',
						'   ...     ..   ',
						'                ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .121222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     //00/.     ',
						'     /01/.      ',
						'    /12222/     ',
						'    /12/.1/     ',
						'     /120./     ',
						'     /1111.     ',
						'     ..00..     ',
						'     .0..0.     ',
						'    .101.01.    ',
						'    .10..10.    ',
						'   .010. .01.   ',
						'   .00.  .00.   ',
						'    ...   ..    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'      ////      ',
						'     /2222/     ',
						'     /2222/     ',
						'    .112222/    ',
						'    .011111.    ',
						'    .0011j1.    ',
						'     .00110.    ',
						'     /000/.     ',
						'     /01/.      ',
						'    /12222/     ',
						'    /12/21/     ',
						'    /12/1/.     ',
						'    .111/..     ',
						'     .00/..     ',
						'     .../0.     ',
						'    ./0/.0.     ',
						'   ./0/./..     ',
						'   .000..00.    ',
						'    .0/.../.    ',
						'     ......     ',
						'                ']], pal, armorAnimation, 'humanRight');
				Player['animation']['sprite'] = new AnimationSet('humanUp', 'humanDown', 'humanLeft', 'humanRight', 'humanAnimation');
			} // human animations
			{
				new ShirtAnimation([
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    ‰‰    ‰‰    ',
					'   ‡ˆˆ‰‰ ‰‰ˆˆ   ',
					'   †‡‰ˆ ‰ˆˆˆ†   ',
					'    †‡‡ˆ‡ˆ‡†    ',
					'     †‡‡†‡†     ',
					'     ††††††     ',
					'                ',
					'                ',
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
					'                ',
					'    ‰‰    ‰‰    ',
					'   ˆˆ‰‰‰‰‰ˆˆ‡   ',
					'   †ˆˆˆˆˆˆˆ‡†   ',
					'    †‡ˆ‡ˆ‡‡†    ',
					'     †‡†‡‡†     ',
					'     ††††††     ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                '], pal, armorAnimation, 'ragged leather jerkin animation');
				new ShirtAnimation([
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    &&    &&    ',
					'   988:&%:889   ',
					'   7((8(#8((7   ',
					'  7:88:8%:88:7  ',
					'  &8&&8&#8&&8&  ',
					'  &  &8&%8&  &  ',
					'                ',
					'                ',
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
					'                ',
					'    &&    &&    ',
					'   988:%%:889   ',
					'   7((8((8((7   ',
					'  7:88:88:88:7  ',
					'  &8%&8&&8&%8&  ',
					'  &  %8%%8%  &  ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                '], pal, armorAnimation, 'red lumberjack flannel animation');
				new ShirtAnimation([
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    nn    nn    ',
					'   ;}~<nm<~};   ',
					'   |oo~ol~oo|   ',
					'  |<}~<~m<~}<|  ',
					'  n}no~ol~on}n  ',
					'  n  n}nm}n  n  ',
					'                ',
					'                ',
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
					'                ',
					'    nn    nn    ',
					'   ;}~<nn<~};   ',
					'   |oo~oo~oo|   ',
					'  |<}~<~~<~}<|  ',
					'  n}no~oo~on}n  ',
					'  n  n}nn}n  n  ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                '], pal, armorAnimation, 'blue lumberjack flannel animation');
				new ShirtAnimation([
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    EE    EE    ',
					'   pooNEDNoop   ',
					'   nFFoFCoFFn   ',
					'  nNooNoDNooNn  ',
					'  EoEEoECoEEoE  ',
					'  E  EoEDoE  E  ',
					'                ',
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
						'    EE    EE    ',
						'   pooNDDNoop   ',
						'   nFFoFFoFFn   ',
						'  nNooNooNooNn  ',
						'  EoDEoEEoEDoE  ',
						'  E  DoDDoD  E  ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '], pal, armorAnimation, 'green lumberjack flannel animation')
				new ShirtAnimation([
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    vy    yv    ',
					'   vw{yyvy{wv   ',
					'   vw{{vy{{wv   ',
					'  vww{{yv{{wwv  ',
					'  vvuy{{{{yuvv  ',
					'  u  y{{{{y  u  ',
					'                ',
					'                ',
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
					'                ',
					'    vy    yv    ',
					'   vw{yyyy{wv   ',
					'   vw{{{y{{wv   ',
					'  vww{{{{{{wwv  ',
					'  vvuy{{{{yuvv  ',
					'  u  y{{y{y  u  ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                '], pal, armorAnimation, 'blue farm dress top animation');
				new ShirtAnimation([
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    p.    .p    ',
					'   pq/..../qp   ',
					'   pq/0/,0/qp   ',
					'  pqq/00.0/qqp  ',
					'  poo.//,/.oop  ',
					'  o  ......  o  ',
					'                ',
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
						'    p.    .p    ',
						'   pq/..../qp   ',
						'   pq/0000/qp   ',
						'  pqq/0000/qqp  ',
						'  poo./00/.oop  ',
						'  o  ......  o  ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                '], pal, armorAnimation, 'outfitter shirt animation');
				new PantsAnimation('x', 'y', 'z', '{', pal, armorAnimation, 'white skirt animation');
				new BeltAnimation('=', '>', '?', pal, armorAnimation, 'frayed clothesline animation');
			} // shirt animations
			{
				var hairs = {
					'brown': ['„', '…', '†', '‡'],
					'red': ['5', '6', '7', '8'],
					'blond': [';', '<', '=', '>'],
					'black': [']', '^', '_', '`'],
					'white': ['e', 'f', 'g', 'h']
				};
				var hairKeys = Object.keys(hairs);
				for (var i = 0; i < hairKeys.length; i++) {
					var col = hairs[hairKeys[i]];
					new ShortHairAnimation(col[0], col[1], col[2], col[3], pal, armorAnimation, 'short ' + hairKeys[i] + ' hair animation');
					new LongHairAnimation(col[0], col[1], col[2], col[3], pal, armorAnimation, 'long ' + hairKeys[i] + ' hair animation');
					new ShortBeardAnimation(col[0], col[1], col[2], pal, armorAnimation, 'short ' + hairKeys[i] + ' beard animation');

					new Armor('short ' + hairKeys[i] + ' hair', 'booger', 0, 0, 'hair', 'short ' + hairKeys[i] + ' hair animation', {});
					new Armor('long ' + hairKeys[i] + ' hair', 'booger', 0, 0, 'hair', 'long ' + hairKeys[i] + ' hair animation', {});
					new Armor('short ' + hairKeys[i] + ' beard', 'booger', 0, 0, 'face', 'short ' + hairKeys[i] + ' beard animation', {});
				}
			} // hair animations
			{
				new BootsAnimation('‡', 'ˆ', '‰', pal, armorAnimation, 'brown boots animation');
				new BootsAnimation('x', 'y', 'z', pal, armorAnimation, 'white shoes animation');
				new BootsAnimation('D', 'E', 'F', pal, armorAnimation, 'green leather boots animation');
			} // boots animations
			{
				new PantsAnimation('.', '1', '2', '2', pal, armorAnimation, 'canvas pants animation');
				new PantsAnimation('m', 'n', 'o', 'p', pal, armorAnimation, 'blue jeans animation');
				new PantsAnimation('„', '…', '†', '‡', pal, armorAnimation, 'tough leather leggings animation');
			} // pants animations
			{
				new GlovesAnimation('„', '…', '†', pal, armorAnimation, 'thick leather gloves animation');
			} // gloves animations
			{
				new Animation([
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ††   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…†   ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †  ',
						'   †‡h†‡††‡……†‡††‡†… †  ',
						'   †††h††……[[………†‡…†† † ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ††   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…††  ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †  ',
						'   †‡h†‡††‡……†‡††‡†…  † ',
						'   †††h††……[[………†‡…††   ',
						'  [†g[h…†…[[[[[[…†…†…   ',
						' [h[gh…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ††   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…††  ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †† ',
						'   †‡h†‡††‡……†‡††‡†…   †',
						'   †††h††……[[………†‡…††   ',
						'  [†g[h…†…[[[[[[…†…†…   ',
						' [h[gh…‡…[[[[[[………[†…[  ',
						'  [ggg[†…[[[[[[……[[……[[ ',
						'   [[[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ†††  ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ… †† ',
						'   †‡‡‡†‡‡††‡†‡†‡††…   †',
						'   †‡h†‡††‡……†‡††‡†…   †',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[g[[†…[[[[[[……[[……[[ ',
						'   ggg[[[[[[[[[[[[[[[[  ',
						'    g                   '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡††   ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡‡†† ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…†  †',
						'   †‡‡‡†‡‡††‡†‡†‡††…    ',
						'   †‡h†‡††‡……†‡††‡†…    ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'   g g                  '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡†  †',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…††† ',
						'   †‡‡‡†‡‡††‡†‡†‡††…    ',
						'   †‡h†‡††‡……†‡††‡†…    ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡†   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…†  †',
						'   †‡‡‡†‡‡††‡†‡†‡††… †† ',
						'   †‡h†‡††‡……†‡††‡†…    ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡†   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…††  ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †  ',
						'   †‡h†‡††‡……†‡††‡†…  † ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡†   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…†   ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †  ',
						'   †‡h†‡††‡……†‡††‡†… †  ',
						'   †††h††……[[………†‡…†† † ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ††   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…†   ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †  ',
						'   †‡h†‡††‡……†‡††‡†… †  ',
						'   †††h††……[[………†‡…†† † ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ††   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…††  ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †  ',
						'   †‡h†‡††‡……†‡††‡†…  † ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ†††  ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ… †† ',
						'   †‡‡‡†‡‡††‡†‡†‡††…   †',
						'   †‡h†‡††‡……†‡††‡†…   †',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡††   ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡‡†† ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…†  †',
						'   †‡‡‡†‡‡††‡†‡†‡††…    ',
						'   †‡h†‡††‡……†‡††‡†…    ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡†  †',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…††† ',
						'   †‡‡‡†‡‡††‡†‡†‡††…    ',
						'   †‡h†‡††‡……†‡††‡†…    ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡†   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…†  †',
						'   †‡‡‡†‡‡††‡†‡†‡††… †† ',
						'   †‡h†‡††‡……†‡††‡†…    ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        '],
					[
						'                        ',
						'       †††              ',
						'      †ˆˆˆ†††           ',
						'  †† †ˆ‡‡ˆ‡ˆˆ†††††      ',
						'  †††ˆˆ‡‡ˆˆ‡‡ˆ‡‡ˆ‡†     ',
						'   †ˆˆ‡ˆ†ˆ‡ˆˆ‡ˆ‡ˆˆ‡†    ',
						'   †ˆ‡‡‡†‡ˆ‡ˆ‡ˆˆ‡ˆˆ‡†   ',
						'   †‡jh†‡†‡‡†ˆ†‡†‡ˆ…††  ',
						'   †‡‡‡†‡‡††‡†‡†‡††… †  ',
						'   †‡h†‡††‡……†‡††‡†…  † ',
						'   †††h††……[[………†‡…††   ',
						'  [††[h…†…[[[[[[…†…†…   ',
						' [h[[h…‡…[[[[[[………[†…[  ',
						'  [[[[[†…[[[[[[……[[……[[ ',
						'    [[[[[[[[[[[[[[[[[[  ',
						'                        ']], pal, 1.25, 'wild boar animation');
				new Animation([
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'      }}}       ',
						'     }€€€}      ',
						'    }€‚ƒ‚€}     ',
						'    }€ƒ‚‚€}     ',
						'    }‚€‚€€}    ',
						'    }}‚}€}    ',
						'    j~~}€}j    ',
						'   jjjj~~~jjj   ',
						'    jjjjjjjj    ',
						'                ',
						'                ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'     }}}}       ',
						'    }‚‚ƒ‚}}     ',
						'   }‚ƒƒ‚ƒ‚€}    ',
						'   }‚‚‚‚€€}   ',
						'   }}‚}€€}   ',
						'   j~~}€}j   ',
						'  jjjj~~~~~jjj  ',
						'    jjjjjjjj    ',
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
						'    }}   }}     ',
						'   }‚ƒ}}}ƒ‚}    ',
						'   }‚ƒƒ‚€€}   ',
						'   }‚‚‚€€}   ',
						'   j~}€}j   ',
						'  jjjj~~~~~jjj  ',
						'    jjjjjjjj    ',
						'                ',
						'                ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'      }}}       ',
						'     }€€€}      ',
						'    }€‚ƒ‚€}     ',
						'    }€ƒ‚‚€}     ',
						'    }‚€‚€€}    ',
						'    }}‚}€}    ',
						'    j~~}€}j    ',
						'   jjjj~~~jjj   ',
						'    jjjjjjjj    ',
						'                ',
						'                ',
						'                '],
					[
						'                ',
						'                ',
						'       }}       ',
						'      }€‚}      ',
						'     }€‚ƒ‚}     ',
						'     }€ƒ‚‚}     ',
						'    }‚ƒ‚‚‚}    ',
						'    }ƒ‚‚‚‚}    ',
						'    }‚€‚€€}    ',
						'     }}‚}}     ',
						'    j}~}€}}j    ',
						'   jjjj~~~jjj   ',
						'    jjjjjjjj    ',
						'                ',
						'                ',
						'                '],
					[
						'                ',
						'      }}}       ',
						'     }‚ƒ‚}      ',
						'     }ƒƒƒ}}     ',
						'     }‚ƒƒ‚}     ',
						'    }‚ƒ‚‚}     ',
						'    }ƒ‚‚‚}    ',
						'    }ƒ‚‚‚}    ',
						'    }}‚}€}    ',
						'     }}}}    ',
						'     jj~~~}     ',
						'    jjjjjjjj    ',
						'     jjjjjj     ',
						'                ',
						'                ',
						'                ']], pal, 1, 'slime');
				new Animation([
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'       :        ',
						'      :;:       ',
						'      :;;:      ',
						'     :;<>>:     ',
						'     :;<>>:     ',
						'    :;><<<;:    ',
						'   3:;<7<7<:3   ',
						'   39;<7<7;93   ',
						'   339;;<;933   ',
						'    33999933    ',
						'     333333     ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'       :        ',
						'      :;:       ',
						'      :;>:      ',
						'     :;<>>:     ',
						'    :;<<<<;:    ',
						'   :;><7<7<<:   ',
						'  39;<<7;7<;93  ',
						'  339;;;;;;933  ',
						'   3399999933   ',
						'    33333333    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      :::       ',
						'    ::;<>:::    ',
						'   :;;<<>>;;:   ',
						'   :;><<<<<;:   ',
						'  39;<77<77;93  ',
						'  339;;;;;;933  ',
						'   3399999933   ',
						'    33333333    ',
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
						'   ::::   :::   ',
						'  :;;<;:::>>;:  ',
						' 39;><<<<<>>;93 ',
						' 39;><77<77<933 ',
						' 3399;;;<;;9933 ',
						'  333999999333  ',
						'    33333333    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'      :::       ',
						'    ::;;;:::    ',
						'   :;;<<;>>;:   ',
						'   :;><<<<>;:   ',
						'  39;<77<77;:3  ',
						'  339;;<<;;933  ',
						'   3399999933   ',
						'    33333333    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'                ',
						'                ',
						'       :        ',
						'      :;:       ',
						'      :;>:      ',
						'     :;<>>:     ',
						'    :;;<<<;:    ',
						'   :;;>7<7;;:   ',
						'  39;;<7<7<;93  ',
						'  339;;<<;;933  ',
						'   3399999933   ',
						'    33333333    ',
						'                '],
					[
						'                ',
						'                ',
						'                ',
						'       :        ',
						'      ::        ',
						'      :;:       ',
						'     :;;>:      ',
						'     :;<>>:     ',
						'    :;;<<<:     ',
						'    :><7<7:     ',
						'    9;<7<7:     ',
						'    39<<<;9     ',
						'   339;<;933    ',
						'   333999933    ',
						'    3333333     ',
						'                '],
					[
						'                ',
						'        :       ',
						'       ::       ',
						'       ::       ',
						'      :;>:      ',
						'      :;>>:     ',
						'     :>;<<:     ',
						'     :<<<7:     ',
						'     :<7<7:     ',
						'     :<<<<:     ',
						'     :;<;:      ',
						'    33:;<:33    ',
						'   3339;;:933   ',
						'   3399999993   ',
						'    33333333    ',
						'                '],
					[
						'        :       ',
						'       :;:      ',
						'      :;>:      ',
						'      :;>:      ',
						'     :><<;:     ',
						'     :<<<7:     ',
						'     :<<<7<:    ',
						'     :<7<<;:    ',
						'     :<7<<:     ',
						'     :;;<<:     ',
						'      :;;:      ',
						'     339;93     ',
						'    33:;;:333   ',
						'   33:99999:33  ',
						'    333333333   ',
						'                '],
					[
						'       :::      ',
						'      :;<>:     ',
						'     :;<<>>:    ',
						'     :><<7<:    ',
						'     :<7<7<:    ',
						'     :<7<<<:    ',
						'     :;<<<;9    ',
						'     9;;<;9     ',
						'      9;;;9     ',
						'       :;:      ',
						'        ::      ',
						'     33:;:3     ',
						'    33:;;;:33   ',
						'   33:99999:33  ',
						'    333333333   ',
						'                '],
					[
						'      :::::     ',
						'     :;<<>>:    ',
						'    :;><<>>;:   ',
						'    :;<7<7<<:   ',
						'    :;<7<7<<9   ',
						'     9;<<<<9    ',
						'     9;<<<;9    ',
						'      9;;;9     ',
						'       :;:      ',
						'        ::      ',
						'        ::      ',
						'     333;:3     ',
						'    33:;;;:33   ',
						'   33:99999:33  ',
						'    333333333   ',
						'                '],
					[
						'      :::::     ',
						'     :;<<>>:    ',
						'    :;<<<>>;:   ',
						'    :;>7<7<<:   ',
						'    :;<7<7<;9   ',
						'     9;<<<<9    ',
						'     9;<<;;9    ',
						'      9;<;9     ',
						'       9;:      ',
						'        9:      ',
						'        9:      ',
						'     333;:3     ',
						'    333;;;333   ',
						'   33:99999:33  ',
						'    333333333   ',
						'                ']], pal, 1, 'living sap animation');
				new Animation([
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'   UU           ',
						'  UWWU          ',
						'  beWUbbbbbb    ',
						' bdeeeddeeeebb  ',
						' be[heeedeedeeb ',
						'bde[[bedeededeb ',
						'bddbbbccdecddeb ',
						' bb  bbccdccdcb ',
						'    bcbcbbbbcbbU',
						'   bb_bcbbccb_bU',
						' __U_bbb__bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'    UU          ',
						'   UWWU         ',
						'   beWU         ',
						'  bdeebbbbb     ',
						'  be[hddeeebb   ',
						' bde[[eedeedeb  ',
						' bddbbedeededeb ',
						'  bb bccdecddeb ',
						'     bbccdccdcb ',
						'    bcbcbbbbcbbU',
						'   bb_bcbbccb_bU',
						' __U_bbb__bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'      UU        ',
						'     bWWU       ',
						'    beeWU       ',
						'   be[hcb       ',
						'  bde[[cb       ',
						'  bddcceeb      ',
						'   bbbeedebb    ',
						'     bbddedeb   ',
						'     bccedcdeb  ',
						'     bbcccccdcb ',
						'    bcbcbbbbcbb ',
						'    b_bbbbccb_bU',
						' ____bb___bbbbVU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'    UU          ',
						'   UWWU         ',
						'   beWU         ',
						'  bdeebbbbb     ',
						'  be[hddeeebb   ',
						' bde[[eedeedeb  ',
						' bddbbedeededeb ',
						'  bb bccdecddeb ',
						'     bbccdccdcb ',
						'    bcbcbbbbcbbU',
						'   bb_bcbbccb_bU',
						' __U_bbb__bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'   UU           ',
						'  UWWU          ',
						'  beWUbbbbbb    ',
						' bdeeeddeeeebb  ',
						' be[heeedeedeeb ',
						'bde[[bedeededeb ',
						'bddbbbccdecddeb ',
						' bb  bbccdccdcb ',
						'    bcbcbbbbcbbU',
						'   bb_bcbbccb_bU',
						' __U_bbb__bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ '],
					[
						'                ',
						'                ',
						'                ',
						'   UU           ',
						'  UWWU  bbbbb   ',
						'  beWUbbeeeeeb  ',
						' beeeeeedeedeeb ',
						' be[hbedeededeb ',
						'bde[[bccdecddeb ',
						'bccb bbccdccdcb ',
						' bb bcbcbbbbcbbU',
						'   bbbcb_bccb_bU',
						' __U_bb___bb__VU',
						'____WVW____WVW__',
						'___W___VWVWV____',
						' ______________ ']], pal, 2, 'rat animation');
			} // enemy animations
			new Animation([
				[
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'      xx        ',
					'     x{{x       ',
					'    x{{{x       ',
					'    x{{x xxx    ',
					'     xx x{{{x   ',
					'    x{{x xx{x   ',
					'   x{{x    xx   ',
					'   x{{x         ',
					'    xx          ',
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
					'       xxx      ',
					'      x{{x      ',
					'     x{{x       ',
					'     x{x        ',
					'      x         ',
					'         xxx    ',
					'    xx    x{x   ',
					'   x{{x   x{{x  ',
					'   x{{x    xxx  ',
					'   x{{x         ',
					'    xxx         ',
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
					'        xxx     ',
					'       x{{x     ',
					'      x{{{x     ',
					'      x{xx      ',
					'      xx        ',
					'                ',
					'                ',
					'          xx    ',
					'   xxx    x{x   ',
					'   x{x    x{x   ',
					'   x{{x   xxx   ',
					'    x{{x        ',
					'     xxx        ',
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
					'        xxx     ',
					'       x{{{x    ',
					'       x{{x{x   ',
					'       xxx xx   ',
					'                ',
					'                ',
					'                ',
					'                ',
					'          x     ',
					'     x   x{x    ',
					'    x{x  x{{x   ',
					'    x{{x xxx    ',
					'     x{{x       ',
					'      xxx       ',
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
					'         xxx    ',
					'        x{{{x   ',
					'        xx{{{x  ',
					'          x{{x  ',
					'           xxx  ',
					'                ',
					'                ',
					'                ',
					'         x      ',
					'        x{x     ',
					'     xxx xx     ',
					'     x{{x x     ',
					'      x{{x      ',
					'       xxx      ',
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
					'          xxx   ',
					'         x{{{x  ',
					'          x{{x  ',
					'           x{x  ',
					'           x{x  ',
					'           xx   ',
					'                ',
					'                ',
					'         x      ',
					'        xx      ',
					'      xxxx      ',
					'      xxxxx     ',
					'       xxxx     ',
					'        xx      ',
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
					'           xx   ',
					'          x{{x  ',
					'          x{{x  ',
					'          x{x   ',
					'          xxx   ',
					'                ',
					'                ',
					'                ',
					'        x       ',
					'      xx{x      ',
					'     x{{{{x     ',
					'     x{x{{{x    ',
					'     xx x{{x    ',
					'         xx     ',
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
					'          xx    ',
					'          x{x   ',
					'         x{{x   ',
					'         x{{x   ',
					'          xx    ',
					'                ',
					'                ',
					'                ',
					'                ',
					'     x          ',
					'    x{x   xx    ',
					'    x{x  x{{x   ',
					'    xx   x{{x   ',
					'          xx    '],
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
					'         xxx    ',
					'         x{x    ',
					'          xx    ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    x           ',
					'    xx     xx   ',
					'    xx    x{x   ',
					'          xx    '],
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
					'          xx    ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'    x      xx   ',
					'           x    '],
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
					'                ',
					'                ',
					'                ',
					'                ']], pal, .75, 'death animation');
		} // animations
		{
			new Enemy('slime', 'slime', 1, 4, 2, 100, 100, 1, 3, 4, 0, 4, { 'booger': 100, 'skull': 50 }, true);
			new Enemy('living sap animation', 'living sap', 1, 2, 15, 25, 3, 80, 60, 4, 8, 5, 0, 4, { 'twig': 45, 'dead leaf': 60, 'drop of sap': 45, 'maple syrup': 20 }, true, 'sticky sap');
			new Enemy('rat animation', 'rat', 1, 2, 10, 15, 3, 80, 40, 5, 5, 5, 0, 5, { 'empty flour sack': 5, 'rat tooth': 10, 'moldy cheese': 50, 'half digested grain': 20, 'rodent fur': 60 }, true);
			new Enemy('wild boar animation', 'wild boar', 3, 5, 20, 25, 2, 100, 75, 2, 5, 5, 0, 0, { 'bracers of the boar': 5, 'tough leather leggings': 5, 'boar hide': 50, 'chipped tusk': 75, 'raw pork haunch': 65 }, false, 'gouge');
		} // enemies
		{
			Player['bar'] = new Bar(['kkkkkwyzLLLLLST']);
			Player['info'] = new Alert([
				'eaaaf',
				'cjjjd',
				'gbbbh']);
			Player['lootbox'] = new LootBox([
				'eax',
				'ckd',
				'gbh'
			]);
			Player['questGui'] = new QuestGui([
				'eaaaaaaaax',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'gbbbbbbbb*'
			]);
			Player['questDetailsGui'] = new QuestDetailsGui([
				'eaaaaaaaax',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'cjjjjjjjjd',
				'gbbbbbbbb*'
			]);
			Player['spellBookGui'] = new SpellBookGui([
				'eaaax',
				'ckkkd',
				'ckkkd',
				'ckkkd',
				'ckkkd',
				'ckkkd',
				'ckkkd',
				'RbbbQ'
			]);
			Player['vendorGui'] = new VendorGui([
				'eaaax',
				'ckjkd',
				'ckjkd',
				'ckjkd',
				'ckjkd',
				'ckjkd',
				'gbbbh'
			]);
			Player['xpBar'] = new XpBar([
				'NOOOOOOOOOOOOOOOOOOOOOOP'
			]);
			Player['questLogGui'] = new QuestLogGui([
				'eaaax',
				'cjjjd',
				'cjjjd',
				'cjjjd',
				'cjjjd',
				'cjjjd',
				'gbbbh']);
		} // guis
		{
			{ } // hair
			{
				new Armor('worn boots', 'brown boots', 12, 2, 'feet', 'brown boots animation', { 'armor': 2 });
				new Armor('white shoes', 'white shoes', 14, 2, 'feet', 'white shoes animation', { 'armor': 2 });
				new Armor('green leather boots', 'green leather boots', 20, 3, 'feet', 'green leather boots animation', { 'armor': 4, 'luck': 1 });
			} // boots
			{
				new Armor('ragged leather jerkin', 'ragged leather jerkin', 24, 4, 'chest', 'ragged leather jerkin animation', { 'armor': 6 });
				new Armor('red lumberjack flannel', 'red lumberjack flannel', 45, 8, 'chest', 'red lumberjack flannel animation', { 'armor': 10, 'strength': 2 });
				new Armor('blue lumberjack flannel', 'blue lumberjack flannel', 50, 9, 'chest', 'blue lumberjack flannel animation', { 'armor': 11, 'vigor': 2 });
				new Armor('green lumberjack flannel', 'green lumberjack flannel', 52, 10, 'chest', 'green lumberjack flannel animation', { 'armor': 12, 'luck': 2 });
				new Armor('blue farm dress top', 'blue farm dress top', 18, 3, 'chest', 'blue farm dress top animation', { 'armor': 4 });
				new Armor('outfitter shirt', 'outfitter shirt', 45, 9, 'chest', 'outfitter shirt animation', { 'armor': 9, 'vitality': 3 });
			} // shirts
			{
				new BagItem('brown bag', 'brown bag', 103, 32, 8);
				new BagItem('empty flour sack', 'empty flour sack', 56, 10, 2);
			} // bags
			{
				new Armor('canvas pants', 'canvas pants', 18, 3, 'legs', 'canvas pants animation', { 'armor': 4 });
				new Armor('blue jeans', 'blue jeans', 24, 4, 'legs', 'blue jeans animation', { 'armor': 6 });
				new Armor('white skirt', 'white skirt', 15, 3, 'legs', 'white skirt animation', { 'armor': 3 });
				new Armor('tough leather leggings', 'tough leather leggings', 34, 6, 'legs', 'tough leather leggings animation', { 'armor': 5, 'strength': 1 });
			} // pants
			{
				new Armor('thick leather gloves', 'thick leather gloves', 20, 3, 'hands', 'thick leather gloves animation', { 'armor': 2 });
			} // gloves
			{
				new Armor('frayed clothesline', 'frayed clothesline', 17, 3, 'waist', 'frayed clothesline animation', { 'armor': 3 });
			} // belts
			{
				new Armor('bracers of the boar', 'bracers of the boar', 36, 7, 'wrists', 'nothing', { 'armor': 2, 'strength': 1 });
			} // bracers
			{
				new Armor('bread knife', 'bread knife', 30, 5, 'mainhand', 'nothing', { 'weapon damage': 10 });
				new Armor('cutting board', 'cutting board', 70, 12, 'offhand', 'nothing', { 'armor': 5, 'fortitude': 10 });
			} // weapons
			{
				new Food('stale bread', 'stale bread', 8, 2, 15);
			} // food
			{
				new Item('half digested grain', 'half digested grain', 8, 1);
				new Item('rodent fur', 'rodent fur', 12, 3);
				new Item('moldy cheese', 'moldy cheese', 11, 2);
				new Item('rat tooth', 'rat tooth', 15, 3);
				new Item('drop of sap', 'drop of sap', 19, 4);
				new Item('twig', 'twig', 13, 3);
				new Item('dead leaf', 'dead leaf', 12, 2);
				new Item('raw pork haunch', 'raw pork haunch', 25, 5);
				new Item('chipped tusk', 'chipped tusk', 23, 4);
				new Item('boar hide', 'boar hide', 26, 5);
			} // junk
			{
				new Consumable('maple syrup', 'maple syrup', 40, 7, 'sugar rush');
			} // consumables
			{
				new Rune('flask of energy', 'flask of energy', 120, 20, 'animate');
			} // runes
			new Item('sharp axe', 'sharp axe', 36, 6);
		} // items
		{
			new Screen(0, 0, 0, 'overworld', [
				'$$$$$$$$$$$$$$$$$$$$$$$$',
				'$$$(!($$$($$$456$$$$$$($',
				'$$$!!!!$$$$$$.0/$$!$$$$$',
				'(!!JKK45556$!)-*!JKKKI$$',
				'$!!HFF12223!!!!(!HF!FH$$',
				'!!!HFF.000/!!!!!!HF!FH!$',
				'!T!LKK),+-*!!G!FFLM!LM!!',
				'!!!!!!$!(!!%&!!!!!!&!!!!',
				'!!!!%&!!!!!&!!F!!!!!!%!!',
				'!!$!!E!!!%!!!!!E!(!%!EF!',
				'&!!!E!!!!!E$$!!!!E!!!!!!',
				'!%&!!!E$F!!$#$!!!!!E!!&!',
				'!%!#!!EEE!!!(!E%%!EE$E%&',
				'!(!!!!!E!!!!!!!!%#!EE!%!',
				'!!!!%!%&!(!!!E!!!!!&!!!!',
				'!!!!!!&!!!!!!!!!!!&%!!!!'],
				{
					'quest': [
						{ 'name': 'James Sliver', 'x': 13, 'y': 9 },
						{ 'name': 'Charles Hackitt', 'x': 2, 'y': 4 }
					],
					'vendor': [
						{ 'name': 'Outfitter Eric', 'x': 19, 'y': 4 }
					]
				});
			new Screen(1, 0, 0, 'overworld', [
				'$$$$$$$$$$$$$$$$$$$$$$$$',
				'$$$$$$$$$$$$$$$$$($$$$$$',
				'$$$$($$$$$$($$$$$$!$$$$$',
				'$$$$!$$$$($$$$($$$!$!$($',
				'($!!!$$$!$$$$!!$$!!!!$$$',
				'E!!!!!$$!!!$!!!$#!&$$$$$',
				'!!!$!!$!!!!!!(!!!&%%!$$$',
				'!&!!!!!!!$&%!!!!$!!!!$$$',
				'!!&E$&!!!!%!!!!$$$!!$$$$',
				'!!EEE#!E!!!$!!!!$(!$$$($',
				'!!!EE(!!&!!($$!!!!&!!$$$',
				'!!!!!!!!!!$$$$$!&&!!$$$$',
				'!!!%E%&!!$$$$$#!!$!!$$$$',
				'!!EEEE%!!!$($!&!$$$!!$$$',
				'!!!E!%!!!!!#!&%&!$!!$($$',
				'!!!!!!!!!!!!!!!!!!!$$$$$']);
			new Screen(-1, 0, 0, 'overworld', [
				'$$$$$$$$$$$$$$$$$$$$$$$$',
				'$($$$$$($$$$$$$$$($$$($$',
				'$$$$!$($$$$($$$$$$$!$$$$',
				'$$!!!!$$$$$!$$!!!$!!$!$(',
				'$$$$!&%!$!!!$!!&!!!!&!!$',
				'$($!#!%&!!!!!!&%!!!&%!!!',
				'$$($$!!&!!!!(#!!$(!!&(!!',
				'$$$$!!!!$!!!!!!$$$$!!!!!',
				'$$(!!!!$$$(!!!!$#$!!!!!!',
				'$$$!&!!!$($!!&!!!!!!!EF!',
				'($$%%!!!!!$!!!!!!!!!$EE!',
				'$$$$&(!!!!!!!!$$$!!!!!#!',
				'$$$!!!!!#!!%!$$($E!!!&!!',
				'$$!!!!!#(!%&&!$$$E!!&%!!',
				'$($!!!!!!!&%!!!$EEF!!(!!',
				'$$$$!!!!!!!!!!!!!!!!!!!!']);
			new Screen(-1, 1, 0, 'overworld', [
				'$$$$!!!!!!&!!!!!!!!!!!!!',
				'$$$#!!!!!%&%!!$!!!$$!!!!',
				'$$(!!!!$!!!&!!!!!!$!!!!!',
				'$!!!$!$($!!$!!#!$!!!($$!',
				'$$!!!!!$$!!!!!!!$$$!!$!!',
				'$$!!!!!!!&%&!!$$$$$!!!!!',
				'$$$!!&&!!%&!!!!$$(!!!&&!',
				'$($!!&%!$$#!!!!!$$!!!%!%',
				'$$$!!!&$$$$$!!&!!!!(!&%!',
				'$$(!$&!!$($!!!%&!!!!!!&!',
				'$$$$$!!!$!!!!!!!!!!!!#!!',
				'$$$$!!!!&!!!!$$!(!!!$$!$',
				'$$(($#!!&%&!!!$!!!!!$$$$',
				'($$$$$$!!!$!!#$$$!!!!$$$',
				'$$$$$$($$$$$$$$($$!%!$$$',
				'$$$$$$$$$$$($$$$$$$!!!$$'],
				{
					'interacting': [
						{ 'name': 'sharp axe', 'x': 6, 'y': 10 }
					],
					'enemy': [
						{ 'name': 'living sap', 'x': 3, 'y': 4 },
						{ 'name': 'living sap', 'x': 7, 'y': 6 },
						{ 'name': 'living sap', 'x': 4, 'y': 11 },
						{ 'name': 'living sap', 'x': 13, 'y': 7 },
						{ 'name': 'living sap', 'x': 18, 'y': 10 },
						{ 'name': 'living sap', 'x': 19, 'y': 3 },
						{ 'name': 'living sap', 'x': 17, 'y': 13 },
						{ 'name': 'living sap', 'x': 15, 'y': 2 },
					]
				});
			new Screen(0, 1, 0, 'overworld', [
				'!!!!!!!!!!!!!!!!!!!!!!!!',
				'!!!!E!!&%!EE!!&!!E!!!!!!',
				'!!!$EE!(&EEEE!&%EEF!#$!!',
				'!$$$E!!!!!!FE!!EEF!!$$$!',
				'!#($!%!!!!!!!!!!#!!!!($!',
				'!!!!!!!$!!!!!!%!!!!!!!!!',
				'!!!!$!!!$!$$!!!E!!!$$!&&',
				'!!&%&!!$$$$$(!!&E!$($&%!',
				'!(%&!!!!$($$!!(!!!$$#%(!',
				'!!&!!$!!!#$$!!!!!!!$!!&!',
				'!!!!$($!!!!!&!!$!!!!!!!!',
				'$!!!!$!!!!&%%!$($!!!!$!!',
				'$$!!!!!!$!!&!$$$$!$!!!!$',
				'($$$$!#$$$$!$$$$$($$#$$$',
				'$$$$$$($$$$$$$$$$$$$$$$$',
				'($$$($$$$$$$$($$$$$$$$($']);
			new Screen(1, 1, 0, 'overworld', [
				'!!!!!!!!!&&!!!!!!!!$$$$$',
				'!!!!E!!!!!%&%!!$!&&!($$$',
				'!!!EE#!!FF!!!!$$$!%!#$$(',
				'!!EFE$!!EEFE!!$($$!%!$$$',
				'!!$$E(!!!EE#!!!$$!!&&$$$',
				'!!#$!!!!!!!!!!!!!!!%!!$$',
				'!!!!%!$$!!!!!$$!!(!!!$$$',
				'!!!!&$$$$$!!$$#!&!!!$$$$',
				'!$!&%$$($!&!$(!%&!!!$($$',
				'!$$!!$#$!!&!!!!!!!$!$$($',
				'!($!!!!!!!%&!!!$$!#!!$$$',
				'!!!!&!!!!(!!!!$$$!!!$$$$',
				'$!#&%!$!(!!!$$$($$!$$$($',
				'($!!!$$$$$$($$$$$$$$$$$$',
				'$$$$$$$$$$$$$$$$$$$($$$$',
				'$$$$($$$($$$$($$($$$$$$$'],
				{
					'enemy': [
						{ 'name': 'wild boar', 'x': 18, 'y': 11 },
						{ 'name': 'wild boar', 'x': 8, 'y': 11 },
						{ 'name': 'wild boar', 'x': 12, 'y': 10 },
						{ 'name': 'wild boar', 'x': 11, 'y': 6 },
						{ 'name': 'wild boar', 'x': 14, 'y': 4 },
						{ 'name': 'wild boar', 'x': 17, 'y': 9 },
						{ 'name': 'wild boar', 'x': 21, 'y': 5 },
						{ 'name': 'wild boar', 'x': 18, 'y': 2 },
					]
				});
			new Interior(0, 0, 0, 9, 6, 'overworld', 11, 9, 11, 10, [
				'                        ',
				'                        ',
				'                        ',
				'                        ',
				'                        ',
				'      <888888=          ',
				'      :PQ77S7;          ',
				'      :NO7DCD;          ',
				'      :777777;          ',
				'      :RA77A7;          ',
				'      >9B99@9?          ',
				'                        ',
				'                        ',
				'                        ',
				'                        ',
				'                        '], {
				'quest': [
					{ 'name': 'Matilda Sliver', 'x': 11, 'y': 8 }
				]
			});
			new Interior(0, 0, 0, 14, 3, 'overworld', 11, 9, 11, 10, [
				'                        ',
				'                        ',
				'                        ',
				'                        ',
				'                        ',
				'        <88888=         ',
				'        :CR7RR;         ',
				'        :7777R;         ',
				'        :7R777;         ',
				'        :77A77;         ',
				'        >99@99?         ',
				'                        ',
				'                        ',
				'                        ',
				'                        ',
				'                        '], {
				'enemy': [
					{ 'name': 'rat', 'x': 9, 'y': 8 },
					{ 'name': 'rat', 'x': 11, 'y': 6 },
					{ 'name': 'rat', 'x': 12, 'y': 7 },
				]
			});
		} // maps
		{
			new Dimension('overworld', 0, 0, 0, 288, 256);
		} // dimensions
		{
		} // portals
		{
			new Animation([
				[
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'            ff  ',
					'           ehhf ',
					'           eghf ',
					'            ee  ',
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
					'           ff   ',
					'          fhhf  ',
					'          egghf ',
					'           eegf ',
					'             e  ',
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
					'         ff     ',
					'        fhhff   ',
					'        fgghhf  ',
					'         eegghf ',
					'           eegf ',
					'             e  ',
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
					'       ff       ',
					'      fhhff     ',
					'      fhhhhff   ',
					'      egggghhf  ',
					'       eeeegghf ',
					'           eegf ',
					'             e  ',
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
					'     ffff       ',
					'    fhhhhff     ',
					'   ehhhhhhhff   ',
					'   ehhhgggghhf  ',
					'    eggeeeeggf  ',
					'     ee    ee   ',
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
					'     ffff       ',
					'   ffhhhhff     ',
					'  fhhhhhhhhf    ',
					'  fhhhhgggggf   ',
					' fhhhhgeeeee    ',
					' fhhhge         ',
					'  egge          ',
					'   ee           ',
					'                ',
					'                ',
					'                '],
				[
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'     ffff       ',
					'   ffhhhhf      ',
					'  fhhhhhhf      ',
					'  fhhhhggf      ',
					' fhhhhgee       ',
					' fhhhge         ',
					'  egge          ',
					'   ee           ',
					'                ',
					'                ',
					'                '],
				[
					'                ',
					'                ',
					'                ',
					'                ',
					'                ',
					'     fff        ',
					'   ffhhf        ',
					'  fhhhhhf       ',
					'  fhhhhgf       ',
					' fhhhhge        ',
					' fhhhge         ',
					'  egge          ',
					'   ee           ',
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
					'   ff           ',
					'  fhhf          ',
					'  fhhhf         ',
					' fhhhgf         ',
					' fhhhge         ',
					'  egge          ',
					'   ee           ',
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
					'   ff           ',
					'  fhhf          ',
					' fhhhff         ',
					' fhhhge         ',
					'  egge          ',
					'   ee           ',
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
					' fff            ',
					' fhhf           ',
					'  ehge          ',
					'   ee           ',
					'                ',
					'                ',
					'                ']], pal, 0.2, 'slash animation');
		} // ability animations
		{
			new Ability('slash', 'damage', 'slash', 'slash animation', 10, 20, 20, 2.5);
			new Ability('animate', 'buff', 'animate', 'slash animation', 'energized', 0, 20, 30);
		} // abilities
		{
			new Npc('James Sliver', 'quest', 'humanAnimation', {
				'hair': 'short brown hair',
				'face': 'short brown beard',
				'chest': 'red lumberjack flannel',
				'legs': 'blue jeans',
				'feet': 'worn boots'
			});
			new Npc('Charles Hackitt', 'quest', 'humanAnimation', {
				'hair': 'short blond hair',
				'chest': 'green lumberjack flannel',
				'legs': 'blue jeans',
				'feet': 'worn boots'
			});
			new Npc('Outfitter Eric', 'vendor', 'humanAnimation', {
				'hair': 'short black hair',
				'chest': 'outfitter shirt',
				'legs': 'tough leather leggings',
				'boots': 'green leather boots'
			}, ['maple syrup', 'stale bread']);
			new Npc('Matilda Sliver', 'quest', 'humanAnimation', {
				'chest': 'blue farm dress top',
				'hair': 'long black hair',
				'legs': 'white skirt',
				'feet': 'white shoes'
			});
		} // npcs
		{
			new Interacting('sharp axe', 'sharp axe interacting', 'loot', { 'sharp axe': 100 }, false);
		} // interactings
		{
			new Quest('The Lost Axe', 'James Sliver', 'James Sliver', 'nothing', { 'thick leather gloves': 1 }, 25, 10, 'gather', 'sharp axe', 1,
				'Be careful %, there have been some strange things in the forest of late. The other day I was gathering wood, and was set upon by vicious monsters! I was so frightened, I dropped my axe. You look like a brave fellow! Perhaps you could recover it for me. Go southwest, you should find it lying somewhere in the forest.',
				'Thank you %, take these gloves as a token of my gratitude! May they serve you well in future endeavours.');
			new Quest('Sticky Situation', 'James Sliver', 'James Sliver', 'The Lost Axe', { 'blue lumberjack flannel': 1 }, 50, 25, 'kill', 'living sap', 6,
				'Well, you retrieved my axe, but it isn\'t going to do much good if I can\'t even reach the trees! It seems that something has corrupted the trees, and even their sap is unfriendly. I need your strong blade to clear the forest of this danger! Slay the living sap so I can return to my work.',
				'I wonder what could have caused the trees to turn against us in such a manner... Nevertheless, your service will not be forgotten, take this as a reward.');
			new Quest('Pesky Rats', 'Matilda Sliver', 'Matilda Sliver', 'nothing', { 'frayed clothesline': 1, 'stale bread': 5 }, 25, 5, 'kill', 'rat', 3,
				'Oh we\'ll be eaten out of house and home! When my husband isn\'t emptying our larder, the rats are. %, please go and exterminate the pesky vermin. I cannot convince James that chopping rats is as necessary as chopping wood.',
				'Thank you for your service %! Take these, if it wasn\'t for you they would have no doubt ended up in the stomach of a rodent.');
			new Quest('Sugary Concoction', 'Charles Hackitt', 'Charles Hackitt', 'The Lost Axe', { 'flask of energy': 1 }, 85, 30, 'gather', 'maple syrup', 2,
				'Something has given those trees energy, and I think I could brew something up to store and redirect all of that power. %, If you gather me some maple syrup from the slain monsters, I can create a concentrate which you can use in future battles.',
				'There, that should do it! May this brew %, and it will help you in the many future battles you will surely face.');
			new Quest('Empty Stomach', 'James Sliver', 'Matilda Sliver', 'Sugary Concoction', {}, 25, 0, 'speak', 'nothing', 0,
				'%! My growling stomach tells me that the day is almost over. Go into the house and ask Matilda if supper is almost ready. I would go myself, but last time I asked, Matilda wasn\'t very pleased that I inquired before she had finished cooking the meat... I never knew she could swing a pan that fast!',
				'How in the world does he expect me to cook a meal when he doesn\'t provide any meat! Tell him if he wants his dinner, he must first get me something to cook!');
			new Quest('Tasty Pork', 'James Sliver', 'Matilda Sliver', 'Empty Stomach', { 'cutting board': 1 }, 90, 10, 'gather', 'raw pork haunch', 6,
				'I\'ve been so busy dealing with those monsters, I haven\'t had time to hunt for food, perhaps you could get some meat from the wild boars southeast of here? Bring any food you get to my wife, hopefully she can use it for dinner tonight',
				'These should cook up just fine! I don\'t have much to give you, but take this cutting board, it should help protect you against enemy\'s attacks.');
		} // quests
		{
			new Buff('sticky sap', 'sticky sap', 'speed', -1.5, 10);
			new Buff('sugar rush', 'sugar rush', 'vigor', 3, 120);
			new Buff('energized', 'sugar rush', 'vigor', 5, 300);
			new Buff('gouge', 'gouge', 'vitality', -7, 5);
		} // buffs
		var loadAll = function () {
			fill(0xFFFFFFFF);
			textAlign(CENTER, CENTER);
			textSize(25);
			if (count.images === undefined) {
				count = {
					images: load.images.length,
					texts: load.texts.length,
					animations: load.animations.length,
					tiles: load.tiles.length,
					quests: load.quests.length,
					guis: load.guis.length,
					npcs: load.npcs.length,
					interiors: load.interiors.length,
					screens: load.screens.length
				};
			}
			if (load.images.length > 0) { // loads the images
				load.images[0].load();
				load.images.splice(0, 1);
				text('Loading Images', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.images.length / count.images), 20);
			} else if (load.texts.length > 0) { // loads text
				load.texts[0].load();
				load.texts.splice(0, 1);
				text('Loading Texts', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.texts.length / count.texts), 20);
			} else if (load.animations.length > 0) { // loads animations
				load.animations[0].load();
				load.animations.splice(0, 1);
				text('Loading Animations', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.animations.length / count.animations), 20);
			} else if (load.tiles.length > 0) { // loads tiles
				load.tiles[0].load();
				load.tiles.splice(0, 1);
				text('Loading Tiles', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.tiles.length / count.tiles), 20);
			} else if (load.guis.length > 0) { // loads guis
				load.guis[0].load();
				load.guis.splice(0, 1);
				text('Loading User Interface', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.guis.length / count.guis), 20);
			} else if (load.quests.length > 0) { // loads guis
				load.quests[0].load();
				load.quests.splice(0, 1);
				text('Loading Quests', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.quests.length / count.quests), 20);
			} else if (load.npcs.length > 0) { // loads npcs
				load.npcs[0].load();
				load.npcs.splice(0, 1);
				text('Loading NPCs', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.npcs.length / count.npcs), 20);
			} else if (load.interiors.length > 0) { // loads interiors
				load.interiors[0].load();
				load.interiors.splice(0, 1);
				text('Loading Rooms', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.interiors.length / count.interiors), 20);
			} else if (load.screens.length > 0) { // loads maps
				load.screens[0].load();
				load.screens.splice(0, 1);
				text('Loading Maps', 384, 272);
				noFill();
				stroke(0xFFFFFFFF);
				strokeWeight(2);
				rect(90, 290, width - 180, 40);
				noStroke();
				fill(0xFFFFFFFF);
				rect(100, 300, (width - 200) - (width - 200) * (load.screens.length / count.screens), 20);
			} else {
				if (saveFile.length > 0) {
					Player.loadSave();
				} else {
					items['brown bag'].use();
					items['worn boots'].use();
					items['ragged leather jerkin'].use();
					items['short brown hair'].use();
					//items['short brown beard'].use();
					items['canvas pants'].use();
					items['bread knife'].use();
					abilities['slash'].learn();
					Player['loc']['x'] = dimensions[Player['loc']['current dimension']].x;
					Player['loc']['y'] = dimensions[Player['loc']['current dimension']].x;
					Player['loc']['scene']['x'] = dimensions[Player['loc']['current dimension']].sx;
					Player['loc']['scene']['y'] = dimensions[Player['loc']['current dimension']].sy;
					Player['loc']['scene']['z'] = dimensions[Player['loc']['current dimension']].sz;
				}
				loaded = true;
			}
		};
		draw = function () {
			background(0xFF000000);
			if (!loaded && width === 768) {
				loadAll();
			} else {
				cursor('none');
				World.draw(Player['loc']['scene']['x'], Player['loc']['scene']['y'], Player['loc']['scene']['z'], Player['loc']['current dimension']);
				Player.movement();
				World.topDraw(Player['loc']['scene']['x'], Player['loc']['scene']['y'], Player['loc']['scene']['z'], Player['loc']['current dimension']);
				Player['bar'].draw(0, height - REAL_SIZE);
				Player['healthBar'].draw(0, 0, Player['stats']['curFortitude'], Player['stats']['fortitude'], Player['stats']['curEndurance'], Player['stats']['endurance'], Player['stats']['vitality'], Player['stats']['vigor'], Player['stats']['luck'], Player['stats']['strength'], Player['stats']['armor']);
				Player['xpBar'].draw(0, 480);
				Player.update();

				noStroke();
				colorMode(RGB);
				fill(0, 0, 0, World.transition.value);
				rect(0, 0, width, height);
				colorMode(HSB);

				drawAlerts();
				fill(255, 0, 0);
				textSize(16);
				textAlign(LEFT, BASELINE);
				var a = Object.keys(animations);
				for (var i = 0; i < a.length; i++) {
					animations[a[i]].frame += 1 / (animations[a[i]].speed * FRAME_RATE / animations[a[i]].a.length);
				}
			}
		};
		keyPressed = function () {
			keys[keyCode] = true;
			keyIsPressed = true;
		};
		keyReleased = function () {
			keys[keyCode] = false;
			keyIsPressed = false;
			newKey = true;
		};
		mousePressed = function () {
			mouseIsPressed = true;
		};
		mouseReleased = function () {
			mouseIsPressed = false;
			newClick = true;
		};
	}
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById('canvas');

// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);