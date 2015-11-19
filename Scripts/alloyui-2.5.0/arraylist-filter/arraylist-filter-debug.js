YUI.add('arraylist-filter', function (Y, NAME) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule arraylist-filter
 * @deprecated Use ModelList or a custom subclass implementation
 */

/*
 * Adds filter method to ArrayList prototype
 */
Y.mix(Y.ArrayList.prototype, {

    /**
     * <p>Create a new ArrayList (or augmenting class instance) from a subset
     * of items as determined by the boolean function passed as the
     * argument.  The original ArrayList is unchanged.</p>
     *
     * <p>The validator signature is <code>validator( item )</code>.</p>
     *
     * @method filter
     * @param { Function } validator Boolean function to determine in or out.
     * @return { ArrayList } New instance based on who passed the validator.
     * @for ArrayList
     * @deprecated Use ModelList or a custom subclass implementation
     */
    filter: function(validator) {
        var items = [];

        Y.Array.each(this._items, function(item, i) {
            item = this.item(i);

            if (validator(item)) {
                items.push(item);
            }
        }, this);

        return new this.constructor(items);
    }

});


}, 'patched-v3.16.0', {"requires": ["arraylist"]});
