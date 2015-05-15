#@codekit-prepend "picoModal"
###
Copyright (c) 2012 ElevenBlack
Written by Ciocanel Razvan (chocksy.com)
###

###
A self-contained loader library
###
window.widgetLoader = ((window,document) ->
  "use strict"

  defaults=
    widget_domain:  '//location.for.iframe.widget' # the contact form to load
    domain:         '//domain.for.iframe.widget'
    modal_width:    false
    modal_height:   false
    iframe_widget:  false
    iframe_width:   "100%"
    iframe_height:  "100%"
    side_btn:       true 

  cssNumber=
    "columnCount": true,
    "fillOpacity": true,
    "flexGrow": true,
    "flexShrink": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true

  elements= 
    side_btn_content:     '<div id="WDG_sideBtn_ctn"><a href="#" id="WDG_sideBtn">Errors Widget</a></div>'
    side_btn:             "#WDG_sideBtn"

  # ---- assignModal Method
  # -- assign modal method to element class
  assignModal= ->
    $s('.el-modal').on 'click',(e)=>
      e.preventDefault()
      element = e.currentTarget 
      widget_token = element.getAttribute('data-widget')
      moduleInfo = JSON.stringify({url:widget_token})
      loadModule({data:moduleInfo})

  # ---- loadModule Method
  # -- we use this method as a way to verify if we need to open a new window or a modal
  # -- depending by the browser type. This is also called by the iframe in case of displaying
  # -- a new step.
  loadModule= (e)->
    info_received = JSON.parse(e.data)
    window.ELopts.widget_url = info_received.url
    ###
    window.ELopts.domain = window.ELopts.widget_domain
    window.ELopts.domain = info_received.domain if info_received.domain!=undefined

    if isMobile()
      window.open(window.ELopts.domain+"?id="+window.ELopts.widget_url,'_blank')
    else
    ###  
    openModal()

  # ---- openModal Method
  # -- we use this method to initialize the modal and add the iframe to it
  openModal= ()->
    current_height = make().getWindow('height')
    current_width = make().getWindow('width')
    widget_width = if window.ELopts.modal_width then window.ELopts.modal_width else current_width/1.2
    widget_height = if window.ELopts.modal_height then window.ELopts.modal_height else current_height/1.6

    outerWidth = if typeof widget_width=="number" then current_width-widget_width else (current_width*parseInt(widget_width)/100)
    outerHeight= if typeof widget_height=="number" then current_height-widget_height else (current_height*parseInt(widget_height)/100)

    picoModal(
      content: '
        <link rel="stylesheet" href="../src/css/epicloggerModal.css">

    <div class="body">      
    
      <!-- Red color scheme -->
      <form action="" class="epic-form" />
        <header>form</header>
        
        <fieldset>
          <section>
            <label class="label">Text input</label>
            <label class="input">
              <input type="text" />
            </label>
          </section>
          
          <section>
            <label class="label">File input</label>
            <label for="file" class="input input-file">
              <div class="button"><input type="file" id="file" onchange="this.parentNode.nextSibling.value = this.value" />Browse</div><input type="text" readonly="" />
            </label>
          </section>          
            
          <section>
            <label class="label">Input with autocomlete</label>
            <label class="input">
              <input type="text" list="list" />
              <datalist id="list">
                <option value="Alexandra" />
                <option value="Alice" />
                <option value="Anastasia" />
                <option value="Avelina" />
                <option value="Basilia" />
                <option value="Beatrice" />
                <option value="Cassandra" />
                <option value="Cecil" />
                <option value="Clemencia" />
                <option value="Desiderata" />
                <option value="Dionisia" />
                <option value="Edith" />
                <option value="Eleanora" />
                <option value="Elizabeth" />
                <option value="Emma" />
                <option value="Felicia" />
                <option value="Florence" />
                <option value="Galiana" />
                <option value="Grecia" />
                <option value="Helen" />
                <option value="Helewisa" />
                <option value="Idonea" />
                <option value="Isabel" />
                <option value="Joan" />
                <option value="Juliana" />
                <option value="Karla" />
                <option value="Karyn" />
                <option value="Kate" />
                <option value="Lakisha" />
                <option value="Lana" />
                <option value="Laura" />
                <option value="Leona" />
                <option value="Mandy" />
                <option value="Margaret" />
                <option value="Maria" />
                <option value="Nanacy" />
                <option value="Nicole" />
                <option value="Olga" />
                <option value="Pamela" />
                <option value="Patricia" />
                <option value="Qiana" />
                <option value="Rachel" />
                <option value="Ramona" />
                <option value="Samantha" />
                <option value="Sandra" />
                <option value="Tanya" />
                <option value="Teresa" />
                <option value="Ursula" />
                <option value="Valerie" />
                <option value="Veronica" />
                <option value="Wilma" />
                <option value="Yasmin" />
                <option value="Zelma" />
              </datalist>
            </label>
            <div class="note"><strong>Note:</strong> works in Chrome, Firefox, Opera and IE10.</div>
          </section>
        </fieldset>
        
        <fieldset>
          <section>
            <label class="label">Select</label>
            <label class="select">
              <select>
                <option value="0" />Choose name
                <option value="1" />Alexandra
                <option value="2" />Alice
                <option value="3" />Anastasia
                <option value="4" />Avelina
              </select>
              <i></i>
            </label>
          </section>
          
          <section>
            <label class="label">Multiple select</label>
            <label class="select select-multiple">
              <select multiple="">
                <option value="1" />Alexandra
                <option value="2" />Alice
                <option value="3" />Anastasia
                <option value="4" />Avelina
                <option value="5" />Basilia
                <option value="6" />Beatrice
                <option value="7" />Cassandra
                <option value="8" />Clemencia
                <option value="9" />Desiderata
              </select>
            </label>
            <div class="note"><strong>Note:</strong> hold down the ctrl/cmd button to select multiple options.</div>
          </section>
        </fieldset>
        
        <fieldset>          
          <section>
            <label class="label">Textarea</label>
            <label class="textarea">
              <textarea rows="3"></textarea>
            </label>
            <div class="note"><strong>Note:</strong> height of the textarea depends on the rows attribute.</div>
          </section>
          
          <section>
            <label class="label">Textarea resizable</label>
            <label class="textarea textarea-resizable">
              <textarea rows="3"></textarea>
            </label>
          </section>
          
          <section>
            <label class="label">Textarea expandable</label>
            <label class="textarea textarea-expandable">
              <textarea rows="3"></textarea>
            </label>
            <div class="note"><strong>Note:</strong> expands on focus.</div>
          </section>
        </fieldset>
        
        <fieldset>
          <section>
            <label class="label">Columned radios</label>
            <div class="row">
              <div class="col col-4">
                <label class="radio"><input type="radio" name="radio" checked="" /><i></i>Alexandra</label>
                <label class="radio"><input type="radio" name="radio" /><i></i>Alice</label>
                <label class="radio"><input type="radio" name="radio" /><i></i>Anastasia</label>
              </div>
              <div class="col col-4">
                <label class="radio"><input type="radio" name="radio" /><i></i>Avelina</label>
                <label class="radio"><input type="radio" name="radio" /><i></i>Basilia</label>
                <label class="radio"><input type="radio" name="radio" /><i></i>Beatrice</label>
              </div>
              <div class="col col-4">
                <label class="radio"><input type="radio" name="radio" /><i></i>Cassandra</label>
                <label class="radio"><input type="radio" name="radio" /><i></i>Clemencia</label>
                <label class="radio"><input type="radio" name="radio" /><i></i>Desiderata</label>
              </div>
            </div>            
          </section>
          
          <section>
            <label class="label">Inline radios</label>
            <div class="inline-group">
              <label class="radio"><input type="radio" name="radio-inline" checked="" /><i></i>Alexandra</label>
              <label class="radio"><input type="radio" name="radio-inline" /><i></i>Alice</label>
              <label class="radio"><input type="radio" name="radio-inline" /><i></i>Anastasia</label>
              <label class="radio"><input type="radio" name="radio-inline" /><i></i>Avelina</label>
              <label class="radio"><input type="radio" name="radio-inline" /><i></i>Beatrice</label>
            </div>
          </section>
        </fieldset>
        
        <fieldset>
          <section>
            <label class="label">Columned checkboxes</label>
            <div class="row">
              <div class="col col-4">
                <label class="checkbox"><input type="checkbox" name="checkbox" checked="" /><i></i>Alexandra</label>
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Alice</label>
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Anastasia</label>
              </div>
              <div class="col col-4">
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Avelina</label>
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Basilia</label>
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Beatrice</label>
              </div>
              <div class="col col-4">
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Cassandra</label>
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Clemencia</label>
                <label class="checkbox"><input type="checkbox" name="checkbox" /><i></i>Desiderata</label>
              </div>
            </div>
          </section>
          
          <section>
            <label class="label">Inline checkboxes</label>
            <div class="inline-group">
              <label class="checkbox"><input type="checkbox" name="checkbox-inline" checked="" /><i></i>Alexandra</label>
              <label class="checkbox"><input type="checkbox" name="checkbox-inline" /><i></i>Alice</label>
              <label class="checkbox"><input type="checkbox" name="checkbox-inline" /><i></i>Anastasia</label>
              <label class="checkbox"><input type="checkbox" name="checkbox-inline" /><i></i>Avelina</label>
              <label class="checkbox"><input type="checkbox" name="checkbox-inline" /><i></i>Beatrice</label>
            </div>
          </section>
        </fieldset>
        
        <fieldset>
          <div class="row">
            <section class="col col-5">
              <label class="label">Toggles based on radios</label>
              <label class="toggle"><input type="radio" name="radio-toggle" checked="" /><i></i>Alexandra</label>
              <label class="toggle"><input type="radio" name="radio-toggle" /><i></i>Anastasia</label>
              <label class="toggle"><input type="radio" name="radio-toggle" /><i></i>Avelina</label>
            </section>
            
            <div class="col col-2"></div>
            
            <section class="col col-5">       
              <label class="label">Toggles based on checkboxes</label>
              <label class="toggle"><input type="checkbox" name="checkbox-toggle" checked="" /><i></i>Cassandra</label>
              <label class="toggle"><input type="checkbox" name="checkbox-toggle" /><i></i>Clemencia</label>
              <label class="toggle"><input type="checkbox" name="checkbox-toggle" /><i></i>Desiderata</label> 
            </section>
          </div>
        </fieldset>
        
        <fieldset>          
          <section>
            <label class="label">Ratings with different icons</label>
            <div class="rating">
              <input type="radio" name="stars-rating" id="stars-rating-5" />
              <label for="stars-rating-5"><i class="icon-star"></i></label>
              <input type="radio" name="stars-rating" id="stars-rating-4" />
              <label for="stars-rating-4"><i class="icon-star"></i></label>
              <input type="radio" name="stars-rating" id="stars-rating-3" />
              <label for="stars-rating-3"><i class="icon-star"></i></label>
              <input type="radio" name="stars-rating" id="stars-rating-2" />
              <label for="stars-rating-2"><i class="icon-star"></i></label>
              <input type="radio" name="stars-rating" id="stars-rating-1" />
              <label for="stars-rating-1"><i class="icon-star"></i></label>
              Stars
            </div>
            
            <div class="rating">
              <input type="radio" name="trophies-rating" id="trophies-rating-7" />
              <label for="trophies-rating-7"><i class="icon-trophy"></i></label>
              <input type="radio" name="trophies-rating" id="trophies-rating-6" />
              <label for="trophies-rating-6"><i class="icon-trophy"></i></label>
              <input type="radio" name="trophies-rating" id="trophies-rating-5" />
              <label for="trophies-rating-5"><i class="icon-trophy"></i></label>
              <input type="radio" name="trophies-rating" id="trophies-rating-4" />
              <label for="trophies-rating-4"><i class="icon-trophy"></i></label>
              <input type="radio" name="trophies-rating" id="trophies-rating-3" />
              <label for="trophies-rating-3"><i class="icon-trophy"></i></label>
              <input type="radio" name="trophies-rating" id="trophies-rating-2" />
              <label for="trophies-rating-2"><i class="icon-trophy"></i></label>
              <input type="radio" name="trophies-rating" id="trophies-rating-1" />
              <label for="trophies-rating-1"><i class="icon-trophy"></i></label>
              Trophies
            </div>  
            
            <div class="rating">
              <input type="radio" name="asterisks-rating" id="asterisks-rating-10" />
              <label for="asterisks-rating-10"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-9" />
              <label for="asterisks-rating-9"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-8" />
              <label for="asterisks-rating-8"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-7" />
              <label for="asterisks-rating-7"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-6" />
              <label for="asterisks-rating-6"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-5" />
              <label for="asterisks-rating-5"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-4" />
              <label for="asterisks-rating-4"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-3" />
              <label for="asterisks-rating-3"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-2" />
              <label for="asterisks-rating-2"><i class="icon-asterisk"></i></label>
              <input type="radio" name="asterisks-rating" id="asterisks-rating-1" />
              <label for="asterisks-rating-1"><i class="icon-asterisk"></i></label>
              Asterisks
            </div>
            <div class="note"><strong>Note:</strong> you can use more than 300 vector icons for rating.</div>
          </section>
        </fieldset>
        
        <footer>
          <button type="submit" class="button">Submit</button>
          <button type="button" class="button button-secondary" onclick="window.history.back();">Back</button>
        </footer>
      </form>
    </div>


      ',
      # content: '
      # <link rel="stylesheet" href="../css/epicloggerModal.css">
      # <div class=\"container\">
      # <p class=\"margin-bottom-30\">
      # <strong>
      # We are sorry that you landed on this error page.
      # </strong>
      # </p>
      # <p>
      # <strong>
      # Let us know and we will get back to you once we fix the issue.
      # </strong>
      # </p>
      # <div class=\"row\">
      #   <div class=\"col-lg-6\">
      #     <div id=\"contact-response\"></div>
      #   </div>
      # </div>
      # <div class=\"row\">
      #   <form role=\"form\" onsubmit=\"return reporterror(this)\" id=\"contact-form\">
      #     <div class=\"col-lg-6\">
      #       <div class=\"well well-sm\"><strong><i class=\"glyphicon glyphicon-ok form-control-feedback\"></i> Required Field</strong></div>
      #       <div class=\"form-group\">
      #         <label for=\"InputEmail\">Your Email</label>
      #         <div class=\"input-group\">
      #           <input type=\"email\" class=\"form-control\" id=\"InputEmail\" name=\"InputEmail\" placeholder=\"Enter Email\" required  >
      #           <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-ok form-control-feedback\"></i></span></div>
      #       </div>
      #       <div class=\"form-group\">
      #         <label for=\"InputMessage\">Details/Notes on the Error (What were you trying to do?)</label>
      #         <div class=\"input-group\">
      #           <textarea name=\"InputMessage\" id=\"InputMessage\" class=\"form-control\" rows=\"5\" required></textarea>
      #           <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-ok form-control-feedback\"></i></span></div>
      #       </div>
      #       <button type=\"submit\" name=\"submit\" id=\"btn-submit\" value=\"Submit\" class=\"btn btn-info pull-right\">Submit Error</button>
      #     </div>
      #   </form>
      # </div>
      # </div>'
      #content: '<iframe id="WDG_widgetIframe" src="'+ window.ELopts.domain+"?id="+window.ELopts.widget_url+'" class="iframe-class" style="width:100%;height:100%;" frameborder="0" allowtransparency="true"></iframe>'
      overlayStyles:
        backgroundColor: "#333"
        opacity: "0.3"
      modalStyles: 
        width: widget_width
        height: widget_height
        top: "20%"
        background: "#fff"
        boxShadow: "0px 0px 7px #444"
        border: "1px solid #444"
        borderRadius: "3px"
        marginLeft: -outerWidth/2+"px"
        overflowY: "scroll"
    )
   
  # ---- addSideButton Method
  # -- we add a fixed side button that has a click event on it for opening the widget
  addSideButton= ()->
    $s('body').append(elements.side_btn_content)
    moduleInfo = JSON.stringify({url:window.ELopts.widget_url})
    $s(elements.side_btn)
      .stylize(
              position:"fixed"
              top: "20%"
              left: "0"
              width: "90px"
              height: "90px"
              background: "url(https://i.imgur.com/jxoB4das.png)"
              textIndent: "-9999px"
              boxShadow: "2px 1px 4px #ccc"
              borderRadius: "5px"
      )
    $s(elements.side_btn).on "click", (event)=> 
      loadModule({data:moduleInfo})
      event.preventDefault()
    false

  # ---- addWidget Method
  # -- we add the iframe widget to the element specified when initializing the plugin
  addWidget= ()->
    url = window.ELopts.domain+"?id="+window.ELopts.widget_url+"?theme=#{window.ELopts.theme}"
    widget_iframe_html = '<iframe id="iframe_widget" src="'+url+'" class="iframe-class" style="width:100%;height:100%;" frameborder="0" allowtransparency="true"></iframe>'
    $el = $s(window.ELopts.widget_container)
    $el.html(widget_iframe_html)  

  # ---- isMobile Method
  # -- check if the browser is a mobile browser
  isMobile= ->
    /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())

  # ---- $s Method
  # -- we are making below an utility section to get and manipulate DOM
  $s = (a, b) ->
    a = a.match(/^(\W)?(.*)/)
    elem = (b or document)["getElement" + ((if a[1] then (if a[1] is "#" then "ById" else "sByClassName") else "sByTagName"))] a[2]
    fas = 
      elem: elem
      data : (dataAttr) ->
        elem.getAttribute("data-"+dataAttr)

      # Sets the HTML
      html: (content) ->
        elem.innerHTML = content
        fas

      # Applies a set of styles to an element
      stylize: (styles)->
        styles = styles or {}
        styles.filter = "alpha(opacity=" + (styles.opacity * 100) + ")"  if typeof styles.opacity isnt "undefined"
        for prop of styles
          if styles.hasOwnProperty(prop)
            type = typeof styles[prop]
            if type=="number" and !cssNumber[prop]
              styles[prop] += "px"
            elem.style[prop] = styles[prop] 
        fas

      append : (html)->
        c = document.createElement("p")
        c.innerHTML = html
        el = elem
        el = elem[0] if elem.length # we append just to first element
        el.appendChild c.firstChild
        fas

      # Removes this element from the DOM
      destroy: ->
        document.body.removeChild elem unless !elem
        fas
      on   : (eventName,handler)->
        if elem.length # we add handler just to first element
          elements = elem
        else
          elements = [elem]
        if elements.length>0
          i = 0
          while i < elements.length
            el = elements[i]
            if el.addEventListener
              el.addEventListener eventName, handler
            else if el.attachEvent
              el.attachEvent "on" + eventName, ->
                handler.call elem
            i++
        return
    fas

  # ---- make Method
  # -- below is the utility method that we use to manipulate data
  make = ()->
    fas = 
      extend : (out) ->
        out = out or {}
        i = 1

        while i < arguments.length
          obj = arguments[i]
          continue  unless obj
          for key of obj
            if obj.hasOwnProperty(key)
              if typeof obj[key] is "object"
                extend out[key], obj[key]
              else
                out[key] = obj[key]
          i++
        out

      getWindow: (type)->
        w = window
        d = document
        e = d.documentElement
        g = d.getElementsByTagName('body')[0]
        x = w.innerWidth || e.clientWidth || g.clientWidth
        y = w.innerHeight|| e.clientHeight|| g.clientHeight
        return x if type=='width'
        return y if type=='height'
    fas
  
  # ---- addWidgetListeners Method
  # -- we listen to the widget actions and make the actions acordingly
  # -- and example would be clicking on the submit button and loading the next step iframe 
  # -- into a modal
  addWidgetListeners= ()->
    trace "adding listener for selecting the date for showing time"
    eventMethod = (if window.addEventListener then "addEventListener" else "attachEvent")
    eventer = window[eventMethod]
    messageEvent = (if eventMethod is "attachEvent" then "onmessage" else "message")

    # Listen to message from child window
    eventer messageEvent, ((e)=> loadModule(e) ), false

  trace = (s) ->
    window.console.log "widgetLoader: " + s  if window["console"] isnt `undefined`
  error = (s) ->
    window.console.error "widgetLoader: " + s  if window["console"] isnt `undefined`

  # A function for easily displaying a modal with the given content
  (options) ->
    window.ELopts = make().extend({}, defaults,options)
    trace "constructor"
    if window.ELopts.iframe_widget
      addWidget()
      addWidgetListeners()
    if window.ELopts.side_btn
      addSideButton()
    assignModal()
    false

)(window,document)

window.onload = ()->
  if _lopts.widget_container is undefined
    _lopts.widget_container = 'body'
  widgetLoader(_lopts)

window.reporterror = (formObj) ->

  onSubmitComplete = (error) ->
    contactForm = document.getElementById('contact-form')
    contactResponse = document.getElementById('contact-response')
    contactBtn = document.getElementById('btn-submit')
    contactBtn.disabled = false
    if error
      contactResponse.innerHTML = '<div class="alert alert-danger">Sorry. Could not submit the error report.</div>'
    else
      contactResponse.innerHTML = '<div class="alert alert-success">Thanks for submitting your error report!</div>'
      contactForm.style.display = 'none'
    return

  contactBtn = document.getElementById('btn-submit')
  myFirebaseRef = new Firebase('https://epiclogger.firebaseio.com/errors')
  id = window.ELopts.widget_url
  currentdate = new Date
  datetime = currentdate.getDate() + '/' + currentdate.getMonth() + 1 + '/' + currentdate.getFullYear() + ' @ ' + currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds()
  myFirebaseRef.push {
    'id': id
    'email': formObj.InputEmail.value
    'notes': formObj.InputMessage.value
    'timestamp': datetime
  }, onSubmitComplete
  contactBtn.disabled = true
  false