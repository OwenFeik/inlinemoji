const EMOJI_NAME_REGEX = /:(\w+)$/; 

var host = specialReplCase(new URL(location.href).hostname);

function getEmoji(name) {
    return EMOJI_MAPPING[name];
}

function getElementValue(element) {
    if (element.value) {
        return element.value;
    }
    else if (element.contentEditable) {
        return element.textContent;
    }
    else {
        return undefined;
    }
}

function logError(message, ...data) {
    console.error("[inlinemoji] " + message, ...data);
}

function specialReplCase(host) {
    if (/\bmessenger.com.*/.test(host)) {
        return "facebook_messenger";
    }
    else {
        return "none";
    }
}

function setElementValue(element, value) {
    if (element.value) {
        switch (host) {
            default: element.value = value; 
        }
    }
    else if (element.contentEditable) {
        switch (host) {
            case "facebook_messenger":
                element.textContent = value;
                if (element.getAttribute('aria-label') == 'Message') {
                    document
                        .querySelector('[data-lexical-text]')
                        .innerText = value;
                    break;
                }
            default: element.textContent = value; 
        }
    }
    else {
        logError("Don't know how to set value of: ", element);
    }
}

function extractEmojiName(string) {
    if (match = EMOJI_NAME_REGEX.exec(string)) {
        return match[1];
    }
    else {
        return undefined;
    }
}

function replaceEmojiName(string, repl) {
    return string.replace(EMOJI_NAME_REGEX, repl);
}

function keydownHandler(event) {
    if (event.key != ':') {
        return;
    }

    let value = getElementValue(event.target);
    let name = extractEmojiName(value);
    let emoji = getEmoji(name);
    
    if (emoji) {
        setElementValue(event.target, replaceEmojiName(value, emoji));
        event.preventDefault();
    }
}

window.addEventListener("keydown", keydownHandler);
