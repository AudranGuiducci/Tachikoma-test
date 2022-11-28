(ns form.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as d]))

;; -------------------------
;; Views
(defn text-input [label]
  [:div.field
   [:label.label label]
   [:div.control
    [:input.input {:type "text" :placeholder "Text Input"}]]])

(defn email-input [label]
  [:div.field
   [:label.label label]
   [:div.control.has-icons-left.has-icons-right
    [:input.input {:type "email" :placeholder "Email input"}]
    [:span.icon.is-small.is-left
     [:i.fas.fa-envelope]]
    [:span.icon.is-small.is-right
     [:i.fas.fa-exclamation-triangle]]]

   [:p.help.is-danger "This email is invalid"]])

(defn home-page []
  (ns example
    (:require [reagent.core :as r]))
  (def boolean-form  false)
  [:div.section
   (if boolean-form
     [:div
      [:h2 "It is sent"]]
     [:div
      [:h2 "Welcome"]
      [text-input boolean-form]
      [email-input "Enter your email"]
      [:button.button.is-primary "Save"]])])

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root))
