[![CI/CD](https://github.com/vertigis/workflow-activities-1integrate/workflows/CI/CD/badge.svg)](https://github.com/vertigis/workflow-activities-1integrate/actions)
[![npm](https://img.shields.io/npm/v/@vertigis/workflow-activities-1integrate)](https://www.npmjs.com/package/@vertigis/workflow-activities-1integrate)

This project contains activities for interacting with the [1Integrate REST API](https://1spatial.com/documentation/1integrate) in a [VertiGIS Studio Workflow](https://www.vertigisstudio.com/products/vertigis-studio-workflow/).

## 1Integrate

1Integrate brings the power of 1Spatial’s patented rules engine to your data, delivering automated validation, cleansing, transformation, and enhancement. It gives you confidence in your data by assessing its quality, ensuring it meets defined specifications and is fit for purpose. Connect, Check and Correct your data, then Repeat those processes when required.

## Usage

To use the 1Integrate activities in [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/) you need to register an activity pack and then add the activities to a workflow.

### Register the 1Integrate activity pack

1. Sign in to ArcGIS Online or Portal for ArcGIS
1. Go to **My Content**
1. Select **Add Item > An application**
    - Type: `Web Mapping`
    - Purpose: `Ready To Use`
    - API: `JavaScript`
    - URL: The URL to this activity pack manifest
        - Use https://unpkg.com/@vertigis/workflow-activities-1integrate/activitypack.json for the latest version
        - Use https://unpkg.com/@vertigis/workflow-activities-1integrate@1.0.0/activitypack.json for a specific version
        - Use https://localhost:5000/activitypack.json for a local development version
    - Title: Your desired title
    - Tags: Must include `geocortex-workflow-activity-pack`
1. Reload [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/)
1. The 1Integrate activities will now appear in the activity toolbox in a `1Spatial - 1Integrate` category

### Use the 1Integrate activities in a workflow

1. Establish a connection to the 1Integrate service
    1. To connect to the 1Integrate service as a user:
        1. Add the `Authenticate App` activity to a workflow
        1. Set the `Base URL` input to the root URL of your 1Integrate server. For example, `https://acme.1integrate.com/1integrate`.
        1. Set the `Access Token URL` input to the URL of your 1Integrate server's access token endpoint.
        1. Set the `Username` and `Password` inputs
    - **IMPORTANT:** secrets and passwords are credentials that should not be hard coded into workflows. These values should be acquired by the workflow at runtime from the end user or from another secure system.
1. Use the 1Integrate service
    1. Add one of the other 1Integrate activities to the workflow. For example, `Get Rules`.
    1. Set the `Service` input of the activity to be the output of the `Authenticate App` activity
        - Typically this would use an expression like `=$authenticateApp.service`
    1. Supply any additional inputs to the activity
    1. Supply the `result` output of the activity to the inputs of other activities in the workflow
1. Run the workflow

## Development

This project was bootstrapped with the [VertiGIS Studio Workflow SDK](https://github.com/vertigis/vertigis-workflow-sdk). Before you can use your activity pack in the [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/), you will need to [register the activity pack](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview#register-the-activity-pack).

## Available Scripts

Inside the newly created project, you can run some built-in commands:

### `npm run generate`

Interactively generate a new activity or form element.

### `npm start`

Runs the project in development mode. Your activity pack will be available at [http://localhost:5000/main.js](http://localhost:5000/main.js). The HTTPS certificate of the development server is a self-signed certificate that web browsers will warn about. To work around this open [`https://localhost:5000/main.js`](https://localhost:5000/main.js) in a web browser and allow the invalid certificate as an exception. For creating a locally-trusted HTTPS certificate see the [Configuring a HTTPS Certificate](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview/#configuring-a-https-certificate) section on the [VertiGIS Studio Developer Center](https://developers.vertigisstudio.com/docs/workflow/overview/).

### `npm run test`

Runs all unit tests.

### `npm run lint`

Runs linter to perform static analysis.

### `npm run build`

Builds the activity pack for production to the `build` folder. It optimizes the build for the best performance.

Your custom activity pack is now ready to be deployed!

See the [section about deployment](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview/#deployment) in the [VertiGIS Studio Developer Center](https://developers.vertigisstudio.com/docs/workflow/overview/) for more information.

## Documentation

Find [further documentation on the SDK](https://developers.vertigisstudio.com/docs/workflow/sdk-web-overview/) on the [VertiGIS Studio Developer Center](https://developers.vertigisstudio.com/docs/workflow/overview/)
