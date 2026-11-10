package com.pinangtech.tapmobio.ui.webview

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class TapmobioWebViewStateTest {

    @Test
    fun initialState_isCorrect() {
        val initialUrl = "https://boonpin1975.github.io/tapmobio/"
        val state = TapmobioWebViewState(initialUrl)

        assertEquals(initialUrl, state.url)
        assertNull(state.title)
        assertEquals(0, state.progress)
        assertTrue(state.isLoading)
        assertFalse(state.hasError)
        assertNull(state.errorMessage)
        assertFalse(state.canGoBack)
        assertFalse(state.canGoForward)
        assertNull(state.webView)
    }

    @Test
    fun loadUrl_updatesUrlAndClearsError() {
        val state = TapmobioWebViewState("https://boonpin1975.github.io/tapmobio/")
        state.hasError = true
        state.errorMessage = "Failed to load"

        val targetUrl = "https://boonpin1975.github.io/tapmobio/#services"
        state.loadUrl(targetUrl)

        assertEquals(targetUrl, state.url)
        assertFalse(state.hasError)
        assertNull(state.errorMessage)
    }

    @Test
    fun reload_clearsErrorState() {
        val state = TapmobioWebViewState("https://boonpin1975.github.io/tapmobio/")
        state.hasError = true
        state.errorMessage = "Network timeout"

        state.reload()

        assertFalse(state.hasError)
        assertNull(state.errorMessage)
    }
}
