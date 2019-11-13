import { h } from 'preact';
import AsyncWrapper from '../wrappers/async';
import HTMLWrapper from '../wrappers/html';

const urlSuffix = '.html?wcmmode=disabled';
const ctaUrl = `http://localhost:4502/content/experience-fragments/uhcdotcom/tiles/home_page/MedicareFindPlanA/MedicareFindPlanE1/jcr:content/root/container_copy/cta_copy${urlSuffix}`
const ctaHTML = `<a href="https://www.uhccommunityplan.com/dsnp-plans?cid=da%3A2019-dsnp-acquisition%3A91d78334&WT.mc_id=8010956" arialabel="Learn more about a United Healthcare Dual Complete plan. opens a new window" target="_blank">Learn moreeeee</a>`;

export default { title: 'asdf' };

export const fetched = () => <AsyncWrapper contentPath={ctaUrl} />;
export const inline = () => <HTMLWrapper html={ctaHTML} />