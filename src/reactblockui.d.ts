import * as PropTypes from 'prop-types';

export type BlockUiProps<T = {}> = React.HTMLAttributes<HTMLElement> & {
    blocking?: PropTypes.bool,
    keepInView?: PropTypes.bool,
    children?: PropTypes.node,
    renderChildren?: PropTypes.bool, // default to true
    className?: PropTypes.string,
    message?: PropTypes.oneOfType,
    loader?: PropTypes.oneOfType,
    tag?: PropTypes.oneOfType
} & T;

declare class BlockUi<T = {[key: string]: any}> extends React.Component<BlockUiProps<T>> {}
export default BlockUi;


export type ReduxBlockUiProps<T = {}> = React.HTMLAttributes<HTMLElement> & {
    blocking?: PropTypes.bool,
    keepInView?: PropTypes.bool,
    children?: PropTypes.node,
    renderChildren?: PropTypes.bool, // default to true
    className?: PropTypes.string,
    message?: PropTypes.oneOfType,
    loader?: PropTypes.oneOfType,
    tag?: PropTypes.oneOfType,
    block: PropTypes.oneOfType,
    unblock: PropTypes.oneOfType,
    onChange: PropTypes.func
} & T;

declare class ReduxBlockUi<T = {[key: string]: any}> extends React.Component<ReduxBlockUiProps<T>> {}
export default ReduxBlockUi;
