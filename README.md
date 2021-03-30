# Remedy-Backend
Backend service for the Remedy app.

# PostgreSQL 13.2 Configuration Instructions

Connecting VS Code to the remote database
  1. Install the following VS Code extension: https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres
  2. In VS Code, under 'View' select 'Command Palette' and search for 'PostgreSQL Add Connection' option
  3. The information you need to enter can be found in the database discord channel.


<br>
<table style="caption-side: top">
<caption>Operations on the auth ressources </caption>
<tr>
    <th>URI</th>
    <th>Method</th>
    <th>Auths?</th>
    <th>Operation</th>
</tr>


<tr>
    <td>auth/login</td>
    <td>POST</td>
    <td>No</td>
    <td>
    Verify if the credentials of a user  and return the User and a JWT token if he's ok
    </td>
</tr>
<tr>
    <td>auth/register</td>
    <td>POST</td>
    <td>No</td>
    <td>
    create an user create a JWT token for him and return the User and a JWT token
    </td>
</tr>
<tr>
    <td>auth/logout</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        Logout the user return status code.
    </td>
</tr>
</table>


<br>
<table style="caption-side: top">
<caption>Operations on the user ressources </caption>
<tr>
    <th>URI</th>
    <th>Method</th>
    <th>Auths?</th>
    <th>Operation</th>
</tr>
<tr>
    <td>user/</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        Returning all the users.
    </td>
</tr>
<tr>
    <td>user/{id}</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        Returning a single user.
    </td>
</tr>
<tr>
    <td>user/id</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>
        Remove a single user.
    </td>
</tr>
<tr>
    <td>user/link/request</td>
    <td>POST</td>
    <td>Yes</td>
    <td>
        sending a request to link an account to another one ( sender and receiver into the body) return only status code.
    </td>
</tr>
<tr>
    <td>user/link/validate</td>
    <td>PATCH</td>
    <td>Yes</td>
    <td>
        Accept or refuse a link request  return status code.
    </td>
</tr>
<tr>
    <td>user/link/list/{id}</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        Return the list of all the link request where the user (uid_linker) is the receiver this table in the database has( id sender || id receiver || true OR false)  
    </td>
</tr>
<tr>
    <td>user/link/remove</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>
        Remove the link <b>(put uid of the linker and the linked into the body's request)</b> return status code. 
    </td>
</tr>
</table>

<br>
<table style="caption-side: top">
<caption>Operations on the medReminders ressources </caption>
<tr>
    <th>URI</th>
    <th>Method</th>
    <th>Auths?</th>
    <th>Operation</th>
</tr>
<tr>
    <td>medReminder/{userId}</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        return all the reminders for the user.
    </td>
</tr>
<tr>
    <td>medReminder/{userId}/{reminderId}</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        return a single reminders for the user
    </td>
</tr>
<tr>
    <td>medReminder/</td>
    <td>POST</td>
    <td>Yes</td>
    <td>
     Create a medication Reminder.
    </td>
</tr>
<tr>
    <td>medReminder/{reminderId}</td>
    <td>PATCH</td>
    <td>Yes</td>
    <td>
    Update medication reminder.
    </td>
</tr>
<tr>
    <td>medReminder/{reminderId}</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>
        Remove a medication reminder.
    </td>
</tr>
</table>


<br>
<table style="caption-side: top">
<caption>Operations on the appReminder ressources </caption>
<tr>
    <th>URI</th>
    <th>Method</th>
    <th>Auths?</th>
    <th>Operation</th>
</tr>
<tr>
    <td>appReminder/{userId}</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        return all the reminders for the user.
    </td>
</tr>
<tr>
    <td>appReminder/{userId}/{reminderId}</td>
    <td>GET</td>
    <td>Yes</td>
    <td>
        return a single reminders for the user
    </td>
</tr>
<tr>
    <td>appReminder/</td>
    <td>POST</td>
    <td>Yes</td>
    <td>
     Create a app Reminder.
    </td>
</tr>
<tr>
    <td>appReminder/{reminderId}</td>
    <td>PATCH</td>
    <td>Yes</td>
    <td>
    Update app reminder.
    </td>
</tr>
<tr>
    <td>appReminder/{reminderId}</td>
    <td>DELETE</td>
    <td>Yes</td>
    <td>
        Remove a app reminder.
    </td>
</tr>
</table>


