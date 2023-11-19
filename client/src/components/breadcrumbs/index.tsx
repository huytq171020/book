import { Breadcrumb } from "antd"
import { FunctionComponent } from "react";

interface BreadCrumbProps {
    
}
 
const BreadCrumb: FunctionComponent<BreadCrumbProps> = () => {
    return <div className="pt-2 pb-2 px-8">
    <Breadcrumb
        items={[
            {
                href: '/',
                title: 'Home',
            },
            {
                title: 'Account Detail',
            }
        ]}
    />
</div>
}
 
export default BreadCrumb;