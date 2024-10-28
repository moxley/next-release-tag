class TagBuilder {
    constructor(tagTemplate) {
        this.tagTemplate = `${tagTemplate}`; // Deep copy
    }
    static format(value) {
        return value < 10 ? `0${value}` : `${value}`;
    }
    inject(templatePart, value) {
        this.tagTemplate = this.tagTemplate.replaceAll(templatePart, TagBuilder.format(value));
        return this;
    }
    addPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }
    build() {
        if (!this.prefix) {
            return this.tagTemplate;
        }
        return `${this.prefix}${this.tagTemplate}`;
    }
}
export default TagBuilder;
