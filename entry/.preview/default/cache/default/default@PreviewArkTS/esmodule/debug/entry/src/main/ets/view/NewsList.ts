if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsList_Params {
    index?: number;
    currentIndex?: number;
    refreshStore?: RefreshListViewModel;
}
import NewsItem from "@bundle:com.example.newsrelease/entry/ets/view/NewsItem";
import LoadMoreLayout from "@bundle:com.example.newsrelease/entry/ets/view/LoadMoreLayout";
import RefreshLayout from "@bundle:com.example.newsrelease/entry/ets/view/RefreshLayout";
import type { NewsData } from '../viewmodel/NewsData';
import Constants from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
import type { PageState } from "@bundle:com.example.newsrelease/entry/ets/common/constants/Constants";
import NewsViewModel from "@bundle:com.example.newsrelease/entry/ets/viewmodel/NewsViewModel";
import { showToast } from "@bundle:com.example.newsrelease/entry/ets/common/utils/ToastUtil";
import FailureLayout from "@bundle:com.example.newsrelease/entry/ets/view/FailureLayout";
import LoadingLayout from "@bundle:com.example.newsrelease/entry/ets/view/LoadingLayout";
import NoMoreLayout from "@bundle:com.example.newsrelease/entry/ets/view/NoMoreLayout";
import RefreshListViewModel from "@bundle:com.example.newsrelease/entry/ets/viewmodel/RefreshListViewModel";
export default class NewsList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.index = 0;
        this.__currentIndex = new SynchedPropertySimpleTwoWayPU(params.currentIndex, this, "currentIndex");
        this.__refreshStore = new ObservedPropertyObjectPU(new RefreshListViewModel(), this, "refreshStore");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("currentIndex", this.changeCategory);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsList_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.refreshStore !== undefined) {
            this.refreshStore = params.refreshStore;
        }
    }
    updateStateVars(params: NewsList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentIndex.aboutToBeDeleted();
        this.__refreshStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private index: number;
    private __currentIndex: SynchedPropertySimpleTwoWayPU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __refreshStore: ObservedPropertyObjectPU<RefreshListViewModel>;
    get refreshStore() {
        return this.__refreshStore.get();
    }
    set refreshStore(newValue: RefreshListViewModel) {
        this.__refreshStore.set(newValue);
    }
    changeCategory() {
        if (this.currentIndex !== this.index) {
            return;
        }
        this.refreshStore.currentPage = 1;
        NewsViewModel.getNewsList(this.refreshStore.currentPage, this.refreshStore.pageSize).then((data: NewsData[]) => {
            this.refreshStore.pageState = 1;
            if (data.length === this.refreshStore.pageSize) {
                this.refreshStore.currentPage++;
                this.refreshStore.hasMore = true;
            }
            else {
                this.refreshStore.hasMore = false;
            }
            this.refreshStore.newsData = data;
        }).catch((err: string | Resource) => {
            showToast(err);
            this.refreshStore.pageState = 2;
        });
    }
    aboutToAppear() {
        // Load data.
        this.changeCategory();
    }
    reloadAction() {
        this.refreshStore.pageState = 0;
        this.changeCategory();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/NewsList.ets(68:5)", "entry");
            Column.width(Constants.FULL_PERCENT);
            Column.height(Constants.FULL_PERCENT);
            Column.justifyContent(FlexAlign.Center);
            Column.onTouch((event?: TouchEvent) => {
                if (event) {
                    if (this.refreshStore.pageState === 1) {
                        this.refreshStore.listTouchEvent(event);
                    }
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.refreshStore.pageState === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LoadingLayout(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 70, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LoadingLayout" });
                    }
                });
            }
            else if (this.refreshStore.pageState === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ListLayout.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new FailureLayout(this, { reloadAction: () => {
                                        this.reloadAction();
                                    } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 74, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        reloadAction: () => {
                                            this.reloadAction();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "FailureLayout" });
                    }
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    ListLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: Constants.LIST_SPACE });
            List.debugLine("entry/src/main/ets/view/NewsList.ets(92:5)", "entry");
            List.width(Constants.FULL_PERCENT);
            List.height(Constants.FULL_PERCENT);
            List.padding({ left: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" }, right: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" } });
            List.backgroundColor({ "id": 16777296, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
            List.edgeEffect(EdgeEffect.None);
            List.onScrollIndex((start: number, end: number) => {
                // Listen to the first index of the current list.
                this.refreshStore.startIndex = start;
                this.refreshStore.endIndex = end;
            });
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/view/NewsList.ets(93:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RefreshLayout(this, { refreshLoadingClass: this.refreshStore.refreshLayoutClass }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 94, col: 9 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    refreshLoadingClass: this.refreshStore.refreshLayoutClass
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                refreshLoadingClass: this.refreshStore.refreshLayoutClass
                            });
                        }
                    }, { name: "RefreshLayout" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.backgroundColor({ "id": 16777299, "type": 10001, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
                        ListItem.borderRadius({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.newsrelease", "moduleName": "entry" });
                        ListItem.debugLine("entry/src/main/ets/view/NewsList.ets(97:9)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new NewsItem(this, { newsData: item }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 98, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            newsData: item
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "NewsItem" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.refreshStore.newsData, forEachItemGenFunction, (item: NewsData, index?: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.debugLine("entry/src/main/ets/view/NewsList.ets(103:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.refreshStore.hasMore) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LoadMoreLayout(this, { loadMoreLayoutClass: this.refreshStore.loadingMoreClass }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 105, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                loadMoreLayoutClass: this.refreshStore.loadingMoreClass
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            loadMoreLayoutClass: this.refreshStore.loadingMoreClass
                                        });
                                    }
                                }, { name: "LoadMoreLayout" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NoMoreLayout(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/NewsList.ets", line: 107, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "NoMoreLayout" });
                            }
                        });
                    }
                }, If);
                If.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
