function getNumberOfTables(){
	return localStorage["NumTable"];
}

function getStoreId(){
	return localStorage["StoreId"];
}

function getStoreName(){
	return localStorage["StoreName"];
}

function SaveStoreName(storeId, storeName){
	localStorage["StoreName"] = storeName;
	localStorage["StoreId"] = storeId;
	
	// close the panel
	$( "#panelStoreName" ).panel( "close" );
	return false;
}

// Persist number of tables to localStorage only if
function setLocalNumberOfTables(numTable){
	var x = parseInt(numTable);
	if (!isNaN(x) && x > 0) {
		localStorage["NumTable"] = x;
	}
}

// Retrieve number of tables from localStorage. Return zero if it is not defined.
function getLocalNumberOfTables(){
	var numTable = parseInt(localStorage["NumTable"]);
	if (isNaN(numTable)) {
		return 0
	} else {
		return numTable
	}		
}

// If number of tables has not been defined then assume it is 20 tables
function initNumberOfTables(){
	if (getLocalNumberOfTables() == 0) {
		setLocalNumberOfTables(20);
	}
}

// for manually enter number of table
function SaveNumTable(){
	setLocalNumberOfTables($('input[name=\"KeypadDisplay\"]').val());re_generateTableList();
}

// Generate HTML code for number of tables interface
function generateTableList() {
	var t = getLocalNumberOfTables();
	if (t < 1) {
		initNumberOfTables();
		t = getLocalNumberOfTables();
	};

	var $node="";
	for (var i=1; i<=t; i++) {
		$node += '<div class="box"><div class="boxInner"><div class="titleBox select_table">'+i+'</div></div></div>';
	};
	return $node;
}


// Replace TableList with newly generated HTML code
function re_generateTableList() {
	$( "#TableList" ).empty().append( generateTableList() );
}

// Generate HTML for phone keypad
function generatePhoneKeypad(){
	var $node="";
	for (var i=1; i<=9; i++) {
		$node += '<div class="box3PerRow"><div class="boxInner"><div class="titleBox calculator">'+i+'</div></div></div>';
	};
	$node += '<div class="box3PerRow"><div class="boxInner"><div class="titleBox calculator clear-cal">Clear</div></div></div>';
	$node += '<div class="box3PerRow"><div class="boxInner"><div class="titleBox calculator">0</div></div></div>';
	$node += '<div class="box3PerRow"><div class="boxInner"><div class="titleBox calculator clear-cal">Clear</div></div></div>';
	return $node;
}

// Generate HTML for the page footer
function generateFixedFooter() {
	if ($('div').attr('pageFooter') == undefined) {
		return '<div class="pageFooter ui-footer ui-footer-fixed slideup ui-bar-inherit" data-role="footer" data-position="fixed" role="contentinfo"><h4 class="ui-title" role="heading" aria-level="1">© 2013 By Phở Nam</h4></div>';
	} else {
		return '';
	}
}

// Handle behavior of the select-table interface
function tableHandler( event ){
	// Highlight tapped button
  	$("div.select_table").removeClass( "tap" );
    $( event.target ).addClass( "tap" );
    // Transit to page 2
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#page2", { transition: "slide" } );
    // Update header text
   	curTable = $(this).html();
   	if (curTable) {
		$( "#GuestCount" ).html("# Guests at table " + curTable);
   	} else {
		$( "#GuestCount" ).html("Table?");
	}
 };

// Handle behavior of the select-number-of-guests interface
 function calculatorHandler( event ){
	 // Get value of tapped tile
	 calDisplay = $(this).html();
	 // If it is Clear, clear the input field
	 if (calDisplay === "Clear") {
		 $( "#KeypadDisplay" ).val("");
	 } else {
		 // Limit the entry to 3-digit number
		 if ($( "#KeypadDisplay" ).val() < 100){
			$( "#KeypadDisplay" ).val( $( "#KeypadDisplay" ).val()+calDisplay);
		 }
	 };
};

// Determine if local storage feature is available
// could use Modernizr if later we need more features from Modernizr; for now, use this code
function supports_html5_storage() {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
	}