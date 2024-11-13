### ChatSprout - Grow Your Networking Skills

Do you feel anxious at networking events or struggle with making small talk in professional settings? Chat Sprout prepares you for every networking opportunity. 


---

### Current State
1. **
2. *Finished the Notebook related features*
![App Screenshot](./assets/notes-related-screenshots.png)
3. *Conversation can be added as a note to notebook*
![App Screenshot](./assets/add-conversation-to-notes.png)
---

### Data Model and Collections
1. **Notes Collection -** stores notes that users create or save from conversations.
   - Create: When a user adds a new note or saves a conversation as a note.
   - Read: Retrieve all notes for a user.
   - Update: When a user edits the content, title, or images of an existing note.
   - Delete: When a user deletes a specific note.
2. **Users Collection -** stores user profile information and settings.
   - Create: When a new user signs up, a new user document is created in this collection.
   - Read: Retrieve user information and notification for account pages.
   - Update: When a user updates their profile information or changes notification preferences.
   - Delete: Not provided on the mobile app.





---

### Team Contributions

**Xinyu Zeng:**
1. **Navigation**
   - Set up and configured the main app navigation using `@react-navigation` with a bottom tab navigator (`TabNavigator`).

2. **Notebook Functionality**
   - Developed the `NotebookScreen` where users can view, add, search, and delete notes, notes are sorted by timestamp.
   - Integrated Firebase to fetch notes data in real-time, ensuring that any `CRUD operations` are instantly reflected on the screen.
   - Integrated `SearchBar` with real-time filtering by title or content for quick access to specific notes.

3. **Rich Text Editor / Add Note Screen**
   - Created a custom `RichTextEditor` component to allow users to add rich content to their notes, including text and images.
   - Integrated `expo-image-picker` to allow users to insert images from their device’s gallery into notes.
   - Configured image handling, including deletion functionality, so users can remove images if needed.

4. **Save Conversations to Notebook**
   - Implemented the function that allows users to add conversations directly from the conversation screen to their notebook.
   - Added a success `toast` notification to confirm when a note has been successfully saved. 
