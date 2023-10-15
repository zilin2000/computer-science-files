
declare module "babylonjs-accessibility/HtmlTwin/htmlTwinGUIItem" {
import { Scene } from "babylonjs/scene";
import { Control } from "babylonjs-gui/2D/controls/control";
import { HTMLTwinItem } from "babylonjs-accessibility/HtmlTwin/htmlTwinItem";
/**
 * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
 */
export class HTMLTwinGUIItem extends HTMLTwinItem {
    /**
     * The corresponding BabylonJS entity. Can be a Node or a Control.
     */
    entity: Control;
    /**
     * The children of this item in the html twin tree.
     */
    children: HTMLTwinGUIItem[];
    constructor(entity: Control, scene: Scene, children: HTMLTwinGUIItem[]);
    /**
     * The text content displayed in HTML element.
     */
    get description(): string;
    /**
     * If this entity is actionable (can be clicked).
     */
    get isActionable(): boolean;
    /**
     * If this entity is focusable (can be focused by tab key pressing).
     */
    get isFocusable(): boolean;
    /**
     * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
     */
    focus(): void;
    /**
     * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
     */
    blur(): void;
    /**
     * Callback when an event (e.g. click/right click) happens on the HTML element.
     * Implemented by child classes
     * @param eventType - Which event is triggered. E.g. "click", "contextmenu"
     */
    triggerEvent(eventType: string): void;
}

}
declare module "babylonjs-accessibility/HtmlTwin/htmlTwinHostComponent" {
import * as React from "react";
import { HTMLTwinItem } from "babylonjs-accessibility/HtmlTwin/htmlTwinItem";
import { Scene } from "babylonjs/scene";
import { IHTMLTwinRendererOptions } from "babylonjs-accessibility/HtmlTwin/htmlTwinRenderer";
interface IHTMLTwinHostComponentProps {
    scene: Scene;
    options?: IHTMLTwinRendererOptions;
}
interface IHTMLTwinHostComponentState {
    a11yTreeItems: HTMLTwinItem[];
}
export class HTMLTwinHostComponent extends React.Component<IHTMLTwinHostComponentProps, IHTMLTwinHostComponentState> {
    private _observersMap;
    private _options;
    constructor(props: IHTMLTwinHostComponentProps);
    componentDidUpdate(prevProps: Readonly<IHTMLTwinHostComponentProps>, prevState: Readonly<IHTMLTwinHostComponentState>, snapshot?: any): void;
    /**
     * Adds observables to update the tree if any of the scene's nodes or GUI controls change.
     */
    _addSceneObservers: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _updateHTMLTwinItems;
    private _getHTMLTwinItemsFromNodes;
    private _getHTMLTwinItemsFromGUI;
    private _isFullscreenGUI;
    private _isMeshGUI;
}
export {};

}
declare module "babylonjs-accessibility/HtmlTwin/htmlTwinItem" {
import { Node } from "babylonjs/node";
import { Scene } from "babylonjs/scene";
import { Control } from "babylonjs-gui/2D/controls/control";
export type AccessibilityEntity = Node | Control;
/**
 * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
 */
export class HTMLTwinItem {
    /**
     * The corresponding BabylonJS entity. Can be a Node or a Control.
     */
    entity: AccessibilityEntity;
    /**
     * The BabylonJS scene that the corresponding BabylonJS entity is in.
     */
    scene: Scene;
    /**
     * The children of this item in the html twin tree.
     */
    children: HTMLTwinItem[];
    constructor(entity: AccessibilityEntity, scene: Scene, children: HTMLTwinItem[]);
    /**
     * The text content displayed in HTML element.
     * Returns the description in accessibilityTag, if defined (returns "" by default).
     */
    get description(): string;
    /**
     * If this entity is actionable (can be clicked).
     * Implemented by child classes
     */
    get isActionable(): boolean;
    /**
     * If this entity is focusable (can be focused by tab key pressing).
     * Implemented by child classes
     */
    get isFocusable(): boolean;
    /**
     * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
     * Implemented by child classes
     */
    focus(): void;
    /**
     * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
     * Implemented by child classes
     */
    blur(): void;
    /**
     * Callback when an event (e.g. click/right click) happens on the HTML element.
     * Implemented by child classes
     * @param _eventType - Which event is triggered. E.g. "click", "contextmenu"
     */
    triggerEvent(_eventType: string): void;
    protected _isActionable: boolean;
    protected _isFocusable: boolean;
}

}
declare module "babylonjs-accessibility/HtmlTwin/htmlTwinNodeItem" {
import { Node } from "babylonjs/node";
import { Scene } from "babylonjs/scene";
import { HTMLTwinItem } from "babylonjs-accessibility/HtmlTwin/htmlTwinItem";
/**
 * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
 */
export class HTMLTwinNodeItem extends HTMLTwinItem {
    /**
     * The corresponding BabylonJS entity. Can be a Node or a Control.
     */
    entity: Node;
    /**
     * The children of this item in the html twin tree.
     */
    children: HTMLTwinItem[];
    constructor(entity: Node, scene: Scene, children: HTMLTwinItem[]);
    /**
     * If this entity is actionable (can be clicked).
     */
    get isActionable(): boolean;
    /**
     * If this entity is focusable (can be focused by tab key pressing).
     */
    get isFocusable(): boolean;
    /**
     * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
     */
    focus(): void;
    /**
     * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
     */
    blur(): void;
    /**
     * Callback when an event (e.g. click/right click) happens on the HTML element.
     * Implemented by child classes
     * @param eventType - Which event is triggered. E.g. "click", "contextmenu"
     */
    triggerEvent(eventType: string): void;
    private _getTriggerActions;
}

}
declare module "babylonjs-accessibility/HtmlTwin/htmlTwinRenderer" {
import { Scene } from "babylonjs/scene";
/**
 * Options for the HTMLTwinRenderer.
 */
export interface IHTMLTwinRendererOptions {
    /**
     * If this is true, all GUI controls will be added to the twin tree, regardless if they have
     * a defined accessibility tag or not. If it's false, only controls with an accessibility tag
     * will be added. True by default.
     */
    addAllControls: boolean;
}
/**
 * This class is the main entry point for the HTML twin renderer. To render a twin for a scene,
 * simply call HTMLTwinRenderer.Render(scene).
 */
export class HTMLTwinRenderer {
    /**
     * Render the HTML twin for the given scene.
     * @param scene the scene to render the twin for
     * @param options options for the renderer
     */
    static Render(scene: Scene, options?: IHTMLTwinRendererOptions): void;
}

}
declare module "babylonjs-accessibility/HtmlTwin/htmlTwinTreeComponent" {
import * as React from "react";
import { HTMLTwinItem } from "babylonjs-accessibility/HtmlTwin/htmlTwinItem";
interface IHTMLTwinItemComponentProps {
    a11yItem: HTMLTwinItem;
    level: number;
}
export class HTMLTwinItemComponent extends React.Component<IHTMLTwinItemComponentProps> {
    constructor(props: IHTMLTwinItemComponentProps);
    render(): JSX.Element;
    private _renderLeafNode;
    private _renderParentNode;
    private _renderChildren;
}
export {};

}
declare module "babylonjs-accessibility/HtmlTwin/index" {
export * from "babylonjs-accessibility/HtmlTwin/htmlTwinRenderer";

}
declare module "babylonjs-accessibility/index" {
export * from "babylonjs-accessibility/HtmlTwin/index";

}
declare module "babylonjs-accessibility/legacy/legacy" {
export * from "babylonjs-accessibility/index";

}

