import { Component, Input, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { LinksService } from 'src/app/services/links/links.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post;
  html:any;
  content_link:any;
  is_loading_comment: boolean = false;

  constructor(
    private link: LinksService,
    private modal: NgxSmartModalService,
    private postService: PostsService,
    private modalService: NgxSmartModalService,
  ) { }

  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  ngOnInit(): void {

    if(this.post.post_content){
      this.post.post_content =this.link.getlink(this.post.post_content);
      this.content_link = this.link.checkLinks(this.post.post_content);
      this.content_link = this.sanitizeUrl(this.content_link.url);
    }
    
  }
  links:any;
  allowNewLine(text) {

    return text.replace(/\r\n|\r|\n/g, "<br />");
  }
  scrollRequesting: any = false;
  limit: any = 10;
  isLoading: boolean = false;
  onScroll(ev: any){
    let scrollHeight = ev.target.scrollHeight;
    let combined = ev.target.scrollTop + ev.target.clientHeight;
    if (!this.scrollRequesting && scrollHeight == combined && this.post.post_comment.next_page){
      this.getNewComment();
      this.scrollRequesting = true;
    }else{
      return false;
    }
  }
  getNewComment(){
    this.isLoading = true;
    this.postService.getcommentScroll(this.post.id, this.limit, this.post.post_comment.next_page).then( (res:any) => {
      let r = res
      let temp_arr = res.data
      if(r.error){

      }else{
        this.post.post_comment.next_page = r.next_page
        temp_arr.forEach(element => {
          this.post.post_comment.data.push(element);
        });
      }
    }).finally(()=>{
      this.scrollRequesting = false;
      this.isLoading = false
    })

  }
  hashtag:string = '';
  checkClick(ev) {
    // console.log('this.links', this.links);
    // let text = ev.target.innerText;
    // if (text != '#' + this.hashtag) {
    //   this.link.clickedLink(text, this.content_link);
    // }
  }
  viewPhoto(post, index) {
    let data = {
      post: post,
      selectedIndex: index,
      from: 'post_photo'
      
    }
    this.modal.setModalData(data, 'viewPhotoModal', true);
    this.modal.open('viewPhotoModal');
  }
  sanitizeUrl(url){
    if(url){
      let replace_url = url.replace('</span>','');
      let final_url = "<iframe width='471px' height='272px' src='"+replace_url+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
      this.html=this.link.sanitizeLink(final_url);
    }
  }
  viewLink(link){
    window.open(link, "_blank");
  }
  post_modal_detail:any={
    title:"Delete Post",
    content:"Please select a problem to continue You can delete the post after selecting a problem.",
    btn_cancel:"Cancel",
    btn_save:"Delete cost",
  }
  comment_modal_detail:any={
    title:"Delete Comment",
    content:"Please select a problem to continue. You can delete the comment after selecting a problem.",
    btn_cancel:"Cancel",
    btn_save:"Delete comment",
  }
  deletePost(){
    let details = {
      edit_details: this.post_modal_detail,
      purpose: 'admin_delete_post',
      data: this.post,
      report_type: 1,
      delete_type: 1,
    }
    this.modalService.setModalData(details,'reportsModal');
    this.modalService.open('reportsModal');
  }
  deleteComment(comment){
    let details = {
      edit_details: this.comment_modal_detail,
      purpose: 'admin_delete_comment',
      data: comment,
      post: this.post,
      report_type: 2,
      delete_type: 1,
    }
    this.modalService.setModalData(details,'reportsModal');
    this.modalService.open('reportsModal');
  }

}