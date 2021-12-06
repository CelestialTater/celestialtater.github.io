textIndex = 0
pgphs = [
    `I personally found the variety of media types in the course both helpful and enjoyable. I found it made it more enjoyable to look ahead at the content for the next week knowing that it would be something new. Specifically with The Tempest, I found it very beneficial to view the play and movie versions, as well as audiobooks as you suggested. While I had studied Shakespeare in the past, I had never taken full advantage of these forms of media before and I felt that I understood the content more thoroughly once I did. 

    <br><br>sI think that the use of non-standard texts, specifically many of the videos, made the course more engaging. Understanding how videos can have just as many symbols and themes as any other text was fairly new to me, and it added a level of depth to the course that I enjoyed. I hope that in future courses I will also see a variety of media forms.
`,
  `One of my favorite things about the course as a whole was the assignment structure as a whole. I enjoyed how the formal essay was separated into the annotated bibliography, guided introduction, draft, and final. Doing this greatly reduced the amount of stress for each assignment and allowed me to focus entirely on the specific parts that form an essay. By the time I got to write the actual essay, it was simple and straightforward as a result of all the planning I had done. I would say that generally, I enjoyed all of the essay related assignments and they helped me work on planning my writing.

  <br><br>Personally, I found the annotated bibliography assignment to be quite challenging. Throughout high school, none of the essays I had to write were research based, and were always in a test essay format. I had thus never had to research through databases and find scholarly articles to support my ideas. While I was able to get all the sources I needed, it definitely took a while to figure out the best way to search for what I needed. That said, I enjoyed the assignment as it forced me to learn skills that will likely be necessary for my future courses.
`,
`I did enjoy sharing ideas with classmates at various points during class as it made it easy to bounce ideas off each other. It was beneficial to my understanding of the class content to be able to discuss it with others and hear other perspectives and ideas. While I’m not usually the best at speaking in front of large groups, it was easy for me to share ideas with smaller groups so I enjoyed how that was encouraged. I think small breakout rooms would have a similar effect and would also make it easier for me to discuss ideas.`,
`I feel that my participation was fairly good, though it could have been better. I enjoyed participating in the smaller group discussions in each class as they allowed me to meet classmates and get to know them. I also did a good job with the weekly writing prompts and submitted one for each prompt. For those, my motivation mainly came from a desire to improve my writing and become better at getting my ideas down in words. However, I did struggle with speaking to the entire class and only did it for a few classes. I recognize that as an area to improve in the future.`
]

qns = [
    `Did you find the use of media helpful? Do you think English courses should use more non-standard texts?`,
    `Which assignments did you enjoy? Which gave you the most challenge? What kinds of assignments would you like to see in the course?`,
    `Do you find it helpful to share ideas with a partner or classmates? Would you have welcomed learning in small break-out groups?`,
    `How would you rate your participation in this course? What motivated you? What did you struggle with?`
]

function next() {
    textIndex++
    if (textIndex > 3){
        textIndex = 0
    }
    document.getElementById('qn').innerHTML = qns[textIndex]
    document.getElementById('pg').innerHTML = pgphs[textIndex]
}