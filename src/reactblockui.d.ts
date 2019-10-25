import * as React from 'react';

export type BlockUiProps<T = {}> = React.HTMLAttributes<HTMLElement> & {
    blocking?: boolean,
    keepInView?: boolean,
    children?: any,
    renderChildren?: boolean, // default to true
    className?: string,
    message?: string | React.ReactNode,
    loader?: ((...args: any[]) => any) | string | React.ReactNode,
    tag?: React.ReactType | string,
} & T;

declare class BlockUi<T = { [key: string]: any }> extends React.Component<BlockUiProps<T>> { }



export type ReduxBlockUiProps<T = {}> = React.HTMLAttributes<HTMLElement> & {
    blocking?: boolean,
    keepInView?: boolean,
    children?: any,
    renderChildren?: boolean, // default to true
    className?: string,
    message?: string | React.ReactNode,
    loader?: ((...args: any[]) => any) | string | React.ReactNode,
    tag?: ((...args: any[]) => any) | string,
    block: ((...args: any[]) => any) | RegExp | string | Array<any>,
    unblock: ((...args: any[]) => any) | RegExp | string | Array<any>,
    onChange: (e: any) => void
} & T;

declare class ReduxBlockUi<T = { [key: string]: any }> extends React.Component<ReduxBlockUiProps<T>> { }

export default BlockUi;
export { ReduxBlockUi };
