// Hasina Esteqlal
// L08: Cubey ❤️ Keyboard [25 minutes]

class Smiley extends Phaser.Scene {
    constructor() {
        super("smileyScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        // Create variables to hold constant values for sprite locations
        this.bodyX = 400;
        this.bodyY = 350;

        // Define the locations of the smile and hands relative to the
        // main body location. This way, if we change the main body
        // location, the other values update too.
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 20;

        this.leftHandX = this.bodyX - 125;
        this.lefthandY = this.bodyY + 20;

        this.rightHandX = this.bodyX + 125;
        this.rightHandY = this.bodyY + 20;
        
        this.counter = 0;
        this.smileType = 'Smile';

        // for polling input 
        // Polling input: peace hand
        this.pKey = null; 
        // Event input: dimple smile
        this.dKey = null;
        // Event input: regular smile
        this.sKey = null;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Shape Characters"
        // https://kenney.nl/assets/shape-characters
        this.load.setPath("./assets/");
        // body
        this.load.image("yellowBody", "yellow_body_squircle.png");
        // smiles
        this.load.image("smile", "face_a.png");
        this.load.image("smileDimple", "face_c.png");
        // hands
        this.load.image("handOpen", "hand_yellow_open.png");
        // peace
        this.load.image("peaceHand", "hand_yellow_peace.png");

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Smiley.js</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "yellowBody");

        // Create the two sprites, one for each type of smile
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "smile");
        my.sprite.dimple = this.add.sprite(this.smileX, this.smileY, "smileDimple");
        
        // Create the sprite for the left and right hands
        my.sprite.leftOpenHand = this.add.sprite(this.leftHandX, this.lefthandY, "handOpen");
        my.sprite.leftOpenHand.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightOpenHand = this.add.sprite(this.rightHandX, this.rightHandY, "handOpen");

        // peace
        my.sprite.peaceHand = this.add.sprite(this.rightHandX, this.rightHandY, "peaceHand");


        // Since sprites are visible when created and we only want one smile to be shown
        // at a time, make the "dimple" smile not visible to start.
        my.sprite.dimple.visible = false;
        my.sprite.peaceHand.visible = false;

        // [Polling input] Add code so that the "peace hand" is displayed when the "P" key is 
        // held down. When the "P" key is not held down, the hand should revert back to being the regular "yellow hand".

        // Polling input: peace hand
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Event input: dimple smile
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Event input: regular smile
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        

    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // update polling input
        // Polling input: peace hand
        if (this.pKey.isDown)
        {
            my.sprite.rightOpenHand.visible = false;
            my.sprite.peaceHand.visible = true;
        }
        else
        {
            my.sprite.rightOpenHand.visible = true;
            my.sprite.peaceHand.visible = false;
        }

        // Event input: dimple smile
        this.dKey.on('down', (key, event) => {
            my.sprite.smile.visible = false;
            my.sprite.dimple.visible = true;
        });

        // Event input: regular smile
        this.sKey.on('down', (key, event) => {
            my.sprite.dimple.visible = false;
            my.sprite.smile.visible = true;
        });

        // // Since update is called multiple times/second, this.counter acts like
        // // a timer, increasing once per clock tick
        // this.counter++;

        // if (this.counter % 120 == 0) {  // Do this once every 120 calls to update()
        //     switch (this.smileType) {
        //         case "Smile":
        //             // Currently a regular smile, so change to dimple smile
        //             this.smileType = "Dimple";
        //             my.sprite.smile.visible = false;
        //             my.sprite.dimple.visible = true;
        //             break;
        //         case "Dimple":
        //             // Currently a dimple smile, so change to regular smile
        //             this.smileType = "Smile";
        //             my.sprite.dimple.visible = false;
        //             my.sprite.smile.visible = true;
        //             break;
        //         default:
        //             console.log("Error: unknown smile");
        //     }
        // }
    }

}