/* =========================================
   CIRCUIT PUZZLE (The Logic Gate Matrix)
   ========================================= */

// 1. INJECT CSS FOR CIRCUIT PUZZLE
const styleCircuit = document.createElement('style');
styleCircuit.innerHTML = `
    #circuit-overlay {
        display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 5, 10, 0.98); z-index: 9999;
        font-family: 'Courier New', monospace; color: #00f3ff;
        justify-content: center; align-items: center; flex-direction: column;
    }
    .cp-box {
        border: 2px solid #00f3ff; padding: 40px; background: rgba(0, 20, 30, 0.9);
        text-align: center; box-shadow: 0 0 30px rgba(0, 243, 255, 0.15); width: 600px;
    }
    .cp-row { display: flex; justify-content: center; gap: 30px; margin: 30px 0; }
    .cp-light { 
        width: 50px; height: 50px; border-radius: 50%; border: 3px solid #333; background: #111;
        transition: 0.3s;
    }
    .cp-light.on { background: #00ff66; box-shadow: 0 0 20px #00ff66; border-color: #fff; }
    .cp-btn {
        background: #000; color: #00f3ff; border: 1px solid #00f3ff;
        width: 80px; height: 40px; cursor: pointer; font-size: 16px; transition: 0.2s;
    }
    .cp-btn:hover { background: #00f3ff; color: #000; box-shadow: 0 0 15px #00f3ff; }
`;
document.head.appendChild(styleCircuit);

// 2. INJECT HTML
const divCircuit = document.createElement('div');
divCircuit.id = 'circuit-overlay';
divCircuit.innerHTML = `
    <div class="cp-box">
        <h2 style="margin:0 0 20px 0; letter-spacing:3px;">LOGIC GATE OVERRIDE</h2>
        
        <div class="cp-row">
            <div><div id="c-l-a" class="cp-light"></div><div style="margin-top:5px">A</div></div>
            <div><div id="c-l-b" class="cp-light"></div><div style="margin-top:5px">B</div></div>
            <div><div id="c-l-c" class="cp-light"></div><div style="margin-top:5px">C</div></div>
            <div><div id="c-l-d" class="cp-light"></div><div style="margin-top:5px">D</div></div>
        </div>

        <div class="cp-row">
            <button class="cp-btn" onclick="CircuitGame.flip(1)">SW 1</button>
            <button class="cp-btn" onclick="CircuitGame.flip(2)">SW 2</button>
            <button class="cp-btn" onclick="CircuitGame.flip(3)">SW 3</button>
            <button class="cp-btn" onclick="CircuitGame.flip(4)">SW 4</button>
        </div>
        
        <div style="color:#666; font-size:12px; border-top:1px solid #333; padding-top:10px;">
            > ERROR: PARITY MISMATCH <br> > GOAL: ACTIVATE ALL GATES
        </div>
    </div>
`;
document.body.appendChild(divCircuit);

// 3. GAME LOGIC OBJECT
const CircuitGame = {
    state: { a: false, b: false, c: false, d: false },

    // Unity calls this function to open the game
    start: function() {
        document.getElementById('circuit-overlay').style.display = 'flex';
        this.state = { a: false, b: false, c: false, d: false }; // Reset
        this.updateView();
    },

    flip: function(id) {
        // The 4-Switch Matrix Logic
        if(id === 1) { this.state.a = !this.state.a; this.state.b = !this.state.b; this.state.c = !this.state.c; }
        if(id === 2) { this.state.b = !this.state.b; this.state.d = !this.state.d; }
        if(id === 3) { this.state.a = !this.state.a; this.state.d = !this.state.d; }
        if(id === 4) { this.state.c = !this.state.c; this.state.d = !this.state.d; }
        
        this.updateView();
        this.checkWin();
    },

    updateView: function() {
        const toggle = (id, on) => document.getElementById(id).classList.toggle('on', on);
        toggle('c-l-a', this.state.a);
        toggle('c-l-b', this.state.b);
        toggle('c-l-c', this.state.c);
        toggle('c-l-d', this.state.d);
    },

    checkWin: function() {
        if(this.state.a && this.state.b && this.state.c && this.state.d) {
            setTimeout(() => {
                alert("CIRCUIT BYPASSED. DOOR UNLOCKED.");
                document.getElementById('circuit-overlay').style.display = 'none';
                
                // Send success message to Unity
                if(window.unityInstance) {
                    window.unityInstance.SendMessage('GameManager', 'MiniGameComplete', 'circuit');
                }
            }, 300);
        }
    }
};

// Global hook for Unity
window.startCircuitGame = function() { CircuitGame.start(); };