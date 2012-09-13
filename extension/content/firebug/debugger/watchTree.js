/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/firebug",
    "firebug/lib/domplate",
    "firebug/lib/events",
    "firebug/lib/dom",
    "firebug/lib/css",
    "firebug/lib/array",
    "firebug/chrome/domTree",
    "firebug/lib/locale",
    "firebug/debugger/grips",
],
function(Obj, Firebug, Domplate, Events, Dom, Css, Arr, DomTree, Locale, Grips) {
with (Domplate) {

// ********************************************************************************************* //
// DOM Tree Implementation

function WatchTree(provider)
{
    this.provider = provider;
}

/**
 * @domplate Represents a tree of properties/objects
 */
BaseTree = DomTree.prototype
WatchTree.prototype = domplate(BaseTree,
{
    tag:
        TABLE({"class": "domTable", cellpadding: 0, cellspacing: 0,
               _toggles: "$toggles", _domPanel: "$domPanel", onclick: "$onClick", role: "tree"},
            TBODY({role: "presentation"},
                TR({"class": "watchNewRow", level: 0},
                    TD({"class": "watchEditCell", colspan: 3},
                        DIV({"class": "watchEditBox a11yFocusNoTab", role: "button", tabindex: "0",
                            "aria-label": Locale.$STR("a11y.labels.press enter to add new watch expression")},
                                Locale.$STR("NewWatch")
                        )
                    )
                ),
                FOR("member", "$object|memberIterator", 
                    TAG("$member|getRowTag", {member: "$member"}))
            )
        ),

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

    getType: function(object)
    {
        // Customize CSS style for a memberRow. The type creates additional class name
        // for the row: 'type' + Row. So, the following creates "scopesRow" class that
        // decorates Scope rows.
        if (object instanceof Grips.Scope)
            return "scopes";

        return BaseTree.getType.apply(this, arguments);
    }
});

// ********************************************************************************************* //
// Registration

return WatchTree;

// ********************************************************************************************* //
}});
