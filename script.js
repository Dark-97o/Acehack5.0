document.addEventListener('DOMContentLoaded', () => {
    const statusLine = document.getElementById('status-line');
    const bootSequence = document.getElementById('boot-sequence');
    const mainContent = document.getElementById('main-content');
    
    const bootMessages = [
        "EXECUTING DEPLOYMENT PROTOCOL v5.0",
        "VERIFYING SECURITY CREDENTIALS... [OK]",
        "ALLOCATING 64MB HEAP FOR COMMAND CORE",
        "LOADING MAP ASSETS: 'PIXEL-BATTLEFIELD'...",
        "COMPILING TACTICAL DATA...",
        "STATUS: BOOT COMPLETE. AWAITING USER COMMAND."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    const typingSpeed = 10; // Very fast typing speed
    const lineDelay = 300;  // Minimal delay between lines

    function typeMessage() {
        if (messageIndex < bootMessages.length) {
            const currentMessage = bootMessages[messageIndex];
            
            if (charIndex < currentMessage.length) {
                statusLine.textContent += currentMessage.charAt(charIndex);
                charIndex++;
                setTimeout(typeMessage, typingSpeed);
            } else {
                messageIndex++;
                charIndex = 0;
                statusLine.textContent += '\n'; 
                if (messageIndex < bootMessages.length) {
                    statusLine.style.animation = 'status-flicker 0.1s step-end 3 alternate';
                    setTimeout(() => {
                        statusLine.style.animation = 'none';
                        typeMessage();
                    }, lineDelay);
                } else {
                    // Final reveal is now very quick
                    setTimeout(showMainContent, 300); 
                }
            }
        }
    }

    function showMainContent() {
        bootSequence.style.opacity = '0';
        
        setTimeout(() => {
            bootSequence.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 500); // Quick fade time
    }

    // Start the whole sequence immediately
    setTimeout(typeMessage, 100); 
});
