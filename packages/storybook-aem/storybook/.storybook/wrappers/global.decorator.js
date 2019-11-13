import { h, Component } from 'preact';

export default class GlobalWrapper extends Component {
    renderGlobalClientlibs() {
        if (this.props.globalClientLibs) {
            return (
                <div>
                    {this.props.globalClientLibs.map(file => {
                        console.log('file:', file)
                        if (file.indexOf('.js') !== -1) {
                            return <script type="text/javascript" src={file}></script>;
                        } else if (file.indexOf('.css') !== -1) {
                            return <link rel="stylesheet" href={file} type="text/css" />
                        } 
                    })}
                </div>
            )
        }
    }
    
    render() {
        if (!this.props.isolated) {
            return (
                <div>
                    {this.renderGlobalClientlibs()}
                    <div className={this.props.wrapperClasses}>{this.props.story()}</div>
                </div>
            );
        } else return (
            <div class="root responsivegrid">
                {this.renderGlobalClientlibs()}
                <div class="aem-Grid aem-Grid--12 aem-Grid--default--12">
                    <div class="regioncontainer responsivegrid aem-GridColumn aem-GridColumn--default--12">
                        <main class="aem-Grid aem-Grid--12 aem-Grid--default--12" id="main-content" role="main">
                            <div class="responsivegrid aem-GridColumn aem-GridColumn--default--12">
                                <div class="aem-Grid aem-Grid--12 aem-Grid--default--12">
                                    {this.props.story(this.props.wrapperClasses)}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
};