{
    // method to submit the form data for new post using AJAX
  let createPost = function() {
    let newPostForm = $('#new-post-form');
    
    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button', newPost));
            }, error: function(error){
                console.log(error.responseText);
            }
        });
    });
// method to create a post in DOM
}
let newPostDom = function(post){
    return $(`<li id="posts-${post._id}">
    <p> 
        <!-- show delete button visible only if user is logged in.only  Owner of the post should be able to see delete button for the particular post   -->
        
        <small>
          <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>  
        </small>
       
        ${post.content}
    <br>
    <small>
    ${ post.user.name }
    </small>
    </p>
    <div class="post-comments">
           
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>
           
     <div class="post-comments-list">
        <ul id="post-comments- ${ post._id }">
             
        </ul>
     </div>
    </div>

</li> 
`)
}
// method to delete a post from DOM
let deletePost = function(deleteLink){
    ${deleteLink}.click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(error){
                $(`#post-${data.data.post_id}`).remove();
            }, error: function(error){
                console.log(error.responseText);
            }
        })
    })
}

createPost();
}