declare module "babylonjs-accessibility" {
    export * from "babylonjs-accessibility/legacy/legacy";
}


declare module BABYLON.Accessibility {
    /**
     * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
     */
    export class HTMLTwinGUIItem extends HTMLTwinItem {
        /**
         * The corresponding BabylonJS entity. Can be a Node or a BABYLON.GUI.Control.
         */
        entity: BABYLON.GUI.Control;
        /**
         * The children of this item in the html twin tree.
         */
        children: HTMLTwinGUIItem[];
        constructor(entity: BABYLON.GUI.Control, scene: BABYLON.Scene, children: HTMLTwinGUIItem[]);
        /**
         * The text content displayed in HTML element.
         */
        get description(): string;
        /**
         * If this entity is actionable (can be clicked).
         */
        get isActionable(): boolean;
        /**
         * If this entity is focusable (can be focused by tab key pressing).
         */
        get isFocusable(): boolean;
        /**
         * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
         */
        focus(): void;
        /**
         * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
         */
        blur(): void;
        /**
         * Callback when an event (e.g. click/right click) happens on the HTML element.
         * Implemented by child classes
         * @param eventType - Which event is triggered. E.g. "click", "contextmenu"
         */
        triggerEvent(eventType: string): void;
    }


    interface IHTMLTwinHostComponentProps {
        scene: BABYLON.Scene;
        options?: IHTMLTwinRendererOptions;
    }
    interface IHTMLTwinHostComponentState {
        a11yTreeItems: HTMLTwinItem[];
    }
    export class HTMLTwinHostComponent extends React.Component<IHTMLTwinHostComponentProps, IHTMLTwinHostComponentState> {
        private _observersMap;
        private _options;
        constructor(props: IHTMLTwinHostComponentProps);
        componentDidUpdate(prevProps: Readonly<IHTMLTwinHostComponentProps>, prevState: Readonly<IHTMLTwinHostComponentState>, snapshot?: any): void;
        /**
         * Adds observables to update the tree if any of the scene's nodes or GUI controls change.
         */
        _addSceneObservers: () => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        private _updateHTMLTwinItems;
        private _getHTMLTwinItemsFromNodes;
        private _getHTMLTwinItemsFromGUI;
        private _isFullscreenGUI;
        private _isMeshGUI;
    }


