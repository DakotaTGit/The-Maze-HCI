/* =========================================
   FIREWALL PUZZLE (Mastermind / Runes)
   ========================================= */

// 1. INJECT CSS
const styleFirewall = document.createElement('style');
styleFirewall.innerHTML = `
    #firewall-overlay {
        display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(20, 0, 5, 0.98); z-index: 9999; /* Reddish Tint */
        font-family: 'Courier New', monospace; color: #ff0055;
        justify-content: center; align-items: center; flex-direction: column;
    }
    .fw-box {
        border: 2px solid #ff0055; padding: 30px; background: #000;
        text-align: center; box-shadow: 0 0 30px rgba(255, 0, 85, 0.2); width: 500px;
    }
    .fw-log {
        height: 150px; overflow-y: auto; text-align: left; background: #111;
        border: 1px solid #333; padding: 10px; font-size: 13px; color: #00ff66;
        margin-bottom: 20px; font-family: monospace;
    }
    .fw-slots { display: flex; justify-content: center; gap: 15px; margin-bottom: 20px; height: 60px; }
    .fw-slot { width: 50px; height: 50px; border: 2px dashed #555; display:flex; justify-content:center; align-items:center; }
    
    .fw-btn {
        width: 50px; height: 50px; border-radius: 5px; border: none; cursor: pointer; 
        font-weight: bold; font-size: 18px; color: #000; margin: 0 5px;
        transition: transform 0.1s;
    }
    .fw-btn:active { transform: scale(0.9); }
    
    .rune-red { background: #ff0055; box-shadow: 0 0 10px #ff0055; }
    .rune-blue { background: #00f3ff; box-shadow: 0 0 10px #00f3ff; }
    .rune-green { background: #00ff66; box-shadow: 0 0 10px #00ff66; }
    .rune-yellow { background: #ffcc00; box-shadow: 0 0 10px #ffcc00; }
    
    .fw-submit {
        width: 100%; background: #ff0055; color: white; border: none; padding: 15px;
        font-size: 18px; cursor: pointer; margin-top: 15px; font-weight: bold;
    }
    .fw-submit:hover { background: #ff4477; }
`;
document.head.appendChild(styleFirewall);

// 2. INJECT HTML
const divFirewall = document.createElement('div');
divFirewall.id = 'firewall-overlay';
divFirewall.innerHTML = `
    <div class="fw-box">
        <h2 style="margin:0 0 10px 0;">FIREWALL HANDSHAKE</h2>
        
        <div id="fw-log-display" class="fw-log">
            > SYSTEM READY...<br> > AWAITING PACKET INJECTION...
        </div>

        <div id="fw-input-slots" class="fw-slots">
            <div class="fw-slot"></div><div class="fw-slot"></div>
            <div class="fw-slot"></div><div class="fw-slot"></div>
        </div>

        <div>
            <button class="fw-btn rune-red" onclick="FirewallGame.add('red')"></button>
            <button class="fw-btn rune-blue" onclick="FirewallGame.add('blue')"></button>
            <button class="fw-btn rune-green" onclick="FirewallGame.add('green')"></button>
            <button class="fw-btn rune-yellow" onclick="FirewallGame.add('yellow')"></button>
        </div>
        
        <button class="fw-submit" onclick="FirewallGame.submit()">UPLOAD PACKET</button>
    </div>
`;
document.body.appendChild(divFirewall);

// 3. GAME LOGIC
const FirewallGame = {
    input: [],
    secret: ['red', 'blue', 'green', 'red'], // The Secret Code

    start: function() {
        document.getElementById('firewall-overlay').style.display = 'flex';
        this.input = [];
        this.render();
        document.getElementById('fw-log-display').innerHTML = "> SYSTEM READY...";
    },

    add: function(color) {
        if(this.input.length < 4) {
            this.input.push(color);
            this.render();
        }
    },

    render: function() {
        const container = document.getElementById('fw-input-slots');
        container.innerHTML = '';
        for(let i=0; i<4; i++) {
            let div = document.createElement('div');
            div.className = 'fw-slot';
            if(i < this.input.length) {
                div.innerHTML = `<div style="width:100%; height:100%;" class="rune-${this.input[i]}"></div>`;
            }
            container.appendChild(div);
        }
    },

    submit: function() {
        if(this.input.length !== 4) return;

        // Calculate Bulls (Exact) and Cows (Color match only)
        let exact = 0;
        let partial = 0;
        let tempSecret = [...this.secret];
        let tempInput = [...this.input];

        // 1. Find Exact
        for(let i=3; i>=0; i--) {
            if(tempInput[i] === tempSecret[i]) {
                exact++;
                tempInput.splice(i, 1);
                tempSecret.splice(i, 1);
            }
        }
        // 2. Find Partial
        for(let i=0; i<tempInput.length; i++) {
            let index = tempSecret.indexOf(tempInput[i]);
            if(index !== -1) {
                partial++;
                tempSecret.splice(index, 1);
            }
        }

        // Log it
        const log = document.getElementById('fw-log-display');
        log.innerHTML += `<br>> PACKET SENT. MATCHES: <span style="color:#fff">${exact} EXACT</span> | ${partial} PARTIAL`;
        log.scrollTop = log.scrollHeight;

        if(exact === 4) {
            setTimeout(() => {
                alert("FIREWALL BREACHED. DATA SECURED.");
                document.getElementById('firewall-overlay').style.display = 'none';
                if(window.unityInstance) {
                    window.unityInstance.SendMessage('GameManager', 'MiniGameComplete', 'firewall');
                }
            }, 500);
        }
        
        this.input = [];
        this.render();
    }
};

// Global hook
window.startFirewallGame = function() { FirewallGame.start(); };