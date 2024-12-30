if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    tabBarArray?: NewsTypeBean[];
    currentIndex?: number;
}
import Constants from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
import NewsList from "@bundle:com.example.newsrelease/entry/ets/view/NewsList";
import router from "@ohos:router";
import NewsTypeViewModel from "@bundle:com.example.newsrelease/entry/ets/viewmodel/NewsTypeViewModel";
import type NewsTypeBean from '../viewmodel/NewsTypeModel';
import { GlobalContext } from "@bundle:com.example.newsrelease/entry/ets/viewmodel/GlobalContext";
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabBarArray = new ObservedPropertyObjectPU(NewsTypeViewModel.getDefaultTypeList(), this, "tabBarArray");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.tabBarArray !== undefined) {
            this.tabBarArray = params.tabBarArray;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabBarArray.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabBarArray.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tabBarArray: ObservedPropertyObjectPU<NewsTypeBean[]>;
    get tabBarArray() {
        return this.__tabBarArray.get();
    }
    set tabBarArray(newValue: NewsTypeBean[]) {
        this.__tabBarArray.set(newValue);
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    TabBuilder(index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MainPage.ets(33:5)", "entry");
            Column.padding({ left: { "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }, right: { "id": 16777272, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            Column.margin({
                left: index === 0 ? { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } : 0,
                right: index === this.tabBarArray.length - 1 ? { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } : 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.tabBarArray[index].name);
            Text.debugLine("entry/src/main/ets/pages/MainPage.ets(34:7)", "entry");
            Text.height(Constants.FULL_PERCENT);
            Text.fontSize(this.currentIndex === index ? { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } : { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Text.fontWeight(this.currentIndex === index ? Constants.TYPE_FONT_WEIGHT : Constants.DESC_FONT_WEIGHT);
            Text.fontColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    aboutToAppear() {
        // Request news category.
        NewsTypeViewModel.getNewsTypeList().then((typeList: NewsTypeBean[]) => {
            this.tabBarArray = typeList;
        });
    }
    onPageShow() {
        if (GlobalContext.getContext().getObject('isBackRouter') === true) {
            GlobalContext.getContext().setObject('isBackRouter', false);
            let tempIndex = this.currentIndex;
            this.currentIndex = -1;
            this.currentIndex = tempIndex;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/MainPage.ets(64:5)", "entry");
            Stack.width(Constants.FULL_PERCENT);
            Stack.height(Constants.FULL_PERCENT);
            Stack.alignContent(Alignment.BottomEnd);
            Stack.backgroundColor({ "id": 16777296, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create();
            Tabs.debugLine("entry/src/main/ets/pages/MainPage.ets(65:7)", "entry");
            Tabs.barHeight({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Tabs.height(Constants.FULL_PERCENT);
            Tabs.barMode(BarMode.Scrollable);
            Tabs.onChange((index: number) => {
                this.currentIndex = index;
            });
            Tabs.vertical(false);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const tabsItem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new NewsList(this, { index, currentIndex: this.__currentIndex }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MainPage.ets", line: 68, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            index,
                                            currentIndex: this.currentIndex
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "NewsList" });
                        }
                    });
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, tabsItem.id);
                        } });
                    TabContent.debugLine("entry/src/main/ets/pages/MainPage.ets(67:11)", "entry");
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabBarArray, forEachItemGenFunction, (tabsItem: NewsTypeBean) => JSON.stringify(tabsItem), true, false);
        }, ForEach);
        ForEach.pop();
        Tabs.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777286, "type": 20000, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/MainPage.ets(81:7)", "entry");
            Image.width({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.height({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            Image.margin({ bottom: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }, right: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            Image.onClick(() => {
                router.pushUrl({ url: Constants.NEWS_EDIT_PAGE });
            });
        }, Image);
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.example.newsrelease", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false" });
