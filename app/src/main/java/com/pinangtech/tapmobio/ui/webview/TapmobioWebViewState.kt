package com.pinangtech.tapmobio.ui.webview

import android.webkit.WebView
import androidx.compose.runtime.Composable
import androidx.compose.runtime.Stable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue

@Stable
class TapmobioWebViewState(val initialUrl: String) {
    var url: String by mutableStateOf(initialUrl)
        internal set

    var title: String? by mutableStateOf(null)
        internal set

    var progress: Int by mutableIntStateOf(0)
        internal set

    var isLoading: Boolean by mutableStateOf(value = true)
        internal set

    var hasError: Boolean by mutableStateOf(value = false)
        internal set

    var errorMessage: String? by mutableStateOf(null)
        internal set

    var canGoBack: Boolean by mutableStateOf(value = false)
        internal set

    var canGoForward: Boolean by mutableStateOf(value = false)
        internal set

    var webView: WebView? by mutableStateOf(null)
        internal set

    fun reload() {
        hasError = false
        errorMessage = null
        webView?.reload()
    }

    fun loadUrl(targetUrl: String) {
        hasError = false
        errorMessage = null
        url = targetUrl
        webView?.loadUrl(targetUrl)
    }

    fun goBack(): Boolean {
        return if (webView?.canGoBack() == true) {
            webView?.goBack()
            true
        } else {
            false
        }
    }

    fun goForward(): Boolean {
        return if (webView?.canGoForward() == true) {
            webView?.goForward()
            true
        } else {
            false
        }
    }
}

@Composable
fun rememberTapmobioWebViewState(initialUrl: String): TapmobioWebViewState {
    return remember(initialUrl) {
        TapmobioWebViewState(initialUrl)
    }
}
