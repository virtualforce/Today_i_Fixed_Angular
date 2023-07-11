
## Problem
We need a file input field with functionalities of clipboard(copy/paste), Browse, Drag & Drop, screen and video capturing. 

## Environment
- IDE Version: Visual Studio Code
- Angular: 14


## How you fix it
To solve the problem, I created a function that uses Media Stream APIS and simple javascript. Also used some styling.

## Solution
```html

<div class="uploadFileContainer">
  <div class="row">
      <div class="form-group w-100">
        <div>
          <div class="dropzone" fileDragDrop (filesChangeEmiter)="fileProgress($event)">
            <div class="text-wrapper" (paste)="onPaste($event)">
              <label for="{{_name}}">
                <span class="textLink">Browse</span> 
                <span class="text-drag" (click)="$event.preventDefault()"> Drag and Drop here  <span *ngIf="showImageIcon" >or paste screenshot here! </span></span>
              </label>
                <input
                type="file"
                class="drag-input"
                id="{{_name}}"
                [(ngModel)]="fileValue"
                [multiple] = "_isMultiple"
                name="image"
                (change)="fileProgress($event)"
              />
            </div>
          </div>
          <p class="mt-3 text-right capture-container">
            <button *ngIf="showVideoIcon"  (click)="startCapture()" [disabled]="recorderStarted" title="Start Video Capturing"><img src="{{getStartIcon()}}" alt="Start Video Capturing"></button>
            <button *ngIf="showVideoIcon"  (click)="stopCapture()" [disabled]="!recorderStarted" title="Stop Video Capturing"><img src="{{getStopIcon()}}" alt="Stop Video Capturing"></button>
            <button *ngIf="showImageIcon"  (click)="imagePreview()" [disabled]="recorderStarted" title="Capture Screenshot"><img src="./assets/images/capture.png" alt="Capture Screenshot"></button>
          </p>
        </div>
      </div>
      <div *ngIf="fileUploadProgress">
        Upload progress: {{ fileUploadProgress }}
      </div>

      <div class="image-preview" *ngIf="previewUrl && _isPreviewShow" >
        <div *ngFor='let url of previewUrl;  let i = index' style="display: inline-block" class="imageHolder">

          <a href="javascript:void(0);" (click)="remove(i)" class="up-img-cross">
            <i class="fa-solid fa-times" aria-hidden="true"></i>
          </a>
          <img class="up-img" *ngIf="url.type==='video'" alt="" src="assets/images/videoIcon.png">
          <img *ngIf="url.type==='image'" alt="" [src]="url.path" height="50" class="up-img">
          <img class="abc" *ngIf="url.type==='csv'" alt="" src="assets/images/csv-file.png">
          <img class="abc" *ngIf="url.type==='xls'" alt="" src="assets/images/excel-file.png">
          <img class="abc" *ngIf="url.type==='word'" alt="" src="assets/images/word-file.png">
          <img class="abc" *ngIf="url.type==='pdf'" alt="" src="assets/images/pdf.png">
          <img class="abc" *ngIf="url.type==='ppt'" alt="" src="assets/images/ppt.png">
          <img class="abc" *ngIf="url.type==='json'" alt="" src="assets/images/jar.png">
          <span style="padding-left: 10px;" *ngIf="_isShowFileName">{{orignalFileName}}</span>
          <span
            *ngIf="url.type!=='image'
            && url.type!=='csv'
            && url.type!=='xls'
            && url.type!=='word'
            && url.type!=='pdf'
            && url.type!=='ppt'
            && url.type!=='video'
            && url.type!=='json'
            && url.type!=='gherkin'
            && type !=='gherkin'"
          > {{url.type}} </span>
        </div>
      </div>

      <div class="mb-3" *ngIf="uploadedFilePath">
        {{uploadedFilePath}}
      </div>
  </div>
</div>
<video  #video id="video" *ngIf="showImageIcon" autoPlay class="d-none"></video>

<app-popup-modal identifier="{{getFileNamePopupIdentifier()}}">
  <div class="add_user_model add_user_model_two">
    <div class="container-fluid">
      <div class="row close_tab">
        <div class="col-sm-12">
          <h6>Attachment Name</h6>
        </div>
      </div>
      <div class="popup_margin_wrapper">
        <form name="form" (ngSubmit)="f.form.valid" #f="ngForm" novalidate>
        <div class="row">
          <div class="col-md-12">
              <div class="form-group">
                <label for="filename" class="control-label">File Name</label>
                <input
                id="filename"
                type="text"
                class="form-control"
                name="filename"
                [(ngModel)]="fileAttachmentModel.filename"
                #filename="ngModel"
                [ngClass]="{ 'is-invalid': f.submitted && filename.invalid }"
                placeholder="Name"
                required />
                <div *ngIf="f.submitted && filename.invalid" class="invalid-feedback">
                  <div *ngIf="filename.errors!['required']">Name is required</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-row">
                <div class="form-buttons clearfix">
                  <button class="file-submit-btn" (click)="onCloseGetFileNamePopup(f)">Attach</button>
                  <button class="file-cancel-btn" (click)="onCloseGetFileNamePopup(f,true)">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</app-popup-modal>

```
```Styling

.imageHolder{
  position: relative;
  height: 50px;
  width: 50px;
  border: 2px solid #ced4da;
  object-fit: cover;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 5px;
  text-align: center;
  color: #3577e4;
  vertical-align: top;
  background: #eee;
  
  img{
      border: none;
      height: 100%;
      width: 100%;
  }
  span{
      padding-top: 14px;
      display: inline-block;
      font-size: 12px;
  }
}


.up-img{
  border: none;
  height: 50px;
  width: 50px;
  object-fit: cover;
 /* border: 2px solid #ced4da;*/
  /*margin-right: 10px;*/
 /* margin-bottom: 5px;*/
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
}

.up-img-cross{
  position: absolute;
  background: black;
  color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  text-align: center;
  top: 77px;
  line-height: 1;

}

.lab-height{
  min-height: 40px;
  border-radius: 0;
  font-size: 14px;
  line-height: 2;
  &::after{
      min-height: 38px;
      line-height: 2;
  }
}


.text-wrapper {
    display: table-cell;
    vertical-align: middle;
}
  
.dropzone {
    height: 40px;
    display: table;
    width: 100%;
    color: #495057;
    font-size:14px;
    background-color: #fff;
    border: dotted 1px #ced4da;
    .drag-input{
        display:none;
    }
}

.textLink{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: block;
    height: calc(1.5em + 1.2rem);
    padding: 0.75rem;
    color: #495057;
    background-color: #e9ecef;
    border-left: inherit;
    border: 1px solid #ced4da;
}

.text-drag{
    padding-left: 15px;
    padding-top: 2px;
}

:host .uploadFileContainer{
    position: relative;
}

.capture-container{
    button{
        background: none;
        border: none;
        img{
            width: 30px;
            height: 30px;
        }
    }
}

.file-submit-btn{
    font-size: 16px;
    background: #3577e4;
    color: white;
    padding: 12px 27px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    margin: 10px;
    margin-bottom: 0;
    min-width: 150px;
}
.file-cancel-btn{
    font-size: 16px;
    padding: 12px 27px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    margin-bottom: 0;
    min-width: 150px;
    background: #ffffff;
    border: 1px solid #d7d7d7;
    &:hover{
        background: #3577e4;
        color: white;
    }
}

```
```typescript

  @Input() _from: Form | any;
  @Input() _name: string | any;
  @Input() _model: any = {};
  @Input() _formData: any;
  @Input() _allowedType: any = null;
  @Input() _isPreviewShow: boolean = true;
  @Input() _isMultiple: boolean = true;
  @Input() _isShowFileName: boolean = false;
  //weither to get file name from user or not
  @Input() _showFileNameModal:boolean = true;
  //to rerender the preview list if changed outside of component
  @Input() resetPreviewList: Observable<void> = null;


  mediaRecorder:any;
  showImageIcon:boolean = false;
  showVideoIcon:boolean = false;
  FILE_NAME_POPUP_IDENTIFIER = "getFileNamePopup";
  fileAttachmentModel:any = {};
  @ViewChild('video', {static: false}) videoElem: ElementRef | any;

  public previewUrl: any = [];
  public fileUploadProgress: string | any = null;
  public uploadedFilePath: string | any = null;
  public FILESIZE = 104857600;
  public file: any;
  public files: any = [];
  public type: any = '';
  public orignalFileName: any;
  public subTCFiles: any = {};
  public fileValue = null;
  private resetPreviewSubscription: Subscription;
  public recorderStarted: boolean = false;

  constructor(
    //service using for showing messages
    private toastr: ToastrNotificationService,
    //service using having contants
    public labelService: LabelService,
    private popupModalService: PopupModalService
  ) { }

  ngOnInit() {
    this.files = [];
    this.fileAttachmentModel = {};
    this.setFileNamePopupIdentifier();
    if (this.resetPreviewList !== null) {
      this.resetPreviewSubscription = this.resetPreviewList.subscribe(() =>
      this.previewUrl = []
     );
    }
    this.showHideCaptureIcons();
  }

  ngOnDestroy() {
    if (this.resetPreviewList !== null) {
      this.resetPreviewSubscription.unsubscribe();
    }
  }

  onPaste(event: any) {
    event.target.files = event.clipboardData.files;
    this.fileProgress(event);
  }

  async fileProgress(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.file = event.target.files[i];
        if (this.canUpload()) {
          this.orignalFileName = this.file.name;
          await this.readFileContent(this.file, this._isMultiple, this.previewUrl, this.files, this.getFileType, this.getExtension);
        }
      }
      this.render();
      this.fileValue = null;
    }
  }

  readFileContent = (file,_isMultiple,previewUrl,files,getFileType,getExtension) => {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.onload = ( e: any  ) => {
          if (_isMultiple) {
            previewUrl.push({type: getFileType(getExtension(e.target.result)), path: e.target.result});
            files.push(<File> file);
          } else {
            previewUrl[0] ={type: getFileType(getExtension(e.target.result)), path: e.target.result};
            files[0] = <File> file;
          }
          resolve("");
        }
        reader.onerror=(e:any) =>{
          reject(e);
        }
        reader.readAsDataURL(file);
      });

  }

  render = () => {
    this._formData.delete(`${this._name}`);
    this.files.forEach((item: any) => {
      this._formData.append(`${this._name}`, item);
    });
  }


  remove = (index: any) => {
    this.files.splice(index, 1);
    this.previewUrl.splice(index, 1);
    this._formData.delete(`${this._name}`);
    this.render();
    this.fileValue = null;
  }

  checkType = (type: any = null) => {
    if (this._allowedType === this.labelService.labels.allowedFileTypes.all) {
      switch ((type) ? type : this.file.type) {
        case 'image/png':
        case 'image/gif':
        case 'image/jpeg':
        case 'image/pjpeg':
          this.type = 'image';
          return true;
          break;
        case 'application/pdf':
          this.type = 'pdf';
          return true;
          break;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          this.type = 'word'
          return true;
          break;
        case 'application/vnd.ms-excel':
        case 'text/csv':
          this.type = 'csv';
          return true;
          break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          this.type = 'xls';
          return true;
          break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'application/vnd.ms-powerpoint':
          this.type = 'ppt';
          return true;
          break;
        case 'video/mp4':
        case 'video/webm':
          this.type = 'video';
          return true;
          break;
        default:
          this.toastr.showInfo('Unsupported file type!');
          return false;
      }
    } else if (this._allowedType === this.labelService.labels.allowedFileTypes.withoutVideo) {
      switch ((type) ? type : this.file.type) {
        case 'image/png':
        case 'image/gif':
        case 'image/jpeg':
        case 'image/pjpeg':
          this.type = 'image';
          return true;
          break;
        case 'application/pdf':
          this.type = 'pdf';
          return true;
          break;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          this.type = 'word'
          return true;
          break;
        case 'application/vnd.ms-excel':
        case 'text/csv':
          this.type = 'csv';
          return true;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          this.type = 'xls';
          return true;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'application/vnd.ms-powerpoint':
          this.type = 'ppt';
          return true;
        default:
          this.toastr.showInfo('Unsupported file type!');
          return false;
      }
    } else if (this._allowedType === this.labelService.labels.allowedFileTypes.excelAll) {
      switch ((type) ? type : this.file.type) {
        case 'application/vnd.ms-excel':
        case 'text/csv':
          this.type = 'csv';
          return true;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          this.type = 'xls';
          return true;
        default:
          this.toastr.showInfo('Unsupported file type!');
          return false;
      }
    } else {

      type = (type) ? type : this.file.type;
      
      if (type === '') {
        let splitedStr = this.file.name.split('.');
        splitedStr = splitedStr[splitedStr.length - 1];
        if (splitedStr === 'csv') {
          this.type = 'csv';
          return true;
        } else if (splitedStr === 'flv') {
          this.type = 'flv';
          return true;
        } else if (splitedStr === 'feature') {
          this.type = 'gherkin';
          return true;
        } 
        this.toastr.showInfo('Unsupported file type!');
        return false;
      } else {
        if ((type === 'image/png' || type === 'image/gif' || type === 'image/jpeg' || type === 'image/pjpeg')
          && this._allowedType === this.labelService.labels.allowedFileTypes.image) {
          this.type = 'image';
          return true;
        } else if (type === 'application/pdf' && this._allowedType === this.labelService.labels.allowedFileTypes.pdf) {
          this.type = 'pdf';
          return true;
        } else if ((type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && this._allowedType === this.labelService.labels.allowedFileTypes.word) {
          this.type = 'word';
          return true;
        } else if ((type === 'application/vnd.ms-excel' || type === 'text/csv') && (this._allowedType === this.labelService.labels.allowedFileTypes.csv)) {
          this.type = 'csv';
          return true;
        } else if ((type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') && (this._allowedType === this.labelService.labels.allowedFileTypes.excel)) {
          this.type = 'xls';
          return true;
        } else if ((type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || type === 'application/vnd.ms-powerpoint') && this._allowedType === this.labelService.labels.allowedFileTypes.ppt) {
          this.type = 'ppt';
          return true;
        } else if ((type === 'video/mp4' || type === 'video/webm' || type === '') && this._allowedType === this.labelService.labels.allowedFileTypes.video) {
          this.type = 'video';
          return true;
        } else if ((type === 'application/json') && this._allowedType === this.labelService.labels.allowedFileTypes.json) {
          this.type = 'json';
          return true;
        } else if ((type === 'text/x-gherkin') && this._allowedType === this.labelService.labels.allowedFileTypes.gherkin) {
          this.type = 'gherkin';
          return true;
        } else {
          this.toastr.showInfo('Unsupported file type!');
          return false;
        }
      }
    }
  }

  isAllowSize = () => {
    if (this.file.size > this.FILESIZE) { // Allowed file size is less than 5 MB (1048576)
      this.toastr.showInfo('<b>' + this.bytesToSize() + '</b> Too big file! <br />File is too big, it should be less than 5 MB.');
      return false;
    }
    return true;
  }

  canUpload = () => {
    return this.checkType() && this.isAllowSize();
  }

  bytesToSize = () => { //function to format bites bit.ly/19yoIPO
    let bytes = parseInt(this.file.size);
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0)
      return '0 Bytes';
    let i = Math.floor( Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  }

  getFileType = (type: any) => {
    switch (type) {
      case 'image/png':
      case 'image/gif':
      case 'image/jpeg':
      case 'image/pjpeg':
        return 'image';
      case 'application/pdf':
        return 'pdf';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'word';
      case 'application/vnd.ms-excel':
      case 'text/csv':
        return 'csv';
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'xls';
      case 'video/mp4':
      case 'video/webm':
      case 'application/octet-stream':
        return 'video';
      case 'application/json':
        return 'json';
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      case 'application/vnd.ms-powerpoint':
        return 'ppt';
      case 'text/x-gherkin':
        return 'gherkin';
      default:
        return false;
    }
  }

  getExtension = (file: any) => {
    let filePath = file;
    filePath = filePath.split(';');
    filePath = filePath[0].split('data:');
    return filePath[filePath.length-1];
  }

   //recorder functions

   async startCapture() {
  
    try {
      let displayMediaOptions = {
        audio: false, 
        video: true
      };

      // Prompt the user to share a tab, window, or screen.
      const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      this.mediaRecorder = this.createRecorder(stream);
    } catch(err) {
      console.error("Error: " + err);
    }
  }
  

  createRecorder (mediaStream) {
      // the stream data is stored in this array
    let recordedChunks = []; 

    const mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }  
    };

    mediaRecorder.onstop =  () => {
      const mimeType = 'video/webm';
      const blob = new Blob(recordedChunks, {
        type: mimeType
        });
      this.fileAttachmentModel = {
        blob,
        mediaStream,
        fileType:'webm',
        mimeType
      }
      this.onOpenGetFileNamePopup();
      recordedChunks = [];
    };
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
    this.recorderStarted = true;
    return mediaRecorder;
  }

  saveFile(){
    let downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(this.fileAttachmentModel.blob);
    this.fileAttachmentModel.filename = !this.fileAttachmentModel.filename?this.fileAttachmentModel.mimeType.split('/')[0]:this.fileAttachmentModel.filename;
    downloadLink.download = `${this.fileAttachmentModel.filename}.${this.fileAttachmentModel.fileType}`;
    this.attachfileInInput(this.fileAttachmentModel.blob,this.fileAttachmentModel.filename,this.fileAttachmentModel.fileType ,this.fileAttachmentModel.mimeType);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href); // clear from memory
    document.body.removeChild(downloadLink);
  }

  attachfileInInput(blob,filename,fileType,mimeType){
      let file = new File([blob],  `${filename}.${fileType}`,{type:mimeType}); // create new file
      // Need to use a data transfer object to get a new FileList object
      let datTran : any = new ClipboardEvent('').clipboardData || new DataTransfer(); 
      datTran.items.add(file);  // Add the file to the DT object
      datTran = {
        target :  {
          files : datTran.files,
        },
        ...datTran
      };
      this.fileProgress(datTran);
  }


  stopCapture(){
    this.mediaRecorder.stop();
  }

  imagePreview = async () => {
    try {
      this.videoElem.nativeElement.srcObject = await navigator.mediaDevices.getDisplayMedia();
      setTimeout(() => this.imageCapture(),100);
    } catch (error) {
      console.error("imagePreview error: " + error);
    }
  }
  
  imageCapture = async () => {
    try {
      let mediaStream = this.videoElem.nativeElement.srcObject as MediaStream;
      const track = mediaStream.getVideoTracks()[0];
      const mimeType = 'image/png';
      const frame = this.generateImageWithCanvas(track,mimeType);
      const base64 = await fetch(frame);
      const blob = await base64.blob();
      this.fileAttachmentModel = {
        blob,
        mediaStream,
        fileType:'png',
        mimeType
      }
      this.onOpenGetFileNamePopup();
    } catch (error) {
      console.error("imageCapture error: " + error);
    }
  }

  generateImageWithCanvas = (track: MediaStreamTrack,mimeType) => {
    const canvas = document.createElement("canvas");
    const { width, height } = track.getSettings();
    canvas.width = width || 100;
    canvas.height = height || 100;
    canvas.getContext("2d")?.drawImage(this.videoElem.nativeElement, 0, 0);
    return canvas.toDataURL(mimeType);
  }

  getStartIcon(){
    if(this.recorderStarted){
      return './assets/images/start-grey.png'
    }
    return './assets/images/start.png';
  }

  getStopIcon(){
    if(this.recorderStarted){
      return './assets/images/stop.png'
    }
    return './assets/images/stop-grey.png';
  }

  showHideCaptureIcons = () => {
    if ( this._allowedType ===  this.labelService.labels.allowedFileTypes.all ) {
      this.showImageIcon = true;
      this.showVideoIcon = true;
    } else if ( this._allowedType ===  this.labelService.labels.allowedFileTypes.withoutVideo ) {
      this.showImageIcon = true;
    }else {
      if (this._allowedType === this.labelService.labels.allowedFileTypes.image) {
        this.showImageIcon = true;
      } else if (this._allowedType === this.labelService.labels.allowedFileTypes.video) {
        this.showVideoIcon = true;  
      }
    }
  }

  onOpenGetFileNamePopup = () => {
    this.fileAttachmentModel.mediaStream.getTracks().forEach((track) => track.stop());
    this.fileAttachmentModel.filename = null;
    if (!this._showFileNameModal) {
      this.onCloseGetFileNamePopup(this.fileAttachmentModel,true);
    } else {
      this.popupModalService.open(this.getFileNamePopupIdentifier());
    }
  }
  onCloseGetFileNamePopup = (form:any,close = false) => {
    if (form.valid || close) {
      this.popupModalService.close(this.getFileNamePopupIdentifier());
      this.saveFile();
      this.recorderStarted = false;
    }
  }
  getFileNamePopupIdentifier = () => {
    return this.FILE_NAME_POPUP_IDENTIFIER;
  }

  setFileNamePopupIdentifier = () => {
    
    this.FILE_NAME_POPUP_IDENTIFIER = this.FILE_NAME_POPUP_IDENTIFIER + this._name;
  }

```

```Services Data
//using with label service
allowedFileTypes: {
      all:'all',
      withoutVideo:'withoutVideo',
      image: 'image',
      pdf: 'pdf',
      word: 'word',
      excel: 'excel',
      csv: 'csv',
      ppt: 'ppt',
      video: 'video',
      json: 'json',
      gherkin: 'gherkin',
      excelAll: 'only csv | xls | xlsx',
      message: 'only gif | jpg | png | jpeg | pdf | docx | csv | xls | ppt files are allowed. Max file size 2MB.'
    },

```
