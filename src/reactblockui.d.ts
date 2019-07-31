

export type BlockUiProps<T = {}> = React.HTMLAttributes<HTMLElement> & {
    blocking?: boolean,
    keepInView?: boolean,
    children?: any,
    renderChildren?: boolean, // default to true
    className?: string,
    message?: any,
    loader?: any,
    tag?: any
} & T;

declare class BlockUi<T = { [key: string]: any }> extends React.Component<BlockUiProps<T>> { }



export type ReduxBlockUiProps<T = {}> = React.HTMLAttributes<HTMLElement> & {
    blocking?: boolean,
    keepInView?: boolean,
    children?: any,
    renderChildren?: boolean, // default to true
    className?: string,
    message?: any,
    loader?: any,
    tag?: any,
    block: any,
    unblock: any,
    onChange: (e: any) => void
} & T;

declare class ReduxBlockUi<T = { [key: string]: any }> extends React.Component<ReduxBlockUiProps<T>> { }
export { BlockUi, ReduxBlockUi };