    export type AccessibilityEntity = BABYLON.Node | BABYLON.GUI.Control;
    /**
     * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
     */
    export class HTMLTwinItem {
        /**
         * The corresponding BabylonJS entity. Can be a BABYLON.Node or a BABYLON.GUI.Control.
         */
        entity: AccessibilityEntity;
        /**
         * The BabylonJS scene that the corresponding BabylonJS entity is in.
         */
        scene: BABYLON.Scene;
        /**
         * The children of this item in the html twin tree.
         */
        children: HTMLTwinItem[];
        constructor(entity: AccessibilityEntity, scene: BABYLON.Scene, children: HTMLTwinItem[]);
        /**
         * The text content displayed in HTML element.
         * Returns the description in accessibilityTag, if defined (returns "" by default).
         */
        get description(): string;
        /**
         * If this entity is actionable (can be clicked).
         * Implemented by child classes
         */
        get isActionable(): boolean;
        /**
         * If this entity is focusable (can be focused by tab key pressing).
         * Implemented by child classes
         */
        get isFocusable(): boolean;
        /**
         * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
         * Implemented by child classes
         */
        focus(): void;
        /**
         * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
         * Implemented by child classes
         */
        blur(): void;
        /**
         * Callback when an event (e.g. click/right click) happens on the HTML element.
         * Implemented by child classes
         * @param _eventType - Which event is triggered. E.g. "click", "contextmenu"
         */
        triggerEvent(_eventType: string): void;
        protected _isActionable: boolean;
        protected _isFocusable: boolean;
    }


    /**
     * A abstract layer to store the html twin tree structure. It is constructed from the BabylonJS scene entities that need to be accessible. It informs the parent-children relationship of html twin tree, and informs how to render: description, isActionable, onclick/onrightclick/onfocus/onblur.
     */
    export class HTMLTwinNodeItem extends HTMLTwinItem {
        /**
         * The corresponding BabylonJS entity. Can be a BABYLON.Node or a Control.
         */
        entity: BABYLON.Node;
        /**
         * The children of this item in the html twin tree.
         */
        children: HTMLTwinItem[];
        constructor(entity: BABYLON.Node, scene: BABYLON.Scene, children: HTMLTwinItem[]);
        /**
         * If this entity is actionable (can be clicked).
         */
        get isActionable(): boolean;
        /**
         * If this entity is focusable (can be focused by tab key pressing).
         */
        get isFocusable(): boolean;
        /**
         * Callback when the HTML element is focused. Show visual indication on BabylonJS entity.
         */
        focus(): void;
        /**
         * Callback when the HTML element is blured. Dismiss visual indication on BabylonJS entity.
         */
        blur(): void;
        /**
         * Callback when an event (e.g. click/right click) happens on the HTML element.
         * Implemented by child classes
         * @param eventType - Which event is triggered. E.g. "click", "contextmenu"
         */
        triggerEvent(eventType: string): void;
        private _getTriggerActions;
    }


    /**
     * Options for the HTMLTwinRenderer.
     */
    export interface IHTMLTwinRendererOptions {
        /**
         * If this is true, all GUI controls will be added to the twin tree, regardless if they have
         * a defined accessibility tag or not. If it's false, only controls with an accessibility tag
         * will be added. True by default.
         */
        addAllControls: boolean;
    }
    /**
     * This class is the main entry point for the HTML twin renderer. To render a twin for a scene,
     * simply call HTMLTwinRenderer.Render(scene).
     */
    export class HTMLTwinRenderer {
        /**
         * Render the HTML twin for the given scene.
         * @param scene the scene to render the twin for
         * @param options options for the renderer
         */
        static Render(scene: BABYLON.Scene, options?: IHTMLTwinRendererOptions): void;
    }


    interface IHTMLTwinItemComponentProps {
        a11yItem: HTMLTwinItem;
        level: number;
    }
    export class HTMLTwinItemComponent extends React.Component<IHTMLTwinItemComponentProps> {
        constructor(props: IHTMLTwinItemComponentProps);
        render(): JSX.Element;
        private _renderLeafNode;
        private _renderParentNode;
        private _renderChildren;
    }







}


