exports.first_name_func = function(value) {
    if(value.length<2) {
        return {
            validate: 'input100 red_input',
            boolean: false
        };
    } else {
        return {
            validate: 'input100 green_input',
            boolean: true
        };
    }
}

exports.last_name_func = function(value) {
    if(value.length<2) {
        return {
            validate: 'input100 red_input',
            boolean: false
        };
    } else {
        return {
            validate: 'input100 green_input',
            boolean: true
        };
    }
}

exports.username_func = function(value) {
    var pattern = /^([a-z0-9_\.-])+[a-z0-9-]$/i;
    if (!pattern.test(value) || value.length<4 || value.length>32) {
        return {
            validate: 'input100 red_input',
            boolean: false
        }
    } else {
        return {
            validate: 'input100 green_input',
            boolean: true
        }
    }
}

exports.email_func = function(value) {
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
    if (!pattern.test(value)) {
        return {
            validate: 'input100 red_input',
            boolean: false
        }
    }
    else {
        return{ 
            validate: 'input100 green_input',
            boolean: true
        }
    }
}

exports.password_func = function(value) {
    if(value.length<4 || value.length>32) {
        return {
            validate: 'input100 red_input',
            boolean: false
        }
    }
    else {
        return {
            validate: 'input100 green_input',
            boolean: true
        }
    }
}