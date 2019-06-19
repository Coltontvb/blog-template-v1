//Application global contstants
const express    = require(`express`);
const bodyParser = require(`body-parser`);
const ejs        = require('ejs');
const _          = require(`lodash`);        
//run up express
const app = express();
//all posts
const posts = [];
//page tester
const pageStartContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.` 

//using ejs template
app.set(`view engine`, `ejs`);
//run up body parser
app.use(bodyParser.urlencoded({extended: true}));
//set express static files
app.use(express.static(`public`));


//HOME ROUTE
app.get(`/`, function(req, res){
    res.render(`home`, {
        pageStartContent: pageStartContent,
        posts: posts
    });
})
//ABOUT ROUTE
app.get(`/about`, function(req, res){
    res.render(`about`, {pageStartContent: pageStartContent});
})
//CONTACT ROUTE
app.get(`/contact`, function(req, res){
    res.render(`contact`, {pageStartContent: pageStartContent});
})
//NEW POST
app.get(`/compose`, function(req, res){
    res.render(`compose`)
})

//DYNAMIC POST ID ROUTE:
app.get(`/posts/:postId`, function (req, res){
    const requestedPostId = _.lowerCase(req.params.postId)
    posts.forEach(function(post){
        const urlString = _.lowerCase(post.newPostTitle);
        if (urlString === requestedPostId){
            const title = post.newPostTitle;
            const content = post.newPostContent;
            res.render(`post`,{
                title: title,
                content: content,
            });
        } else {
            res.redirect('/');
        }
    })
})
//NEW POSTS POST ROUTE
app.post(`/compose`, function(req, res){
    const newPost = {
        newPostTitle: req.body.newPostTitle,
        newPostContent: req.body.newPostContent
    }
    posts.push(newPost);
    res.redirect(`/`);
})






















app.listen(3000, function() {
    console.log(`Server started on port 3000`);
})