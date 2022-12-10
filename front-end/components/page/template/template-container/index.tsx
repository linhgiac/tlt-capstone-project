import classNames from 'classnames';
import React from 'react';
import { TEMPLATE_HEADER } from '../../../../configs/constants/template.constants';
import { TemplateDataType } from '../../../../configs/interfaces/template.interface';
import TemplateItem from '../template-item';
import { Button, Col, Form, Input, Row, Select } from 'antd';


type TemplateContainerProps = {
    data: TemplateDataType[]
};

const TemplateContainer = (props: TemplateContainerProps) => {
    const { data } = props;

    const layoutItems = (data: TemplateDataType[]) => {
        const itemPerRow = 3;
        const items = [];
        const children = [];
        for (let i = 0; i < data.length; i++) {
            items.push(<TemplateItem item={data[i]}></TemplateItem>)
            if (items.length == itemPerRow) {
                children.push(
                    <Row>
                        {items.map((item) => (<Col>{item}</Col>))}
                    </Row>
                )
                while (items.length > 0)
                    items.pop();
            }
        }
        if (items.length > 0) {
            children.push(
                <Row>
                    {items.map((item) => (<Col>{item}</Col>))}
                </Row>
            )
        }
        return children;
    }
    return (
        <div>
            {layoutItems(data)}
        </div>
    );
};

export default TemplateContainer;
