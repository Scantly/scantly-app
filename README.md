The web-app comprises three parts:

### Reader

The __reader mode__ is used at any place you want people to sign in. You can use any __modern device__ with a web-cam to act as a reader (such as a tablet, laptop or Chromebook). The device does not need to be logged in to the app to function as a reader. Simple click on the __reader__ link from the navigation bar and grant the appropriate permission to use the web-cam. If you are using a managed Chromebook, you can use a [guest session](https://support.google.com/chrome/a/answer/3017014){:target="_blank" rel="noopener"} to automatically load the reader when the device starts.

### Codes

Codes are used to __physically sign-in__ at the reader. They must be presented to the web-cam, close enough for reading (which is typically __15-20cm__ but will depend on the web-cam model). When a reader recognises a QR code, it will __visually highlight__ it and then pause the screen for the a few seconds. This lets the user know that the code has been read. Provided the code is valid, the user data will be securely transmitted to the logging __Google Sheet__. Once this is done, the user will receive a visual confirmation that the code was valid, and whether they have __signed in__{:.bg-in .px-1 .rounded} or __signed out__{:.bg-out .text-light .px-1 .rounded}.

### Manage

Management allows __authorised users__ to access location QR codes and urls. Location codes are used to ensure that readers can be __securely associated__ with particular places (e.g. a reception area). A manager can scan a location code, or use the unique reader URL (for kiosk style deployments) to set the reader to a particular location. This location will then be shown in the Google Sheet log.