if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsItem_Params {
    newsData?: NewsData;
}
import { NewsData } from "@bundle:com.example.newsrelease/entry/ets/viewmodel/NewsData";
import type { NewsFile } from "@bundle:com.example.newsrelease/entry/ets/viewmodel/NewsData";
import Constants from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
export default class NewsItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.newsData = new NewsData();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsItem_Params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
    }
    updateStateVars(params: NewsItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private newsData: NewsData;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/NewsItem.ets(27:5)", "entry");
            Column.padding({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/NewsItem.ets(28:7)", "entry");
            Row.alignItems(VerticalAlign.Center);
            Row.width(Constants.FULL_PERCENT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777282, "type": 20000, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/NewsItem.ets(29:9)", "entry");
            Image.height({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.aspectRatio(Constants.TYPE_ASPECT_RATIO);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsData?.title);
            Text.debugLine("entry/src/main/ets/view/NewsItem.ets(32:9)", "entry");
            Text.fontSize({ "id": 16777277, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.fontColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.layoutWeight(1);
            Text.maxLines(1);
            Text.lineHeight({ "id": 16777278, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.fontFamily({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontWeight(Constants.TITLE_FONT_WEIGHT);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsData?.content);
            Text.debugLine("entry/src/main/ets/view/NewsItem.ets(46:7)", "entry");
            Text.fontSize({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.fontFamily({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.opacity(Constants.DESC_OPACITY);
            Text.fontColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.lineHeight({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.width(Constants.FULL_PERCENT);
            Text.maxLines(Constants.CONTENT_MAX_LINE);
            Text.fontWeight(Constants.DESC_FONT_WEIGHT);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: Constants.ITEM_IMG_SPACE });
            Row.debugLine("entry/src/main/ets/view/NewsItem.ets(57:7)", "entry");
            Row.clip(true);
            Row.width(Constants.FULL_PERCENT);
            Row.height({ "id": 16777268, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Row.margin({ top: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const itemImg = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(Constants.SERVER + itemImg?.url);
                    Image.debugLine("entry/src/main/ets/view/NewsItem.ets(59:11)", "entry");
                    Image.height(Constants.FULL_PERCENT);
                    Image.aspectRatio(1);
                    Image.objectFit(ImageFit.Cover);
                    Image.borderRadius({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, (this.newsData.imagesUrl), forEachItemGenFunction, (itemImg: NewsFile) => JSON.stringify(itemImg), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsData?.source);
            Text.debugLine("entry/src/main/ets/view/NewsItem.ets(71:7)", "entry");
            Text.fontSize({ "id": 16777276, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.fontColor({ "id": 16777295, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.width(Constants.FULL_PERCENT);
            Text.margin({ top: { "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
