import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { addHttp } from '../../configs/utils/template.utils';

type Props = {
    icon?: JSX.Element;
    link?: string;
    className?: string;
    textClassName?: string;
};

const DataDisplay: React.FC<React.PropsWithChildren<Props>> = ({
    icon,
    link,
    className,
    textClassName,
    children,
}) => {
    if (isEmpty(children)) return null;

    if (link && !isEmpty(link)) {
        return (
            <div className={classNames(className)}>
                {icon}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={addHttp(link)}
                    className={textClassName}>
                    {children}
                </a>
            </div>
        );
    }

    return (
        <div className={classNames(className)}>
            {icon}
            <span className={textClassName}>{children}</span>
        </div>
    );
};

export default DataDisplay;
