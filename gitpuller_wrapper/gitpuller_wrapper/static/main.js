// This code will add a "New Notebooks" tab to your jupyter hub environment 
// and provide you with a text entry widget that you can paste github links into
// and use nbgitpuller to bring the repository/notebook into your hub environment.

// TODO: Probably should make sure the user doesn't already have the repo before
// we pull it 

define(function(require){
    var Jupyter = require('base/js/namespace');
    var utils = require('base/js/utils')
    var ajax = utils.ajax
    // grab giturl parser 
    var gh = require('./parse-git');
    // grab html stuff
    var page = require('./page_info');

    // This is a function from page_info.js that dumps the html for the page
    var page_text = html_page()
    
    function load() {

        if (!Jupyter.notebook_list) return;
        var base_url = Jupyter.notebook_list.base_url;
        // page_text really should be an .html file, but I haven't been able to get 
        // Jupyter to let me import an html file.
        $(".tab-content").append(page_text);

        // Set up event handling for changes on the text field. 
        $( ".target").change(function() {
            // #repo is defined in html_page()
            Jupyter.repoPull = $('#repo').val();

            // UPDATE: Should pull to whatever hub you're on now.
            var url_head = base_url + 'git-pull?';

            // if user accidentally enters a blank line, don't do anything
            if (Jupyter.repoPull == ''){
                return;
            };

            // add https if they forgot (links 404 without it)
            if (Jupyter.repoPull.includes("https://")){
                // Do nothing
            } else {
                Jupyter.repoPull = "https://" + Jupyter.repoPull;
            };
            
            // First, check if the user has entered a github link
            var rep_info = gh.gh(Jupyter.repoPull);
            console.log(rep_info)
            if(rep_info.host != 'github.com'){
                var message = "Unfortunately the address ";
                message = message + Jupyter.repoPull;
                message = message + " is not a github link. \nPlease provide a link to a repository or file hosted on github.com.";
                alert(message);
                return;
            };      
            // Now we check if the git link they've supplied exits, if it does
            // run the nbgitpuller stuff via PingHandler 

            function urlExists(url, successCallback) {
                $.getJSON(utils.get_body_data('baseUrl') + 'ping', $.param({'url': url}), 
                function(data) {
                    if (data.code == '200'){
                        successCallback()
                    } else {
                        alert("The github link:\n" + url + "\nreturned status: " + data.code + ".\nplease check for typos in your link.");
                       
                    }
                });
            }
           
        
            // Asynch test if the repo exists or not, if it does, construct nbgitpuller link
            // and open it in a new tab 

             urlExists(Jupyter.repoPull, function() {

                // If git link isn't a repository, tell the user
                var bad_link = "The git address\n " + Jupyter.repoPull + "\nis not a repository"
                
                if (rep_info.repo == null){
                    alert(bad_link + ".")
                    return
                };
                // This is a search, don't want it
                if(rep_info.search != null){
                    alert(bad_link + ", and looks like it might be a search result. ")
                    return
                }
                // This is a query result, don't want it
                if(rep_info.query != null){
                    alert(bad_link + ", and looks like it might be a search")
                    return
                }
                
                var repo = "https://" + rep_info.hostname + "/" + rep_info.repo ;
                var subPath = rep_info.filepath;
                var git_pull = url_head + "repo=" + repo + "&branch="+ rep_info.branch ;
                // Only include the specific notebook redirect if we can find it in the url. 
                if (subPath != null){
                    git_pull = git_pull + "&subPath=" + subPath;
                };
                // open nbgitpuller link in a new tab
                var win = window.open(git_pull, "_blank");
                win.focus();

              });
        })
        // Add a new tab (to the hub)
        $("#tabs").append(
            $('<li>')
            .append(
                $('<a>')
                .attr('href', '#gitpuller')
                .attr('data-toggle', 'tab')
                .text('Github Notebooks')
                .click(function (e) {
                    window.history.pushState(null, null, '#gitpuller');
                })
            )
        );  
    }
    return {
        load_ipython_extension: load,
    };
});
