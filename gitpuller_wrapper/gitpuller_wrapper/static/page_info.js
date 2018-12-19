
// Probably not the best way to cheat the HTML in.... but whatchagonnado?
// TODO: Learn how to do this as a .html page, rather than a javascript function. 
// On the other hand, it doesn't _really_ matter, it would just make it easier to edit in the future
function html_page(){
    return  `<div id="gitpuller" class="tab-pane">
    <div id="gitpuller_toolbar" class="row">
      <div class="col-xs-8 no-padding">
       <span id="page_info">
        <h1> Download Notebook Resources </h1>
                In the text box below you can enter a github link and the contents of that repository will
             be automatically downloaded to your repo. This uses <a href="https://github.com/jupyterhub/nbgitpuller", target="_blank"> 
             nbgitpuller</a> (for notebook git puller) to download new materials from github.
             <br>
             Note: You may need to allow pop ups from this site. 
            <br><br>
            
             <div class='input'>
             <style>
             input[type=text], .input {
                width: 100%;
                padding: 12px 20px;
                margin: 8px 0;
                display: inline-block;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }
            .input {
                border-radius: 5px;
                background-color: #f2f2f2;
                padding: 20px;
            }
            </style>
             <input class="target" type="text" id="repo" name="repo" value="" placeholder="Enter repo/notebook url">
            </div>
             <h3> Instructions </h3>
                To download a new repository, search <a href='www.github.com', target="_blank" > github </a> for notebooks that 
             you find interesting. Once you find a notebook or repository that you would like to explore
             further on the hub, copy the url of the repository into the text box below, and we'll take care of
             the rest!

             For example, suppose you wanted to use notebooks from our sample repo available at the following
             link
             <br> <br>
             <a href='https://github.com/callysto/callysto-sample-notebooks/tree/workshop_demos', target=_'blank'> https://github.com/callysto/callysto-sample-notebooks/tree/workshop_demos</a>
             <br> <br>
             To download that repository into your hub, copy that link into the text box above
             and press enter. You will be redirected to a new tab and a (usually brief) loading screen. Once 
             it's complete, you'll have a new directory called <code>callysto-sample-notebooks</code> in your 
             hub environment. 
             <br>
             <br>

                Alternatively, if you're looking at a specific notebook within a repository, say a notebook in 
             the above repository at 
             <br> <br>
             <a href='https://github.com/callysto/callysto-sample-notebooks/blob/workshop_demos/notebooks/Math/FlippingCoins.ipynb', target="_blank"> https://github.com/callysto/callysto-sample-notebooks/blob/workshop_demos/notebooks/Math/FlippingCoins.ipynb </a>
             <br> <br>
             Simply copy the link directly to the notebook you're interested in. The entire repository
             will still be copied, however, the notebook of interest will be opened immediately in your repository and be ready to explore. 
             <br>
             <br>
             Try it out by copying one of the links above into the text box at the top of the page, or enter any other repository with
             Jupyter notebooks and have them copied into your hub environment. 
             <br>
             <br>
             <h3> Note </h3>
              <code>nbgitpuller</code> will not install any additional library dependancies that may be 
              required to use any notebooks that you've downloaded. In most cases, you'll see those errors
              when you first run the notebook as an error in your notebook similar to the following
              <br><br>
              <!-- HTML generated using hilite.me -->
              <div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;">
              <pre style="margin: 0; line-height: 125%">ModuleNotFoundError                       Traceback (most recent call last)
&lt;ipython-input-2-37b1e8eba12f&gt; <span style="color: #0000ff">in</span> &lt;module&gt;()
----&gt; 1 <span style="color: #0000ff">import</span> MissingModule

ModuleNotFoundError: No module named <span style="color: #a31515">&#39;MissingModule&#39;</span>
</pre></div>
             
            <br> <br>
            If this happens to you, more than likely you can solve this problem by opening a new code
            cell and typing <br><br>
            <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">!pip install MissingModule --user
</pre></div>
            <br><br>
            By pressing Ctrl + Enter after replacing <code>MissingModule</code> with the module that you're
            missing, you will download and install the required packages.

            If this doesn't resolve your module not found errors, you may have to consult the <code>README.md</code>
            of the github repository and follow their installation instructions.
            <br>
            <br>
        </span>
      </div>
   </div>
  </div>`;
}