import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { datatable } from '../../../datatables/report-detail-table';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { RequestsService } from 'src/app/services/http/requests.service';
import { Url } from '../../../../../environments/Urls';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { ReportedService } from 'src/app/services/reported/reported.service';
import { LinksService } from 'src/app/services/links/links.service';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit, AfterViewInit, OnChanges {
  ths: any = datatable;
  isLoading: any = false;
  report_id: any;
  report_detail: any;
  limit: any = 10;
  user_type: any = 2;
  search: any;
  report_type: any;
  report_type_str: any;
  items: any;
  report_detail_list: any;
  @ViewChild('postcontainer') private post_container: ElementRef;
  hashtag: string;
  content_link: any;
  html:any;
  type_str:any;
  type: any;
  api_type: any;
  api_report_id: any;

  lazyImage = 'assets/images/loader.gif'
  lazyImage_url = `${this.lazyImage}`;

  routeSub : any;
  blog_url: any;
  metadata: any;
  meta_loading: boolean = false;
  meta: boolean;
  report_comment_data: any;
  main_is_loading: boolean = false;
  

  constructor(
    private modalService: NgxSmartModalService,
    private active_route: ActivatedRoute,
    private request: RequestsService,
    private report: ReportedService,
    private link : LinksService,
    private route: Router
  ) { 
    this.report.getType().subscribe((res)=>{
      this.type = res;
    })
    this.initializeSub();
  }

  ngOnInit(): void {
    
    this.routeSub = this.route.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.report_id = this.active_route.snapshot.paramMap.get('id');
        this.report_type = this.route.url == '/admin/violation-reports/violation-detail-post/'+this.report_id ? 1 : 2;
        this.type_str = this.report_type
        this.getReport();
        this.modalService.open('loaderModal');
      } setTimeout(()=>{
        this.modalService.close('loaderModal');
      }, 1000);
    })

    this.report_id = this.active_route.snapshot.paramMap.get('id');
    this.report_type = this.route.url == '/admin/violation-reports/violation-detail-post/'+this.report_id ? 1 : 2;
    this.type_str = this.report_type
    this.getReport();
  }
  ngOnChanges(){
    console.log('pumasok sa onchanges');
    this.initializeSub()
  }
  ngOnDestroy(){
    this.routeSub ? this.routeSub.unsubscribe() : null;
    this.subscriptionToCloseDelete ? this.subscriptionToCloseDelete.unsubscribe() : null;
    this.subscriptionToCloseRemain ? this.subscriptionToCloseRemain.unsubscribe() : null;
  }
  subscriptionToCloseDelete:any;
  subscriptionToCloseRemain:any;
  initializeSub(){
    console.log('pumasok sa inisub');
    this.subscriptionToCloseDelete = this.modalService.getModal('reportsModal').onAnyCloseEvent.subscribe(data => {
      this.getReport();
      console.log('nag sub');
    });
    this.subscriptionToCloseRemain = this.modalService.getModal('confirmationModal').onAnyCloseEvent.subscribe(data => {
      this.getReport();
      console.log('nag sub');
    });
  }

  getReportComment(id){
    this.report.getReportedComment(id).then((res: any) => {
      if(res.error == 0){
        this.report_comment_data = res.data;
      }
    })
  }

  scrollRequesting: any = false;
  isLoading_comment: boolean = false;
  onScroll(ev: any){
    let scrollHeight = ev.target.scrollHeight;
    let combined = ev.target.scrollTop + ev.target.clientHeight;
    if (!this.scrollRequesting && scrollHeight == combined && this.report_detail.post_comment.next_page){
      // console.log('scrool: ', this.report_detail.post_comment)
      this.getCommentInf();
      this.scrollRequesting = true;
    }
  }
  getCommentInf(){
    this.report.getInfComment(this.report_id,this.api_type,this.limit,this.report_detail.post_comment.next_page).then((res:any) => {
      let r = res.data
        // console.log('pumasok 1: ',this.report_detail.post_comment.data.post_comment)
        r.post_comment.data.post_comment.forEach(element => {
          this.report_detail.post_comment.data.post_comment.push(element)
        });
      this.report_detail.post_comment.next_page = r.post_comment.next_page;
    }).finally(()=>{
      // console.log('nag false')
      this.scrollRequesting = false;
    })
  }

  ngAfterViewInit(){
    this.addHighLights();
  }

  render(data) {
    return data;
  }

  getReport() {
    this.main_is_loading = true
    this.report.viewViolation(this.report_id).then((res: any) => {
      this.report_detail = res.data;
      let list = res
      if(!res.error){
        this.report_detail = res.data;
        let list = res
        this.api_type = this.report_detail.report_type;
        this.api_report_id = this.report_detail.reported_id;
        this.items = list;
        this.getReportComment(this.report_detail.original_id);
        this.getReportDetailListing();
        this.report_detail.post_content = this.report_detail.post_content ? this.link.getlink(this.report_detail.post_content) : null;
        if(this.report_detail.post_content){
          this.content_link = this.report_detail.post_content ? this.link.checkLinks(this.report_detail.post_content) : null;
          this.content_link = this.sanitizeUrl(this.content_link.url);
          let url = this.report_detail.post_content ? this.link.remove_span(this.report_detail.post_content) : null;
          this.blog_url = this.link.checkLinks(url)
          if(this.blog_url){
            this.meta_loading = true
            this.link.getMetadata(this.blog_url.url).then((res:any) => {
              this.metadata = res;
            }).finally(()=>{
              this.meta_loading = false
              this.main_is_loading = false
            })
          }
        }
      }
    })
  }
  
  getReportDetailListing() {
    this.isLoading = true;
    this.report.getViolationDetailList(this.api_report_id, this.api_type, this.limit, this.pagination.selected_page).then((res: any) => {
      let r = res
      if(r.error == 0){
        this.report_detail_list = res;
        // console.log('detail list: ', this.report_detail_list)
      }else{
       
      }
    }).finally(()=>{
      this.isLoading = false;
    })

  }
  //pagination
  pagination = {
    no_list: 10,
    selected_page: 1
  }
  nextPage(){
    if(this.pagination.selected_page < this.items.total_page){
      this.pagination.selected_page++;
      this.getReport();
    }
  }
  prevPage(){
    if(this.pagination.selected_page > 1){
      this.pagination.selected_page--;
      this.getReport();
    }
  }
  setPage(num){
      this.pagination.selected_page = num;
      this.getReport();
  }
  //pagination
  allowNewLine(text) {
    if(text){
      return text.replace(/\r\n|\r|\n/g, "<br />");
    }
  }
  addHighLights(){
    // let children: HTMLCollection = this.post_container.nativeElement.children;
    // console.log('child: ', children)
    // for (let i = 0; i < children.length; i++) {
    //   children.item(i).innerHTML == '#' + this.hashtag ? children.item(i).classList.add('fw-900') : null;
    // }
  }
  
  post_modal_detail:any={
    title:"Remain published",
    content:"Are you sure you want to retain this post? <br/> This post will still be seen by other users.",
    btn_cancel:"Cancel",
    btn_save:"Remain publish",
  }
  comment_modal_detail:any={
    title:"Remain published",
    content:"Are you sure you want to retain this comment? <br/> This post will still be seen by other users.",
    btn_cancel:"Cancel",
    btn_save:"Remain publish",
  }
  remainPublish(){
    let details = {
      // user: this.user,
      edit_details:this.api_type == 1 ? this.post_modal_detail : this.comment_modal_detail,
      purpose: 'remain_publish',
      data: this.report_detail,
      report_type: this.api_type,
    }
    // console.log('details: ', details)
    this.modalService.setModalData(details,'confirmationModal');
    this.modalService.open('confirmationModal');
  }

  deleteReport(){
    let details = {
      edit_details:this.api_type == 1 ? this.post_modal_detail : this.comment_modal_detail,
      purpose: 'submitReport',
      data: this.report_detail,
      report_type: this.api_type,
      delete_type: 2
    }
    // console.log('details: ', details)
    this.modalService.setModalData(details,'reportsModal');
    this.modalService.open('reportsModal');
  }

  viewPhoto(post, index) {
    let data = {
      post: post,
      selectedIndex: index,
      from: 'post_photo'
      
    }
    this.modalService.setModalData(data, 'viewPhotoModal', true);
    this.modalService.open('viewPhotoModal');
  }
  sanitizeUrl(url){
    if(url){
      let replace_url = url.replace('</span>','');
      let final_url = "<iframe width='471px' height='272px' src='"+replace_url+"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
      this.html=this.link.sanitizeLink(final_url);
      // console.log('url: ', url)
    }
  }
  checkClick(ev){
    let text = ev.target.innerText;
    if(text != '#' + this.hashtag){
      this.link.clickedLink(text, this.content_link);
    }
  }
  viewPoto(photo){
    this.modalService.setModalData(photo,'viewPhotoModal');
    this.modalService.open('viewPhotoModal')
  }
  viewLink(link){
    window.open(link, "_blank");
  }
}
