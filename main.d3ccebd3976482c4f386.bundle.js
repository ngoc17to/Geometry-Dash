(()=>{"use strict";var e,t={305:(e,t,s)=>{var i=s(440),a=s.n(i);class r extends Phaser.Scene{constructor(){super({key:"BackgroundScene",active:!0})}preload(){this.load.image("background","assets/images/game_bg_01_001-hd.png")}create(){const e=this.cameras.main.width,t=this.cameras.main.height;this.background=this.add.tileSprite(0,0,e,t,"background"),this.background.setScale(2),this.background.setTint(2701035)}update(){this.background.tilePositionX+=.2}}const n=r;class h extends Phaser.Scene{constructor(){super("LevelSelectScene")}preload(){}create(){const{height:e,width:t}=this.scale;for(let s=0;s<3;s++)this.add.sprite(t/2-200+200*s,e/2,`lv${s+1}Btn`).setInteractive({useHandCursor:!0}).on("pointerdown",(()=>{this.scene.start("PlayScene",{level:s+1})}))}}const o=h;class c extends Phaser.Scene{constructor(){super({key:"LoadingScene"})}preload(){const e=this.cameras.main.width,t=this.cameras.main.height;this.background=this.add.tileSprite(0,0,e,t,"background"),this.background.setScale(2),this.background.setTint(2701035),this.add.image(e/2,t/2,"title").setScale(.75);const s=this.add.image(e/2,2*t/3,"sliderGroove");s.setOrigin(.5);const i=[];this.load.on("progress",(e=>{i.forEach((e=>e.destroy())),i.length=0;const t=Math.ceil(7*e),a=s.x-s.displayWidth/2,r=s.displayWidth/7,n=a+r/2;for(let e=0;e<t;e++){const t=this.add.image(n+e*r,s.y,"sliderBar");t.setOrigin(.5,.5),i.push(t)}})),this.load.on("complete",(()=>{i.forEach((e=>e.destroy())),s.destroy()}));for(let e=1;e<=8;e++){const t=e.toString().padStart(2,"0");this.load.image("square"+t,`assets/images/GJ_GameSheet-hd/square_${t}_001.png`)}for(let e=1;e<=4;e++){const t=e.toString().padStart(2,"0");this.load.image("spike"+t,`assets/images/GJ_GameSheet-hd/spike_${t}_001.png`),this.load.image("spikes"+t,`assets/images/GJ_GameSheet-hd/d_spikes_${t}_001.png`)}for(let e=1;e<=4;e++){const t=e.toString().padStart(2,"0");this.load.image("coin"+t,`assets/images/GJ_GameSheet02-hd/secretCoin_${t}_001.png`)}for(let e=1;e<=4;e++){const t=e.toString().padStart(2,"0");this.load.image("portal"+t+"f",`assets/images/GJ_GameSheet02-hd/portal_${t}_front_001.png`),this.load.image("portal"+t+"b",`assets/images/GJ_GameSheet02-hd/portal_${t}_back_001.png`)}this.load.image("plank01","assets/images/GJ_GameSheet-hd/plank_01_001.png"),this.load.image("bump","assets/images/GJ_GameSheet-hd/gravbump_01_001.png"),this.load.image("bumpGlow","assets/images/GJ_GameSheetGlow-hd/gravbump_01_glow_001.png"),this.load.image("jumpRing","assets/images/GJ_GameSheet-hd/gravJumpRing_01_001.png"),this.load.tilemapTiledJSON("level1","assets/resource/GD_level_01.json"),this.load.tilemapTiledJSON("level2","assets/resource/GD_level_02.json"),this.load.tilemapTiledJSON("level3","assets/resource/GD_level_03.json"),this.load.image("platform","assets/images/groundSquare_01_001-hd.png"),this.load.image("ground","assets/images/GJ_GameSheet02-hd/smartBlock01_001.png"),this.load.image("player1","assets/icons-hd/player_02/player_02_glow_001.png"),this.load.image("player2","assets/icons-hd/player_02/player_02_001.png"),this.load.image("player3","assets/icons-hd/player_02/player_02_2_001.png"),this.load.image("ship1","assets/icons-hd/ship_02/ship_02_glow_001.png"),this.load.image("ship2","assets/icons-hd/ship_02/ship_02_001.png"),this.load.image("ship3","assets/icons-hd/ship_02/ship_02_2_001.png"),this.load.image("particle","assets/images/GJ_ParticleSheet-hd/particle_27_001.png"),this.load.image("shipParticle","assets/images/GJ_ParticleSheet-hd/particle_25_001.png"),this.load.image("squareParticle","assets/images/GJ_ParticleSheet-hd/particle_00_001.png"),this.load.image("playBtn","assets/images/GJ_GameSheet03-hd/GJ_playBtn_001.png"),this.load.image("lv1Btn","assets/images/GJ_GameSheet03-hd/difficulty_01_btn_001.png"),this.load.image("lv2Btn","assets/images/GJ_GameSheet03-hd/difficulty_02_btn_001.png"),this.load.image("lv3Btn","assets/images/GJ_GameSheet03-hd/difficulty_03_btn_001.png"),this.load.image("resumeBtn","assets/images/GJ_GameSheet03-hd/GJ_playBtn2_001.png"),this.load.image("pauseBtn","assets/images/GJ_GameSheet03-hd/GJ_pauseEditorBtn_001.png"),this.load.image("replayBtn","assets/images/GJ_GameSheet03-hd/GJ_replayBtn_001.png"),this.load.image("menuBtn","assets/images/GJ_GameSheet03-hd/GJ_menuBtn_001.png"),this.load.image("newBest","assets/images/GJ_GameSheet03-hd/GJ_newBest_001.png"),this.load.image("levelComplete","assets/images/GJ_GameSheet03-hd/GJ_levelComplete_001.png"),this.load.audio("level1bmg","assets/sounds/StereoMadness.mp3"),this.load.audio("collectCoin","assets/sounds/gold02.ogg"),this.load.audio("playSound","assets/sounds/playSound_01.ogg"),this.load.audio("menuSound","assets/sounds/menuLoop.mp3"),this.load.audio("quitSound","assets/sounds/quitSound_01.ogg"),this.load.audio("rewardSound","assets/sounds/reward01.ogg"),this.load.bitmapFont("bigFont","assets/images/bigFont-hd.png","assets/fonts/bigFont-hd.fnt"),this.load.on("filecomplete",((e,t,s)=>{"bigFont"===e&&console.log("Bitmap font loaded:",e)}))}create(){this.scene.start("MainScene")}}const l=c;class d extends Phaser.Scene{constructor(){super("MainScene")}preload(){}create(){const{height:e,width:t}=this.scale,s=this.add.sprite(t/2,e/2,"playBtn");s.setInteractive({useHandCursor:!0}),s.on("pointerdown",(()=>{this.scene.start("LevelSelectScene")}))}}const p=d;class u extends Phaser.Scene{constructor(){super({key:"OverlayScene"})}init(e){this.stateMachine=e.scene.stateMachine,this.scoreManager=e.scene.scoreManager}create(){const{width:e}=this.scale;this.scoreText=this.add.text(5,5,"Score: 0 - Coin: 0",{fontSize:"24px",color:"#fff"}).setScrollFactor(0,1),this.pauseBtn=this.add.sprite(e-5,5,"pauseBtn"),this.pauseBtn.setOrigin(1,0),this.pauseBtn.setInteractive({useHandCursor:!0}),this.pauseBtn.on("pointerdown",(()=>{this.stateMachine.transition("pause")}))}update(){this.scoreText.setText("Score: "+this.scoreManager.getCurrentScore()+" - Coins: "+this.scoreManager.getCurrentCoin())}}const g=u;class m extends Phaser.Scene{constructor(){super("PauseScene")}init(e){this.level=e.scene.level,this.highestScore=e.scene.scoreManager.getHighScore(this.level),this.stateMachine=e.scene.stateMachine}create(){const{height:e,width:t}=this.scale,s=this.add.graphics();s.fillStyle(0,.5),s.fillRoundedRect(t/4,e/4,t/2,e/2,20),this.progressBar=this.add.graphics(),this.updateProgressBar(),this.add.sprite(t/2-200,e/2,"menuBtn").setInteractive({useHandCursor:!0}).on("pointerdown",(()=>{this.scene.stop(),this.stateMachine.transition("level")})),this.add.sprite(t/2,e/2,"resumeBtn").setInteractive({useHandCursor:!0}).on("pointerdown",(()=>{this.scene.stop(),this.stateMachine.transition("resume")})),this.add.sprite(t/2+200,e/2,"replayBtn").setInteractive({useHandCursor:!0}).on("pointerdown",(()=>{this.scene.stop(),this.stateMachine.transition("play")}))}updateProgressBar(){const{width:e}=this.scale,t=e/3,s=(e-t)/2,i=this.scale.height/4+50;this.progressBar.clear(),this.progressBar.fillStyle(2236962,.8),this.progressBar.fillRoundedRect(s,i,t,20,10);const a=this.highestScore/100*t;this.progressBar.fillStyle(65280,1),this.progressBar.fillRoundedRect(s,i,a,20,10),this.add.text(s+t/2,i-20,`Level ${this.level}`,{fontSize:"16px",color:"#ffffff",align:"center"}).setOrigin(.5),this.add.text(s+t/2,i+10,`${this.highestScore} %`,{fontSize:"16px",color:"#000",align:"center"}).setOrigin(.5)}}const y=m;class S extends Phaser.GameObjects.Sprite{constructor(e,t,s,i,a=!1,r=!1){super(e,t,s,i),this.handleCollisionWithPlayer=(e,t)=>{const s=e.body,i=t.body;"player-fly"===e.getState()?s.touching.down||s.touching.up||this.currentScene.stateMachine.transition("end"):s.touching.down&&i.touching.up||this.currentScene.stateMachine.transition("end")},this.currentScene=e,this.flipX=a,this.flipY=r,this.setSize(this.width,this.displayHeight),e.physics.world.enable(this),e.add.existing(this),e.physics.add.collider(e.getPlayer(),this,this.handleCollisionWithPlayer,void 0,this)}}const v=S,w=class{constructor(e,t,s,i){this.squareEmitterPaused=!1,this.shipEmitterPaused=!1,this.scene=e,this.player=t,this.squareEmitter=e.add.particles(t.x,t.y,s,{lifespan:200,color:[9887962,9666291],colorEase:"quad.out",speed:{min:200,max:400},scale:{start:.4,end:0,ease:"sine.in"},angle:{min:180,max:210},quantity:1}),this.shipEmitter=e.add.particles(t.x,t.y,i,{color:[16436258,16291840,16266752,10421252],colorEase:"quad.out",lifespan:200,speed:{min:200,max:400},angle:{min:180,max:200},gravityY:500,quantity:1}),this.squareEmitter.stop(),this.shipEmitter.stop()}update(){const e=Phaser.Math.DegToRad(this.player.angle),t=-this.player.displayWidth/2,s=this.player.displayHeight/2,i=Math.cos(e),a=Math.sin(e),r=t*i-s*a,n=t*a+s*i;this.squareEmitter.setPosition(this.player.x+t,this.player.y+s),this.shipEmitter.setAngle(e),this.shipEmitter.setPosition(this.player.x+r,this.player.y+n)}startSliding(){this.squareEmitter.start(),this.shipEmitter.stop()}stopSliding(){this.squareEmitter.stop()}startFlying(){this.shipEmitter.start(),this.squareEmitter.stop()}stopFlying(){this.shipEmitter.stop()}pause(){this.squareEmitterPaused||(this.squareEmitter.pause(),this.squareEmitterPaused=!0),this.shipEmitterPaused||(this.shipEmitter.pause(),this.shipEmitterPaused=!0)}resume(){this.squareEmitterPaused&&(this.squareEmitter.resume(),this.squareEmitterPaused=!1),this.shipEmitterPaused&&(this.shipEmitter.resume(),this.shipEmitterPaused=!1)}},f=class{constructor(e,t={},s=[]){this.initialState=e,this.possibleStates=t,this.stateArgs=s,this.state=null;for(const e of Object.values(this.possibleStates))e.stateMachine=this}update(e,t){null===this.state&&(this.state=this.initialState,this.possibleStates[this.state].enter()),this.possibleStates[this.state].execute(e,t)}transition(e,...t){this.state&&this.possibleStates[this.state].exit(),this.state=e,this.possibleStates[this.state].enter()}getState(){return this.state}},_=class{},b=class extends _{constructor(e,t){super(),this.player=e,this.scene=t}enter(){var e;this.cursors=null===(e=this.scene.input.keyboard)||void 0===e?void 0:e.createCursorKeys(),this.player.updateSprite()}execute(e,t){var s,i;const a=this.player.body;a.setVelocityX(600),a.blocked.down?(this.player.getParticleManager().startSliding(),this.player.getParticleManager().update()):this.player.getParticleManager().stopSliding(),((null===(s=this.cursors)||void 0===s?void 0:s.space.isDown)||(null===(i=this.cursors)||void 0===i?void 0:i.up.isDown)||this.scene.input.pointer1.isDown)&&a.blocked.down&&(a.setVelocityY(-1100),a.setAccelerationY(2e3),this.player.rotatePlayer())}exit(){}},x=class extends _{constructor(e,t){super(),this.player=e,this.scene=t}enter(){var e;this.cursors=null===(e=this.scene.input.keyboard)||void 0===e?void 0:e.createCursorKeys(),this.player.updateSprite()}execute(e,t){var s,i;const a=this.player.body;a.setVelocityX(600),(null===(s=this.cursors)||void 0===s?void 0:s.space.isDown)||(null===(i=this.cursors)||void 0===i?void 0:i.up.isDown)||this.scene.input.pointer1.isDown?(a.setVelocityY(-400),this.scene.tweens.add({targets:this.player,props:{angle:-30},duration:150}),this.player.getParticleManager().startFlying(),this.player.getParticleManager().update()):(this.scene.tweens.add({targets:this.player,props:{angle:a.blocked.down?0:30},duration:300}),this.player.getParticleManager().stopFlying())}exit(){}};class P extends a().GameObjects.Container{constructor(e,t,s,i){super(e,t,s),this.textureKeys=i,this.currentScene=e,this.currentScene.add.existing(this),this.currentScene.physics.add.existing(this),this.stateMachine=new f("player-slide",{"player-slide":new b(this,e),"player-fly":new x(this,e)})}updateSprite(){"player-slide"===this.stateMachine.getState()?(this.runSprites.forEach((e=>e.setVisible(!0))),this.flySprites.forEach((e=>e.setVisible(!1))),this.setSize(this.runSprites[0].displayWidth,this.runSprites[0].displayHeight)):"player-fly"===this.stateMachine.getState()&&(this.runSprites.forEach((e=>e.setVisible(!1))),this.flySprites.forEach((e=>e.setVisible(!0))),this.setSize(this.flySprites[3].displayWidth,this.flySprites[3].displayHeight))}create(){this.runSprites=[this.currentScene.add.sprite(0,0,this.textureKeys[0]).setOrigin(.5,.5).setTint(0),this.currentScene.add.sprite(0,0,this.textureKeys[1]).setOrigin(.5,.5).setTint(8191232),this.currentScene.add.sprite(0,0,this.textureKeys[2]).setOrigin(.5,.5).setTint(64764)],this.runSprites.forEach((e=>this.add(e))),this.flySprites=[this.currentScene.add.sprite(0,0,this.textureKeys[0]).setOrigin(.5,.5).setScale(.5).setTint(0),this.currentScene.add.sprite(0,0,this.textureKeys[1]).setOrigin(.5,.5).setScale(.5).setTint(8191232),this.currentScene.add.sprite(0,0,this.textureKeys[2]).setOrigin(.5,.5).setScale(.5).setTint(64764),this.currentScene.add.sprite(0,0,this.textureKeys[3]).setOrigin(.5,0).setTint(0),this.currentScene.add.sprite(0,0,this.textureKeys[4]).setOrigin(.5,0).setTint(8191232),this.currentScene.add.sprite(0,0,this.textureKeys[5]).setOrigin(.5,0).setTint(64764)],this.flySprites.forEach((e=>this.add(e))),this.particleManager=new w(this.currentScene,this,"squareParticle","shipParticle"),this.body.setVelocityX(600),this.currentScene.physics.world.enable(this)}update(e,t){this.stateMachine.update(e,t)}rotatePlayer(){this.body;const e=this.angle+180;let t=e;e%90!=0&&(t+=90-e%90),console.log(this.angle,t),this.rotateTweens=this.scene.tweens.add({targets:this,angle:{from:this.angle,to:t},duration:400})}getStateMachine(){return this.stateMachine}getState(){return this.stateMachine.getState()}getParticleManager(){return this.particleManager}pause(){this.rotateTweens.pause(),this.particleManager.pause()}resume(){this.rotateTweens.resume(),this.particleManager.resume()}}const M=P;class G extends Phaser.GameObjects.Sprite{constructor(e,t,s,i,a=!1){super(e,t,s,i),this.handleCollisionWithPlayer=(e,t)=>{this.currentScene.stateMachine.transition("end")},this.currentScene=e,this.flipY=a,e.physics.world.enable(this),this.body.setSize(this.width-30,this.height-30),e.add.existing(this),e.physics.add.collider(e.getPlayer(),this,this.handleCollisionWithPlayer,void 0,this)}}const B=G;class O extends Phaser.GameObjects.Container{constructor(e,t,s,i,a,r,n){super(e,t,s),this.currentScene=e;const h=this.currentScene.add.sprite(i-t,a-s,n).setOrigin(.5,.5),o=this.currentScene.add.sprite(0,0,r).setOrigin(.5,.5);this.add([h,o]);const c=Math.max(o.displayWidth,h.displayWidth),l=Math.max(o.displayHeight,h.displayHeight);this.setSize(c,l),this.currentScene.physics.world.enable(this),this.currentScene.add.existing(this)}}const C=O;class k extends Phaser.Physics.Arcade.Sprite{constructor(e,t,s,i){super(e,t,s,i),this.currentScene=e,e.add.existing(this),e.physics.add.existing(this),e.anims.create({key:"coin-spin",frames:[{key:"coin01"},{key:"coin02"},{key:"coin03"},{key:"coin04"}],frameRate:10,repeat:-1}),this.play("coin-spin")}collect(){this.currentScene.tweens.add({targets:this,y:this.y-200,alpha:{from:1,to:0},duration:500,onComplete:()=>{this.destroy()}}),this.currentScene.sound.add("collectCoin").play()}}const E=k;class T extends Phaser.Physics.Arcade.Sprite{constructor(e,t,s,i,a){super(e,t,s,i),this.boostVelocity=a,e.add.existing(this),e.physics.add.existing(this),this.emitter=this.scene.add.particles(0,0,"particle",{x:this.x,y:this.y,speed:{min:-100,max:100},scale:{start:.5,end:0},blendMode:"ADD",lifespan:600,frequency:100}),this.emitter.start(),e.physics.add.collider(e.getPlayer(),this,this.applyBoost,void 0,this)}applyBoost(e,t){const s=e.body;s.setVelocityY(-this.boostVelocity),s.setAccelerationY(2e3),s.setVelocityX(600),e.rotatePlayer()}}const J=T;class j extends Phaser.Physics.Arcade.Sprite{constructor(e,t,s,i){super(e,t,s,i),this.currentScene=e,e.add.existing(this),e.physics.add.existing(this),e.physics.add.overlap(e.getPlayer(),this,this.onJump,void 0,this)}onJump(e,t){var s;const i=null===(s=this.currentScene.input.keyboard)||void 0===s?void 0:s.createCursorKeys();if((null==i?void 0:i.space.isDown)||(null==i?void 0:i.up.isDown)){const t=e.body;t.setVelocityY(-1100),t.setAccelerationY(2e3),t.setVelocityX(600),e.rotatePlayer()}}}const q=j,I=class{constructor(){this.currentScore=0,this.currentCoin=0,this.currentScore=0,this.currentCoin=0,this.highScores={};const e=localStorage.getItem("highScores");e&&(this.highScores=JSON.parse(e))}getCurrentScore(){return this.currentScore}getCurrentCoin(){return this.currentCoin}getHighScore(e){return this.highScores[e]||0}updateScore(e,t){this.currentScore=e}updateHighScore(e){const t=this.getHighScore(e);return this.currentScore>t&&(this.highScores[e]=this.currentScore,localStorage.setItem("highScores",JSON.stringify(this.highScores)),!0)}updateCoin(){this.currentCoin++}resetScore(){this.currentScore=0,this.currentCoin=0}},H=class extends _{constructor(e){super(),this.scene=e}enter(){console.log("PauseState"),this.scene.levelMusic.pause(),this.scene.menuSound.play(),this.scene.physics.world.pause(),this.scene.transition.fadeIn(this.scene.pauseMenu),this.scene.scene.pause("OverlayScene")}execute(e,t){}exit(){this.scene.menuSound.stop(),this.scene.physics.world.resume(),this.scene.transition.fadeOut(this.scene.pauseMenu),this.scene.scene.resume("OverlayScene")}},L=class extends _{constructor(e){super(),this.scene=e}enter(){this.elapsedTime=0,this.isNewBest=!1,this.scene.levelMusic.stop(),this.scene.physics.world.pause(),this.scene.scoreManager.updateHighScore(this.scene.level)?(this.elapsedTime=0,this.isNewBest=!0,this.scene.newBestScreen.updateScoreText(),this.scene.rewardSound.play(),this.scene.transition.fadeIn(this.scene.newBestScreen)):this.scene.stateMachine.transition("start")}execute(e,t){this.isNewBest&&(this.elapsedTime+=t,this.elapsedTime>1500&&this.scene.transition.fadeOut(this.scene.newBestScreen),this.elapsedTime>1800&&this.scene.stateMachine.transition("start"))}exit(){this.scene.menuSound.stop(),this.elapsedTime=0,this.isNewBest=!1}},V=class{constructor(e){this.scene=e}fadeIn(e,t=200){e.setVisible(!0),e.setActive(!0),e.setInteractive(),e.setAlpha(0),e.setScale(.5),this.scene.tweens.add({targets:e,alpha:1,scale:1,duration:t,ease:"Quint.easeIn"})}fadeOut(e,t=300){e.setAlpha(1),e.setScale(1),this.scene.tweens.add({targets:e,scale:.5,duration:t,ease:"Quint.easeIn",onComplete:()=>{e.setVisible(!1),e.setActive(!1)}})}};class A extends Phaser.GameObjects.Sprite{constructor(e,t,s,i,a){super(e,t,s,i),this.setInteractive({useHandCursor:!0}),this.setScale(1),this.setScrollFactor(0),this.onClick=a,this.on("pointerover",(()=>{e.tweens.add({targets:this,scale:1.1,duration:200,ease:"Power1"})})),this.on("pointerout",(()=>{e.tweens.add({targets:this,scale:1,duration:200,ease:"Power1"})})),this.on("pointerdown",(()=>{e.tweens.add({targets:this,scale:.8,duration:200,ease:"Power1",onComplete:()=>{this.setScale(1)}}),this.onClick()})),e.add.existing(this)}}const R=A;class K extends Phaser.GameObjects.Container{constructor(e,t,s){super(e,t,s),this.currentScene=e,this.level=e.level,this.highestScore=e.scoreManager.getHighScore(e.level),this.createBackground(),this.createProgressBar(),this.createButtons(),e.add.existing(this),this.setScrollFactor(0)}createBackground(){const{height:e,width:t}=this.scene.scale;this.background=this.scene.add.graphics(),this.background.fillStyle(0,.5),this.background.fillRoundedRect(-t/4,-e/4,t/2,e/2,20),this.add(this.background)}createProgressBar(){const{width:e,height:t}=this.scene.scale,s=e/3,i=-s/2,a=-t/6;this.progressBar=this.scene.add.graphics(),this.progressBar.fillStyle(2236962,.8),this.progressBar.fillRoundedRect(i,a,s,20,10);const r=this.highestScore/100*s;this.progressBar.fillStyle(65280,1),this.progressBar.fillRoundedRect(i,a,r,20,10);const n=this.scene.add.text(i+s/2,a-20,`Level ${this.level}`,{fontSize:"24px",color:"#ffffff",align:"center"});n.setOrigin(.5);const h=this.scene.add.text(i+s/2,a+10,`${this.highestScore} %`,{fontSize:"16px",color:"#000",align:"center"});h.setOrigin(.5),this.add([this.progressBar,n,h])}createButtons(){const e=new R(this.scene,-200,25,"menuBtn",(()=>{this.currentScene.scene.start("LevelSelectScene")})),t=new R(this.scene,0,25,"resumeBtn",(()=>{this.currentScene.stateMachine.transition("play")})),s=new R(this.scene,200,25,"replayBtn",(()=>{this.currentScene.stateMachine.transition("start")}));this.add([e,t,s])}}const F=K,z=class extends _{constructor(e){super(),this.scene=e}enter(){console.log("StartState"),this.scene.physics.world.TILE_BIAS=32,this.scene.cameras.main.setViewport(0,0,window.innerWidth,window.innerHeight),this.scene.scoreManager.resetScore(),this.scene.playSound.play(),this.scene.levelMusic.play(),this.scene.physics.world.resume(),this.scene.getPlayer().setPosition(0,this.scene.sys.canvas.height),this.scene.getPlayer().getStateMachine().transition("player-slide"),this.stateMachine.transition("play"),this.scene.scene.launch("OverlayScene",{scene:this.scene})}execute(e,t){}exit(){}},D=class extends _{constructor(e){super(),this.scene=e}enter(){var e;console.log("PlayState"),this.scene.levelMusic.resume(),this.pauseKey=null===(e=this.scene.input.keyboard)||void 0===e?void 0:e.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)}execute(e,t){this.scene.getPlayer().update(e,t),"square"===this.scene.getPlayer().state&&(this.scene.cameras.main.scrollY=this.scene.getPlayer().y-150),this.scene.updateScore(),this.scene.scoreManager.getCurrentScore()>=98&&this.scene.desEmitter.start()}exit(){}};class W extends Phaser.GameObjects.Container{constructor(e,t,s){super(e,t,s),this.currentScene=e,this.level=e.level,this.highestScore=e.scoreManager.getHighScore(e.level);const{width:i,height:a}=this.scene.scale,r=e.add.image(0,-a/8,"newBest");r.setDepth(10),this.highestScoreText=e.add.text(0,-a/8+80,`${e.scoreManager.getHighScore(e.level)}%`,{fontSize:"60px",color:"#fff"}),this.highestScoreText.setStyle({fontWeight:"bold"}),e.add.existing(this),this.add([this.highestScoreText,r]),this.setScrollFactor(0)}updateScoreText(){this.highestScoreText.setText(`${this.currentScene.scoreManager.getHighScore(this.currentScene.level)}%`)}}const $=W;class Y extends a().Scene{constructor(){super({key:"PlayScene"}),this.visitedPortals=[],this.visitedCoins=[],this.scoreManager=new I}init(e){this.level=e.level}create(){this.levelMusic=this.sound.add("level1bmg",{loop:!0}),this.playSound=this.sound.add("playSound"),this.rewardSound=this.sound.add("rewardSound"),this.menuSound=this.sound.add("menuSound",{loop:!0}),this.player=new M(this,0,this.sys.canvas.height,["player1","player2","player3","ship1","ship2","ship3"]),this.player.create(),this.map=this.make.tilemap({key:`level${this.level}`});const e=this.map.addTilesetImage("platformTileset","platform"),t=this.map.createLayer("platform",e,0,0),s=this.map.createLayer("floor",e,0,0);t.setCollisionByProperty({collides:!0}),s.setCollisionByProperty({collides:!0}),this.physics.add.collider(this.player,t),this.physics.add.collider(this.player,s),t.setTint(266415),s.setTint(266415);const i=this.map.getObjectLayer("squareLayer");this.squareObstacles=this.physics.add.group({classType:v}),null==i||i.objects.forEach((e=>{const t=new v(this,e.x+e.width/2,e.y-e.height/2,e.name,e.flippedHorizontal,e.flippedVertical);this.squareObstacles.add(t)})),this.squareObstacles.children.iterate((e=>{const t=e.body;return t.setAllowGravity(!1),t.setImmovable(!0),!0}));const a=this.map.getObjectLayer("spikeLayer");this.spikeObstacles=this.physics.add.group({classType:B}),null==a||a.objects.forEach((e=>{const t=new B(this,e.x+e.width/2,e.y-e.height/2,e.name,e.flippedVertical);this.spikeObstacles.add(t)})),this.spikeObstacles.children.iterate((e=>{const t=e.body;return t.setAllowGravity(!1),t.setImmovable(!0),!0}));const r=this.map.getObjectLayer("coinLayer");this.coins=this.physics.add.group({classType:E}),null==r||r.objects.forEach((e=>{const t=new E(this,e.x+e.width/2,e.y-e.height/2,e.name);this.coins.add(t)})),this.coins.children.iterate((e=>{const t=e.body;return t.setAllowGravity(!1),t.setImmovable(!0),!0}));const n=this.map.getObjectLayer("bumpLayer");this.bumps=this.physics.add.group({classType:J}),null==n||n.objects.forEach((e=>{const t=new J(this,e.x+e.width/2,e.y-e.height/2,e.name,1500);this.bumps.add(t)})),this.bumps.children.iterate((e=>{const t=e.body;return t.setAllowGravity(!1),t.setImmovable(!0),!0}));const h=this.map.getObjectLayer("jumpRingLayer");this.jumpRings=this.physics.add.group({classType:q}),null==h||h.objects.forEach((e=>{const t=new q(this,e.x+e.width/2,e.y-e.height/2,e.name);this.jumpRings.add(t)})),this.jumpRings.children.iterate((e=>{const t=e.body;return t.setAllowGravity(!1),t.setImmovable(!0),!0}));const o=this.map.getObjectLayer("portalLayer");this.portals=this.physics.add.group({classType:C});const c=(null==o?void 0:o.objects)||[];for(let e=0;e<c.length;e+=2){const t=c[e],s=c[e+1],i=t.x+t.width/2,a=t.y-t.height/2,r=s.x+s.width/2,n=s.y-s.height/2,h=new C(this,i,a,r,n,t.name,s.name);this.portals.add(h)}this.portals.children.iterate((e=>{const t=e.body;return t.setAllowGravity(!1),t.setImmovable(!0),!0}));const{width:l,height:d}=this.cameras.main;this.initialCameraZoom=this.cameras.main.zoom,this.cameras.main.startFollow(this.player,!1,1,1,0,0),this.cameras.main.setFollowOffset(-this.sys.canvas.width/3,0),this.cameras.main.setLerp(.1,.2),this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels),this.physics.add.overlap(this.player,this.portals,this.changeState,void 0,this),this.physics.add.overlap(this.player,this.coins,this.collectCoin,void 0,this),this.pauseMenu=new F(this,l/2,d/2),this.newBestScreen=new $(this,l/2,d/4),this.newBestScreen.setVisible(!1),this.pauseMenu.setVisible(!1),this.transition=new V(this),this.stateMachine=new f("start",{start:new z(this),play:new D(this),pause:new H(this),end:new L(this)})}collectCoin(e,t){t.collect(),-1===this.visitedCoins.indexOf(t)&&(this.visitedCoins.push(t),this.scoreManager.updateCoin())}changeState(e,t){if(-1===this.visitedPortals.indexOf(t)){if("player-slide"==e.getState()){e.getStateMachine().transition("player-fly");const{height:t}=this.scale,s=t/this.map.heightInPixels;this.tweens.addCounter({from:this.cameras.main.zoom,to:s,duration:500,onUpdate:e=>{this.cameras.main.setZoom(e.getValue())}})}else e.getStateMachine().transition("player-slide"),this.tweens.addCounter({from:this.cameras.main.zoom,to:this.initialCameraZoom,duration:500,onUpdate:e=>{this.cameras.main.setZoom(e.getValue())}});this.visitedPortals.push(t)}}updateScore(){const e=Math.min(this.player.x/this.map.widthInPixels,1),t=Math.floor(100*e);this.scoreManager.updateScore(t,this.level)}getPlayer(){return this.player}update(e,t){this.stateMachine.update(e,t)}}const N=Y;class X extends Phaser.Scene{constructor(){super("preloader")}preload(){this.load.image("background","assets/images/game_bg_01_001-hd.png"),this.load.image("title","assets/images/GJ_LaunchSheet-hd/GJ_logo_001.png"),this.load.image("sliderGroove","assets/images/slidergroove-hd.png"),this.load.image("sliderBar","assets/images/sliderBar-hd.png")}create(){this.scene.start("LoadingScene")}}const Z=X,U={type:a().AUTO,width:window.innerWidth,height:window.innerHeight,scale:{mode:a().Scale.FIT,autoCenter:a().Scale.CENTER_BOTH,parent:"game",width:window.innerWidth,height:window.innerHeight},physics:{default:"arcade",arcade:{gravity:{x:0,y:2500},debug:!0}},scene:[Z,l,n,p,o,N,g,y]};new(a().Game)(U)}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var r=s[e]={exports:{}};return t[e].call(r.exports,r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,s,a,r)=>{if(!s){var n=1/0;for(l=0;l<e.length;l++){for(var[s,a,r]=e[l],h=!0,o=0;o<s.length;o++)(!1&r||n>=r)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(h=!1,r<n&&(n=r));if(h){e.splice(l--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[s,a,r]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,r,[n,h,o]=s,c=0;if(n.some((t=>0!==e[t]))){for(a in h)i.o(h,a)&&(i.m[a]=h[a]);if(o)var l=o(i)}for(t&&t(s);c<n.length;c++)r=n[c],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(l)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[96],(()=>i(305)));a=i.O(a)})();