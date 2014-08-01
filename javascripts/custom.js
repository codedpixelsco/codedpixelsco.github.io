var m = new mandrill.Mandrill('Y2wsMlwwhBmph4XyxUZsKQ');

var params = {
	"message": {
		"from_email": "codedpixels.co@gmail.com",
		"from_name": "CodedPixels.co",
		"to": [{ "email": "codedpixels.co@gmail.com" }],
		"subject": "Yay! CodedPixels.co Work Enquiry"
	}

};

/**
 * Jquery validation method to add http:// to validate a url
 */
$.validator.addMethod("complete_url", function(val, elem) {
    // if no url, don't do anything
    if (val.length == 0) { return true; }

    // if user has not entered http:// https:// or ftp:// assume they mean http://
    if(!/^(https?|ftp):\/\//i.test(val)) {
        val = 'http://'+val; // set both the value
        $(elem).val(val); // also update the form element
    }
    // now check if valid url
    // http://docs.jquery.com/Plugins/Validation/Methods/url
    // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
});


function sendTheMail () {
	// Update params, add text 
	params.message.text = createMessage()

	// Send the email
	m.messages.send(params, function(res){
		console.log(res)
	}, function(err){
		console.log(err)
	});
}

function createMessage () {
	var message = "";
	var quote_form = $('form#quote_form')
	var name = quote_form.find('input[name=name]').val()
	var email = quote_form.find('input[name=email]').val()
	var website = quote_form.find('input[name=website]').val()
	var project_goal = quote_form.find('textarea[name=project_goal]').val()

	message += "Someone is interested to work with us! Please see details below:\n\nName: "+name+"\nEmail: "+email+"\nWebsite: "+website+"\nGoal: "+project_goal;

	return message;
}

$(document).ready(function(){
  $(".type").typed({
    strings: ["Startup", "Ecommerce", "Blog"],
    typeSpeed: 200,
    backDelay:5000,
    loop: true,
    loopCount: false,
  });

  $('form#quote_form').validate({
  	submitHandler: function(form){
  		// send info to codedpixels.co@gmail.com
  		sendTheMail();
  		
  		// show success message
  		$('p#quote_form_sent_success').fadeIn('slow').css('display', '')
  		return false;
  	}
  });
});

