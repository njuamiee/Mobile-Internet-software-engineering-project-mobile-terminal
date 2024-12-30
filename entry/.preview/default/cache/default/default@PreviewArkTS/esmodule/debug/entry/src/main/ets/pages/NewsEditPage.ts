if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsEditPage_Params {
    title?: string;
    content?: string;
    imageUri?: string;
    isUploading?: boolean;
}
import router from "@ohos:router";
import Constants from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
import { fileSelect, fileUpload } from "@bundle:com.example.newsrelease/entry/ets/common/utils/FileUtil";
import { NewsFile, NewsData } from "@bundle:com.example.newsrelease/entry/ets/viewmodel/NewsData";
import NewsViewModel from "@bundle:com.example.newsrelease/entry/ets/viewmodel/NewsViewModel";
import { showToast } from "@bundle:com.example.newsrelease/entry/ets/common/utils/ToastUtil";
import UploadingLayout from "@bundle:com.example.newsrelease/entry/ets/view/UploadingLayout";
import type ResponseResult from '../viewmodel/ResponseResult';
import { GlobalContext } from "@bundle:com.example.newsrelease/entry/ets/viewmodel/GlobalContext";
class NewsEditPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.title = '';
        this.content = '';
        this.__imageUri = new ObservedPropertySimplePU('', this, "imageUri");
        this.__isUploading = new ObservedPropertySimplePU(false, this, "isUploading");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsEditPage_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.imageUri !== undefined) {
            this.imageUri = params.imageUri;
        }
        if (params.isUploading !== undefined) {
            this.isUploading = params.isUploading;
        }
    }
    updateStateVars(params: NewsEditPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__imageUri.purgeDependencyOnElmtId(rmElmtId);
        this.__isUploading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__imageUri.aboutToBeDeleted();
        this.__isUploading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title: string;
    private content: string;
    private __imageUri: ObservedPropertySimplePU<string>;
    get imageUri() {
        return this.__imageUri.get();
    }
    set imageUri(newValue: string) {
        this.__imageUri.set(newValue);
    }
    private __isUploading: ObservedPropertySimplePU<boolean>;
    get isUploading() {
        return this.__isUploading.get();
    }
    set isUploading(newValue: boolean) {
        this.__isUploading.set(newValue);
    }
    selectImage() {
        fileSelect().then((uri: string) => {
            this.imageUri = uri || '';
        });
    }
    uploadNewsData() {
        if (this.title === '') {
            showToast({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            return;
        }
        if (this.content === '') {
            showToast({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            return;
        }
        if (this.imageUri === '') {
            showToast({ "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            return;
        }
        this.isUploading = true;
        let serverData = fileUpload(getContext(this), this.imageUri);
        serverData.then((data: ResponseResult) => {
            let imageUrl = data.data;
            let newsFile = new NewsFile();
            newsFile.id = 0;
            newsFile.url = imageUrl;
            newsFile.type = 0;
            newsFile.newsId = 0;
            let newsData: NewsData = new NewsData();
            newsData.title = this.title;
            newsData.content = this.content;
            newsData.imagesUrl = [newsFile];
            NewsViewModel.uploadNews(newsData).then(() => {
                this.isUploading = false;
                GlobalContext.getContext().setObject('isBackRouter', true);
                router.back();
            }).catch(() => {
                this.isUploading = false;
                showToast({ "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            });
        }).catch(() => {
            this.isUploading = false;
            showToast({ "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(84:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/NewsEditPage", isUserCreateStack: false });
            Navigation.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(85:7)", "entry");
            Navigation.height(Constants.FULL_PERCENT);
            Navigation.title(Constants.RELEASE_TITLE);
            Navigation.titleMode(NavigationTitleMode.Mini);
            Navigation.backgroundColor({ "id": 16777296, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(86:9)", "entry");
            Column.padding({
                left: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" },
                right: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" },
                bottom: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }
            });
            Column.height(Constants.FULL_PERCENT);
            Column.justifyContent(FlexAlign.SpaceBetween);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(87:11)", "entry");
            Column.borderRadius({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Column.backgroundColor(Color.White);
            Column.width(Constants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: { "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(88:13)", "entry");
            TextInput.fontSize({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            TextInput.placeholderFont({ size: { "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            TextInput.margin({ top: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            TextInput.fontColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            TextInput.backgroundColor(Color.White);
            TextInput.onChange((value: string) => {
                this.title = value;
            });
            TextInput.width(Constants.FULL_PERCENT);
            TextInput.height({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(99:13)", "entry");
            Divider.opacity({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Divider.color({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Divider.width(Constants.DIVIDER_WIDTH);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            TextArea.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(103:13)", "entry");
            TextArea.placeholderFont({ size: { "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            TextArea.fontColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            TextArea.height({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            TextArea.fontSize({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            TextArea.margin({ top: { "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            TextArea.backgroundColor(Color.White);
            TextArea.onChange((value: string) => {
                this.content = value;
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(113:13)", "entry");
            Scroll.width(Constants.FULL_PERCENT);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.align(Alignment.Start);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(114:15)", "entry");
            Row.padding({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageUri ? this.imageUri : { "id": 16777290, "type": 20000, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(115:17)", "entry");
            Image.width({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.height({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.objectFit(ImageFit.Cover);
            Image.onClick(() => this.selectImage());
        }, Image);
        Row.pop();
        Scroll.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/pages/NewsEditPage.ets(131:11)", "entry");
            Button.fontSize({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Button.height({ "id": 16777274, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Button.width({ "id": 16777275, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Button.margin({ bottom: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            Button.onClick(() => this.uploadNewsData());
        }, Button);
        Button.pop();
        Column.pop();
        Navigation.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isUploading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new UploadingLayout(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsEditPage.ets", line: 152, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "UploadingLayout" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "NewsEditPage";
    }
}
registerNamedRoute(() => new NewsEditPage(undefined, {}), "", { bundleName: "com.example.newsrelease", moduleName: "entry", pagePath: "pages/NewsEditPage", pageFullPath: "entry/src/main/ets/pages/NewsEditPage", integratedHsp: "false" });
