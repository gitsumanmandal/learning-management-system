<h1>Welcome to LMS by Suman M.</h1>

<h3>Pre-requisites before you start. You must have in your local machine -</h3>

<ul>
  <li>node js</li>
  <li>docker</li>
</ul>

<h1>How to run locally ?</h1>

<ul>
  <li>
    Run <b>git clone https://github.com/gitsumanmandal/learning-management-system.git</b>
  </li>
  <li>
    Then run <b>cd learning-management-system</b>
  </li>
</ul>
<br/>

Now you can see 3 folders. One **lms-services** for API & services, and other one **lms-ui** for front end, **lms-migration** for initial migration data.

<h3>To start DB server -</h3>

<ul>
  <li>docker run -d -p 5001:27017 --name=lms_db mongo:latest</li>
  <li>from <b>learning-management-system</b> folder run <b>cd lms-migration</b></li>
  <li>Run <b>npm i</b></li>
  <li>Run <b>node index.js</b></li>
</ul>

<u><h3>To start <b>lms-service</b></h3></u>

<ul>
  <li>from <b>learning-management-system</b> folder run <b>cd lms-services</b></li>
  <li>Run <b>npm i</b>
    <br/>
    <i>(.env is already comitted, so don't need to worry about that)</i>
  </li>
  <li>Run <b>npm run start</b></li>
</ul>

The services app is up and running on **localhost:3000**

<h3>To start <b>lms-ui</b></h3>

<ul>
  <li>from <b>learning-management-system</b> folder run <b>cd lms-ui</b></li>
  <li>Run <b>npm i</b>
    <br/>
    <i>(.env variables are already attached to start command, so son't need to worry about that)</i>
  </li>
  <li>Run <b>npm run dev</b></li>
</ul>

The front-end app is up and running on **localhost:3001**

Now navigate to **localhost:3001/sign-in** and login with a student. You can check the all courses, enroll courses, you can enroll into course, then mark lessons learned, and see the progress (_till this developed_).

You can also check **localhost:3000/api** for OpenAPI Swagger Documentation.

<h1>Things covered</h1>

<ul>
  
  <li>In Nest JS / Backend services, technical things which are covered -
    <ul>
      <li>Auth | JWT</li>
      <li>Login | Bcrypt</li>
      <li>Authenticated API | Auth Guard</li>
      <li>Validation</li>
      <li>Repository Pattern</li>
      <li>Logger | In Built Logger</li>
      <li>Exception Handling</li>
      <li>Interceptor | for Response</li>
      <li>Decorator | Public decorato written</li>
    </ul>
  </li>
  
  <li>In Next JS / Front End, technical things which are covered -
    <ul>
      <li>Sign In, Sign Up</li>
      <li>Session</li>
      <li>Token</li>
      <li>Route</li>
      <li>Lazy Loading</li>
      <li>MUI (for ux)</li>
      <li>React concepts like - <b>useState, useContext, useNavigator, useNavigator, useEffect, provider etc</b></li>
    </ul>
  </li>
        
</ul>

<h1>Scope of improvement</h1>

In backend mainly <i>(not writting for front-end)</i> -

<ul>
  <li>More validation on business layer</li>
  <li>Log on file level</li>
  <li>More currated response interceptor</li>
  <li>Better exception handling and write Exception filters</li>
</ul>

