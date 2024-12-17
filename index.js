export default class Validator {
    string() {
        return new StringValidator();
    }

    array() {
        return new ArrayValidator();
    }
}

class StringValidator {
    constructor() {
        this.checks = [];
    }

    isValid(value) {
        if (value === null || typeof value !== 'string') {
            return false;
        }

        for (const check of this.checks) {
            if (!check(value)) {
                return false;
            }
        }

        return true;
    }

    containsNumber() {
        this.checks.push(value => /\d/.test(value));
        return this;
    }
}

class ArrayValidator {
    constructor() {
        this.checks = [];
    }

    isValid(value) {
        if (!Array.isArray(value)) {
            return false;
        }

        for (const item of value) {
            if (typeof item === 'string') {
                const stringValidator = new StringValidator();
                if (!stringValidator.isValid(item) || !this.checks.every(check => check(item))) {
                    return false;
                }
            } else if (typeof item !== 'string') {
                return false;
            }
        }

        return true;
    }

    containsNumber() {
        this.checks.push(value => /\d/.test(value));
        return this;
    }

    custom(check) {
        this.checks.push(check);
        return this;
    }
}