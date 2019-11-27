import React, { Component } from 'react';
import { withKnobs, text } from "@storybook/addon-knobs";

class Heading extends Component {
    render() {
        const Element = this.props.element || h1;
        return <Element>{this.props.text}</Element>
    }
}

class TypographyKitchenSink extends Component {
    render() {
        return (
            <div>
                <h1>This is the primary heading and there should only be one of these per page</h1>
                <p>A small paragraph to <em>emphasis</em> and show <strong>important</strong> bits.</p>
                <ul>
                    <li>This is a list item</li>
                    <li>So is this - there could be more</li>
                    <li>Make sure to style list items to:
                        <ul>
                            <li>Not forgetting child list items</li>
                            <li>Not forgetting child list items</li>
                            <li>Not forgetting child list items</li>
                            <li>Not forgetting child list items</li>
                        </ul>
                    </li>
                    <li>A couple more</li>
                    <li>top level list items</li>
                </ul>
                <p>Don't forget <strong>Ordered lists</strong>:</p>
                <ol>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                    <li>Aliquam tincidunt mauris eu risus.
                        <ol>
                            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                            <li>Aliquam tincidunt mauris eu risus.</li>
                        </ol>
                    </li>
                    <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                    <li>Aliquam tincidunt mauris eu risus.</li>
                </ol>
                <h2>A sub heading which is not as important as the first, but is quite imporant overall</h2>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                <table>
                    <tr>
                        <th>Table Heading</th>
                        <th>Table Heading</th>
                    </tr>
                    <tr>
                        <td>table data</td>
                        <td>table data</td>
                    </tr>
                    <tr>
                        <td>table data</td>
                        <td>table data</td>
                    </tr>
                    <tr>
                        <td>table data</td>
                        <td>table data</td>
                    </tr>
                    <tr>
                        <td>table data</td>
                        <td>table data</td>
                    </tr>
                </table>    
                    
                <h3>A sub heading which is not as important as the second, but should be used with consideration</h3>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                <blockquote><p>“Ooh - a blockquote! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.”</p></blockquote>
                <h4>A sub heading which is not as important as the second, but should be used with consideration</h4>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                
                <h5>A sub heading which is not as important as the second, but should be used with consideration</h5>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                <dl>
                    <dt>Definition list</dt>
                    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
                    <dt>Lorem ipsum dolor sit amet</dt>
                    <dd>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
                </dl>
                <h6>This heading plays a relatively small bit part role, if you use it at all</h6>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
            </div>
        )
    }
}

export default { title: 'Typography', decorators: [withKnobs] };

export const KitchenSink = () => <TypographyKitchenSink />
export const Headings = () => {
    return (
        <div>
            <h1>Headings</h1>
            <hr />
            <Heading element="h1" text={text("Heading Text","The quick brown fox jumps over the lazy dog")} />
            <Heading element="h2" text={text("Heading Text","The quick brown fox jumps over the lazy dog")} />
            <Heading element="h3" text={text("Heading Text","The quick brown fox jumps over the lazy dog")} />
            <Heading element="h4" text={text("Heading Text","The quick brown fox jumps over the lazy dog")} />
            <Heading element="h5" text={text("Heading Text","The quick brown fox jumps over the lazy dog")} />
            <Heading element="h6" text={text("Heading Text","The quick brown fox jumps over the lazy dog")} />
        </div>
    )
}