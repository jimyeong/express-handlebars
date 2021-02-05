
module.exports = function(Handlebars){
    Handlebars.registerHelper('switch', function(value, options) {
        this.switch_value = value;
        return options.fn(this);
    });

    Handlebars.registerHelper('case', function(value, options) {
        if (value == this.switch_value) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('default', function(value, options) {
        return true; ///We can add condition if needs
    });
}
