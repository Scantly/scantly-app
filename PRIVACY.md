#### Data Protection, US COPPA and the EU GDPR
{:.mt-2}

We have designed our systems with privacy at their code. All your user data is handled and stored in _your_ own __Google Sheet__, and processed via _your_ own __Google Apps Script__.

By architected the system in this way, your data remains entirely under your control - which helps you ensure compliancy with relevant legislation and means you __shouldn't need__ to undertake a detailed [DPIA](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/data-protection-impact-assessments/){:target="_blank" rel="noopener"} (Data Protection Impact Assessment).

#### Analytics
{:.mt-2}

The only data that we receive from this site is __usage__ information. This data is handled by via [Googe Analytics](https://en.wikipedia.org/wiki/Google_Analytics){:target="_blank" rel="noopener"}, which is a widely-used third party service that collects standard internet log information, and behaviour patterns. The reason we do this is to measure the usage of this app (e.g. what is frequently used), and also __how__ they are being used (e.g. which buttons or menu-items are clicked most often). This data helps to shape development decisions (e.g. updating and streamlining layout and processes). None of this data is linked to your account, name or email address in any way. Personally identifiable information is banned from the [analytics platform](https://support.google.com/analytics/answer/6004245){:target="_blank" rel="noopener"} and we would never seek to try to track any individual users. All data is held in a highly secure state by google, and only accessible by us using industry-standard 2-factor authentication.

While this data is important, and __useful to us__, your preferences are __even more so__. If you would prefer to block these sorts of analytics tools while you are browsing the web, you can enable [do not track](http://donottrack.us/){:target="_blank" rel="noopener"} in your browser. This setting will be read by us and __we will not attempt__ to load the analytics code if it is set. Compliance with this setting is dependent on the website/tool and is not universally honoured across the web. Alternatively, to __forcefully block__ these analytics scripts from loading, you can install a privacy enhancing tool, such as the excellent [Ghostery](https://www.ghostery.com/){:target="_blank" rel="noopener"} chrome extension.

#### Browser Storage
{:.mt-2}

To provide functionality to you, we need to store a small amount of information in your browser. This stored information takes three forms:

##### Cookies
{:.mt-1}

Cookies are small pieces of text stored, sent and received by your browser from a website that you are visiting. __Google Analytics__ uses these cookies (first-party cookies, so they are not shared across sites) to store 'non-personally identifiable information'. These cookies are prefixed with '_ga' or '_gid'. Our app loads [third-party scripts](/credits/) from a global content delivery network (CDN) for speed and reliability. These CDNs may also use first-party cookies to help deliver their services (e.g. [Cloudflare](https://www.cloudflare.com/cookie-policy/){:target="_blank" rel="noopener"}).

##### Cache Storage
{:.mt-1}

In order to deliver the best possible service, even in __challenging connectivity__ situations (poor wifi stability for example), we make use of [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/){:target="_blank" rel="noopener"} technology on [compatible platforms](http://caniuse.com/#feat=serviceworkers){:target="_blank" rel="noopener"}. This technology means we can proactively cache various parts of the site and code in your browser, allowing it to be __fetched__, even when moving between different pages, without having to communicate over the Internet. These pages are stored securely in the browser cache, and are periodically updated when updates are released.

##### Local Storage
{:.mt-1}

Finally, we use browser storage functions (such as [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB){:target="_blank" rel="noopener"} and [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage){:target="_blank" rel="noopener"}) to store:
- __Access Tokens__: These are the cryptographic tokens which grant access to API Services. They are stored __only in your browser__, work only on our site, and are invalidated/cleared when you sign out of the services (e.g. out of our app or the Google platform as a whole).