/**
 * Created by malith on 04/07/17.
 */
import './_sidebar.html';
/** Rendered Initialisation */
Template.condensedSideBar.onRendered(function () {
	var tpl = this;
	// tpl.$(".fooJqueryPlugin").initialise()
	tpl.$('[data-pages="sidebar"]').each(function () {
		var $sidebar = tpl.$(this);
		$sidebar.sidebar($sidebar.data())
	});

	/*
	 * Closes and Hides Sidebar before Route Change
	 * */
	if (Meteor.isClient) {
		// Set for all route changes
		FlowRouter.triggers.exit([function () {
			$("body").removeClass("sidebar-open");
			$("body .page-sidebar").removeClass("visible");
		}]);
	}
});


/** Template Helpers */
/*
 Template._sideBar.helpers({
 // Register template helpers with arguments {{foo "John" "Doe" title="President"}}
 // foo: function (first, last, keyword) { return keyword.hash.title + firstName + " " + lastName; }

 });
 */

/** jQuery Events */

/*
 Template._sideBar.events({
 // Fires when 'accept' is clicked or focused, or a key is pressed
 // 'click .accept, focus .accept, keypress': function (event) { ... }

 });
 */

/** Set-Up Subscriptions and Registrations */
/*
 Template._sideBar.onCreated(function () {
 var tpl = this;
 // set up subscriptions, local reactive variables, registrations
 // tpl.subscribe("notifications");
 });
 */


/** De-Registrations */

/*
 Template._sideBar.onDestroyed(function () {
 var tpl = this;
 // de-registration

 });
 */
 