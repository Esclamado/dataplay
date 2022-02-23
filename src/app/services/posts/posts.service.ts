import { Injectable } from '@angular/core';
import { RequestsService } from '../http/requests.service';
import { Url } from 'src/environments/Urls'
import { ToastsService } from '../toasts/toasts.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LinksService } from '../links/links.service';
import { PhotosService } from '../photos/photos.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  new_comment: any;

  constructor(
    private request: RequestsService,
    private toastr: ToastsService,
    private modalService: NgxSmartModalService,
    private links: LinksService,
    private photo: PhotosService,
    private router: Router,
    private location: Location) { }




  // post_listings:any;
  // temporary_arry

  // getPostListing(id,limit = null, page = null) {
  //   let params = '?athlete_id=' + id;
  //   if (limit) params += '&limit=' + limit;
  //   if (page) params += '&page=' + page;

  //   this.request.get(Url.webapi_post_listing + params).then(res => {
  //     let r: any = res;
  //     if (!page) {
  //       this.post_listings = r;
  //       this.post_listings['datas'].forEach((value, index) => {
  //         this.getLinks(value.post_content, index);
  //       });
  //     } else {
  //       this.temporary_arry = r.datas;
  //       r.datas.forEach((value, index) => {
  //         this.getLinks(value.post_content, index, true);
  //       });
  //       this.post_listings.next_page = r.next_page;
  //     }

  //   }).finally(() => {
  //     this.showSkeleton = false;
  //     if (page) {
  //       this.temporary_arry = [];
  //       this.scrollRequesting = false;
  //     }
  //   })
  // }
  postSubject = new Subject;
  posts = this.postSubject.asObservable();

  updatePostList(value = null) {
    this.postSubject.next(value);
  }

  allowNewLine(text) {
    return text.replace(/\r\n|\r|\n/g, "<br />");
  }
  
  temporary_arry = [];

  post_list: any;

  getLinks(contents, index, new_request = null, edit = null) {

    let post = new_request ? this.temporary_arry[index] : this.post_list.datas[index];
    // new_request ? //console.log('post getLinks',post) : null;

    post.link = this.links.checkLinks(contents);
    if (post.link.type == 'blog' && (!('metadata' in post) || edit)) {
      this.links.getMetadata(post.link.url).then(res => {
        post.metadata = res;
        console.log('post.metadata: ', post.metadata);
      }, err => {
        //console.log('getMetaByApi error', err);
      })
    }
    // //console.log('getLink:', post);
    // //console.log('vimeo links', post.link);
    // //console.log('post_listings ' + index, this.links.checkLinks(contents));
    var urlRegex = /(^|\s)(https?[^\s]+)/g;
    let hashtags = /(^|\B)#(\w+)(?!\S)/g;


    // post.post_content = contents.replace(urlRegex, function(url) {
    //   return '<a class="text-blue-600 focus:underline truncate-anchors" href="' + url + '" target = "_blank">' + url + '</a>';    
    // }).replace("http://", "https://")
    //   .replace(
    //     hashtags,
    //     hash => `<a class="text-blue-600 focus:underline cursor-pointer hashtags">${hash}</a>`
    //   );

    // var urlRegex = /(\s|^)((https?|ftp):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\w-\/\?\=\#\.])*/g;
    // let hashtags = /(^|\B)#(\w+)(?!\S)/g;
    post.post_content = contents.replace(hashtags, function (hash) {
      return `<span class="text-blue-600 hover:text-blue-500 focus:underline cursor-pointer hashtags redirect">${hash}</span>`;
    }).replace("http://", "https://")
      .replace(
        urlRegex,
        url => '<span class="text-blue-600 hover:text-blue-500 focus:underline cursor-pointer truncate redirect" >' + url + '</span>'
      );

    // console.log('post.post_content', post.post_content);
    new_request ? this.post_list.datas.push(post) : '';
    // this.updatePostList(this.post_list);
  }


  getPost(athlete_id, limit = null, page = null) {
    let params = '?athlete_id=' + athlete_id;
    if (limit) params += '&limit=' + limit;
    if (page) params += '&page=' + page;
    params += '&is_admin';

    return new Promise((resolve, rejected) => {
      this.request.get(Url.webapi_post_listing + params).then(res => {
        let r: any = res;
        resolve(true);
        if (!page) {
          this.post_list = r;
          this.post_list['datas'].forEach(async (value, index) => {
            await this.getLinks(value.post_content, index);
          });
        } else {
          this.temporary_arry = r.datas;
          r.datas.forEach(async (value, index) => {
            await this.getLinks(value.post_content, index, true);
          });
          this.post_list.next_page = r.next_page;
        }
        if(limit && page){
        }

      }).finally(() => {
        this.updatePostList(this.post_list);
        if (page) {
          this.temporary_arry = [];
        }
      })
    })
  }
  getPostById(id) {
    /* this.requesting = true; */
    let url = Url.webapi_post_postview + '?';
    url += '&post_id=' + id;
    this.request.get(url).then(lists => {
      let l: any = lists;
      if (l.error) {
        this.toastr.showError('Error', l.message);
        this.location.back();
        return false;
      }
      let array = [
        l.data
      ]
      l.datas = array;
      this.post_list = l;
      this.updatePostList(l);
      // this.item = l.data;
      /* this.requesting = false; */
    })
  }

  // getHashtags(limit = 10) {
  //   let url = Url.webapi_hashtag_listing + '?';
  //   url += '&limit=' + limit;
  //   return new Promise((resolve, rejected) => {
  //     this.request.get(url).then(res => {
  //       let list: any = res;
  //       if (!list.error) resolve(list.data);
  //       else rejected(list);
  //     })
  //   })
  // }

  clickedLink(text, hashtag_event = null) {
    let hashtags = /^#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})$/g;
    var urlRegex = /(\s|^)https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\w-\/\?\=\#\.])*/g;
    if (text && text.match(hashtags)) {
      if (hashtag_event) {
        // this.getPostByHashtags(text);
        hashtag_event.emit(text.replace('#', ''))
      }
      this.router.navigate(['/hashtags/' + text.replace('#', '')]);
    } else if (text && text.match(urlRegex)) {
      window.open(text, '_blank');
    }
  }

  // getPostByHashtags(hashtag = null, limit = 10, page = null) {
  //   /* this.requesting = true; */
  //   let url = Url.webapi_hashtag_search + '?';
  //   url += '&limit=' + limit;
  //   if (hashtag) {
  //     url += '&keyword=' + hashtag;
  //   }
  //   return new Promise((resolve, reject) => {
  //     this.request.get(url).then(res => {
  //       let r: any = res;
  //       if (!page) {
  //         this.post_list = r;
  //         this.post_list['datas'].forEach(async (value, index) => {
  //           await this.getLinks(value.post_content, index);
  //         });
  //       } else {
  //         this.temporary_arry = r.datas;
  //         r.datas.forEach((value, index) => {
  //           this.getLinks(value.post_content, true);
  //         });
  //         this.post_list.next_page = r.next_page;
  //       }
  //       resolve(true);

  //     }).finally(() => {
  //       this.updatePostList(this.post_list);
  //       if (page) {
  //         this.temporary_arry = [];
  //       }
  //     })
  //   })
  // }

  deletePost(p, reason) {
    let formData = new FormData();
    formData.append('reported_id', p.id);
    formData.append('admin_reason', reason);
    formData.append('report_type', '1');
    formData.append('delete_type', '1');
    return new Promise((resolve, reject) => {
      this.request.post(Url.webapi_report_delete, formData).then(res => {
        let r: any = res;
        let post_index = this.post_list.datas.findIndex(item => item.id == p.id);
        if (r.error) {
          this.toastr.showError('Error.', 'Cannot delete post.');
          reject(r)
        } else {
          this.getcommentList(p.id).then((res: any) => {
            this.new_comment = res.data
            if(res.error){

            }else{
              this.post_list.datas[post_index].post_status = 2;
              this.post_list.datas[post_index].post_comment.data = this.new_comment
              this.updatePostList(this.post_list);
            }
          })
          resolve(r);

          this.toastr.showSuccess('Success.', 'Post deleted.');
          this.modalService.close("confirmationModal")
        }
      }, err => {
        reject(err)
      })
    })
  }

  deleteComment(comment, reason, post) {
    let formData = new FormData();
    formData.append('reported_id', comment.id);
    formData.append('admin_reason', reason);
    formData.append('report_type', '2');
    formData.append('delete_type', '1');
    let post_index = this.post_list.datas.findIndex(item => item.id == post.id);
    let comment_index = this.post_list.datas[post_index].post_comment.data.findIndex(c_item => c_item.id == comment.id)
    return new Promise((resolve, reject) => {
      this.request.post(Url.webapi_report_delete, formData).then(res => {
        let r: any = res;
        if (r.error) {
          this.toastr.showError('Error!', 'Something went wrong, try again later.');
          reject(r);
        } else {
          // post.post_comment = post.post_comment.filter(item => { return item.id != comment_id });
          this.post_list.datas[post_index].post_comment.data[comment_index] = comment;
          this.post_list.datas[post_index].post_comment.data[comment_index].comment_status = 2;
          this.toastr.showSuccess('Success.', 'Comment deleted.');
          this.updatePostList(this.post_list);
          resolve(r)
        }

      })
    })
  }

  reportPost(item, type, cid = null) {
    let items = {
      item: item,
      type: type,
      commentID: cid
    }
    //console.log('this.items', items);
    this.modalService.setModalData(items, 'reportsModal');
    this.modalService.open('reportsModal');
  }

  // savePost(content = null, images = null, user_id, post_id = null) {
  //   let formData = new FormData();
  //   formData.append('user_id', user_id);
  //   formData.append('post_content', content);
  //   post_id ? formData.append('post_id', post_id) : null;

  //   images.forEach((img, index) => {
  //     formData.append('post_picture_' + [index], this.photo.dataURItoBlob(img.url), 'post_picture_' + [index] + '.jpg');
  //   });

  //   return new Promise((resolve, reject) => {
  //     this.request.post(Url.webapi_post_save, formData).then(res => {
  //       let r: any = res;
  //       if (r.error) {
  //         this.toastr.showError('Error!', 'Something went wrong try again later.');
  //         reject(r);
  //       } else {
  //         resolve(r)
  //       }

  //     })
  //   })


  // }

  // saveComment(post_id = null, comment_id = null, comment = null, image = null, image_deleted = null) {
  //   let formData = new FormData()
  //   post_id ? formData.append('post_id', post_id) : null;
  //   comment_id ? formData.append('comment_id', comment_id) : null;
  //   comment ? formData.append('comment', comment) : null;
  //   image ? formData.append('image', image, 'comment_image.jpg') : null;
  //   image_deleted ? formData.append('image_deleted', 'true') : null;

  //   return new Promise((resolve, reject) => {
  //     this.request.post(Url.webapi_comment_save, formData).then(res => {
  //       comment_id && post_id ? this.updateComment(post_id, comment_id, res) : null;
  //       resolve(res)
  //     }, err => {
  //       reject(err)
  //     }).catch(res => {
  //       reject(res)
  //     })
  //   });
  // }

  // updateComment(p_id, c_id, res) {

  //   let post_index = this.post_list.datas.findIndex(item => item.id == p_id);
  //   let comment_index = this.post_list.datas[post_index].post_comment.findIndex(item => item.id == c_id);

  //   this.post_list.datas[post_index].post_comment[comment_index].comment_image_path = res.data.image_path;
  //   this.post_list.datas[post_index].post_comment[comment_index].comment = res.data.comment;
  //   this.updatePostList(this.post_list);
  // }
  accessible = true;
  clickedSpan(ev) {
    let hashtags = /^#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})$/g;
    var urlRegex = /(\s|^)((https?|ftp):\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\w-\/\?\=\#\.])*/g;
    let string: string = ev.target.innerText;
    if (string && string.match(hashtags)) {
      // this.router.navigate(['/hashtags/' + string.replace('#', '')]);
    } else if (string && string.match(urlRegex)) {
      window.open(string, '_blank');
    }
  }
  getcommentScroll(id, limit, page){
    let params = '?post_id=' + id
    limit ? params += '&comment_limit=' + limit : null
    limit ? params += '&comment_page=' + page : null
    return new Promise((resolve,reject) => {
      this.request.get(Url.webapi_comment_listing+params).then(res => {
        let r = res;
        if(r.error){
          reject(r);
        }else{
          resolve(r);
          // console.log('service res: ', r)
        }
      })
    })
  }
  getcommentList(id){
    let params = '?post_id=' + id + '&is_admin'
    return new Promise((resolve,reject) => {
      this.request.get(Url.webapi_comment_listing+params).then(res => {
        let r = res;
        if(r.error){
          reject(r);
        }else{
          resolve(r);
          // console.log('service res: ', r)
        }
      })
    })
  }


}
