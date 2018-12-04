// This code will add a "New Notebooks" tab to your jupyter hub environment 
// and provide you with a text entry widget that you can paste github links into
// and use nbgitpuller to bring the repository/notebook into your hub environment.


define(function(require){
    var $ = require('jquery');
    var Jupyter = require('base/js/namespace');
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

            // TODO: Probably grab the hub.callysto bit from the Jupyter info 
            // so this is general to any hub?
            var url_head = "https://hub.callysto.ca/jupyter/hub/user-redirect/git-pull?";

            // if user accidentally enters a blank line, don't do anything
            if (Jupyter.repoPull == ''){
                return;
            };

            // add https if they forgot (links 404 without it)
            if (Jupyter.repoPull.includes("https://")){
                console.log("SDFSDF")
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
            // run the nbgitpuller stuff
            function logResults(json){
                console.log(json);
              }
            function urlExists(url, successCallback) {
                $.ajax({
                  url: url,
                  dataType: "jsonp",
                  jsonpCallback:"logResults",
                  statusCode: {
                    200: function(response) {
                      successCallback()
                    },
                    404: function(response) {
                      alert("Unfortunately the gitub link you entered: \n" + url + "\ndoes not exist (error 404)")
                    }
                  }
                });
              }
            // Asynch test if the repo exists or not, if it does, construct nbgitpuller link
            // and open it in a new tab 

            // Need to specify API so you don't get nailed for cross origin calls
             urlExists("https://api."+Jupyter.repoPull.replace("https://", ''), function() {
               
                // If the link exists, I guess we can make the nbgitpuller link

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
                .text('New Notebooks')
                .click(function (e) {
                    window.history.pushState(null, null, '#gitpuller');
                })
            )
        );
       
    }
    
    return {
        load_ipython_extension: load
    };
});

