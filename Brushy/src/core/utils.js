function log() {
    // formats/indents for better readability
    for (let i=0; i<arguments.length; i++){
        let arg = arguments[i];
        // Stringify and indent
        if (typeof arg === 'object') {
            arg = JSON.stringify(arg, null, 2);
        }
        console.log(arg);
    }
}


export default {log}